"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { GoalWithRecentActivities } from "@/data/progress";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  goalId: z.string().min(1, "Please select a goal"),
  date: z.date(),
  completed: z.boolean(),
  value: z.string().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
});

interface ActivityDialogProps {
  goal: GoalWithRecentActivities;
  onActivityAdded?: () => void;
}

export function ActivityDialog({ goal, onActivityAdded }: ActivityDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalId: goal.id,
      date: new Date(),
      completed: false,
      value: "",
      unit: "",
      notes: "",
    },
  });

  // Update form when goal changes
  useEffect(() => {
    if (goal?.id) {
      form.setValue("goalId", goal.id);
    }
  }, [goal?.id, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.goalId) return;
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session) {
        toast.error("Please log in to log activities");
        return;
      }

      const res = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session.access_token}`,
          refreshToken: session.session.refresh_token,
        },
        body: JSON.stringify({
          goal_id: data.goalId,
          date: data.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
          completed: data.completed,
          value: data.value ? parseFloat(data.value) : null,
          unit: data.unit || null,
          notes: data.notes || null,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toast.success("Activity logged successfully!");
      setOpen(false);
      form.reset();

      // Refresh the goal data to update the contribution grid
      if (onActivityAdded) {
        onActivityAdded();
      }
    } catch (err) {
      console.error("Failed to log activity:", err);
      toast.error("Failed to log activity");
    } finally {
      setLoading(false);
    }
  }

  function FormDatePicker({
    form,
    name,
  }: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    name: "date";
  }) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date: Date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-foreground">
          <Plus className="w-3 h-3 mr-1" />
          Log Activity
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Goal Display (read-only) */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0",
                  goal.color || "bg-gray-100"
                )}
              >
                {goal.icon}
              </div>
              <div>
                <div className="font-medium">{goal.title}</div>
                {goal.category && (
                  <div className="text-sm text-muted-foreground capitalize">
                    {goal.category}
                  </div>
                )}
              </div>
            </div>

            <FormDatePicker form={form} name="date" />

            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as completed</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Value (optional)"
                    step="0.01"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unit (e.g. miles, lbs)"
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Notes (optional)"
                  className="resize-none"
                  rows={3}
                />
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={loading} className="ml-auto">
                {loading ? "Logging..." : "Log Activity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
