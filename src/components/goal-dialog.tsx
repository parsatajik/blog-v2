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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  startDate: z.date().optional(),
  targetDate: z.date().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export function GoalDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.title) return;
    setLoading(true);
    try {
      const res = await fetch("/api/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to create goal");
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      startDate: undefined,
      targetDate: undefined,
      color: "",
      icon: "",
    },
  });

  function FormDatePicker({
    form,
    name,
  }: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    name: "startDate" | "targetDate";
  }) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>
                        Pick a {name.startsWith("start") ? "start" : "target"}{" "}
                        date
                      </span>
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
        <Button variant="ghost" size="sm" className="text-foreground">
          <Plus className="w-3 h-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Title" required />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Description (optional)"
                />
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Category (optional)"
                />
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormDatePicker form={form} name="startDate" />
              <FormDatePicker form={form} name="targetDate" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* <Input
                type="text"
                placeholder="Color (e.g. bg-blue-500)"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Icon (emoji like 💻)"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              /> */}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading} className="ml-auto">
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
