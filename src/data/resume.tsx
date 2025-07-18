import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Parsa Tajik",
  initials: "PT",
  url: "https://parsatajik.com",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software engineer and entrepreneur. I love building things and helping people.",
  summary:
    "I started tinkering with BASIC when I was 10 years old. Not gonna lie, I kinda sucked at it but it was very intriguing for me. Now, almost 15 years later, I've built a variety of software products, participated in many programming competitions & hackathons, and worked at big tech & startup companies. I even started my own software studio called [Bloorsoft](https://bloorsoft.com) 3 years ago. After all this time, I'm still learning every day... Grinding hard for a better future for myself, my family, and the world.",
  avatarUrl: "/parsa.webp",
  skills: [
    "React",
    "React Native (hate apple and their random rules)",
    "Next.js (love it)",
    "Typescript (type safety is a must)",
    "Node.js",
    "Python (not huge fan but we have 80+ microservices running on it at Affirm)",
    "Postgres (love Supabase)",
    "Docker",
    "Kubernetes",
    "Terraform + Terragrunt",
    "C++ (what I used for competitive programming)",
    "Redis (I've gone pretty deep into caching)",
    "AWS (only when Vercel is not cutting it)",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/posts", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "parsa.tajik@bloorsoft.com",
    tel: "+1 647 403 1747",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/parsatajik",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tajikparsa/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ParsaTajik",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@_parsat",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:parsa.tajik@bloorsoft.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    // {
    //   company: "Rush",
    //   href: "https://rushoptimize.com",
    //   badges: [],
    //   location: "San Francisco, CA",
    //   title: "Founder & CEO",
    //   logoUrl: "/rush.png",
    //   start: "Mar 2024",
    //   end: "June 2025",
    //   description:
    //     "Built a platform for tracking and optimizing visibility performance in answer engines like ChatGPT, Gemini, and Claude.",
    //   needsMarkdown: false,
    // },
    {
      company: "Affirm",
      href: "https://affirm.com",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineer",
      logoUrl: "/affirm.jpg",
      start: "Jan 2024",
      end: "Present",
      description:
        "Migrated all of Affirms infrastructure to Redis engine v7.1 and RedisPy v5, directly contributing to availability and performance optimizations across our whole stack.",
      needsMarkdown: false,
    },
    {
      company: "Bloorsoft",
      badges: [],
      href: "https://bloorsoft.com",
      location: "Toronto, ON",
      title: "Founder & CEO",
      logoUrl: "/bloorsoft.png",
      start: "Feb 2022",
      end: "Present",
      description:
        "Founded Bloor Software Inc. a boutique software consulting studio with a focus on web development. Lead and recruited teams of developers and designers in order to satisfy the needs of our clients. Networked and negotiated with various potential customers to speed up Bloorsoft’s growth",
      needsMarkdown: false,
    },
    {
      company: "Affirm",
      href: "https://affirm.com",
      badges: [],
      location: "New York City, NY",
      title: "Software Engineer",
      logoUrl: "/affirm.jpg",
      start: "May 2022",
      end: "Sept 2022",
      description:
        "Analyzed the current condition of the dependencies of Affirm’s codebase and researched various tools such as Dependabot and Renovate to automate the process of dependency maintenance. Configured Renovate and created a custom Docker image which was self-hosted on Affirm's BuildKite pipelines to generate automatic dependency update PRs and run post upgrade tasks.",
      needsMarkdown: false,
    },
    {
      company: "Konrad Group",
      href: "https://konrad.com",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/konrad.png",
      start: "May 2021",
      end: "May 2022",
      description:
        "Developed Artie, a tool for facilitating executors with estate management. Implemented an internal application for the Royal Bank of Canada to help manage high-value investment clients using Angular, GraphQL, and MongoDB.",
      needsMarkdown: false,
    },
    {
      company: "TeleVU Innovation",
      href: "https://televu.ca/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/televu.webp",
      start: "Sept 2021",
      end: "March 2022",
      description:
        "Built an end-to-end web application as the lead developer in a fast-paced startup environment using React, Node, Express, and PostgreSQL",
      needsMarkdown: false,
    },
    {
      company: "Hypatia Systems",
      href: "https://hypatiasys.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Junior Software Engineer",
      logoUrl: "/hypatia.svg",
      start: "Nov 2020",
      end: "May 2021",
      description:
        "Integrated the Hypatia Mathematical System with the TinyMCE editor through the creation of a plugin to facilitate acquiring mathematical input for writing and solving questions",
      needsMarkdown: false,
    },
    {
      company: "Medtronic",
      href: "https://medtronic.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/medtronic.jpeg",
      start: "June 2020",
      end: "May 2021",
      description:
        "Developed a web application for the Medtronic Diabetes business unit to help manage their sales force. Built a mobile app using React Native and Typescript.",
      needsMarkdown: false,
    },
    {
      company: "Scotiabank",
      href: "https://scotiabank.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Junior Software Engineer",
      logoUrl: "/scotiabank.png",
      start: "Sept 2019",
      end: "Dec 2019",
      description:
        "Built RequestToPay within the Technology Leadership Initiative program at the University of Toronto under the supervision of Scotiabank. RequestToPay is an android application that is designed to simplify the financial interactions between small businesses and large suppliers.",
      needsMarkdown: false,
    },
  ],
  education: [
    {
      school: "University of Toronto",
      href: "https://utoronto.ca",
      degree: "Bachelor's Degree in Computer Science (BCS)",
      logoUrl: "/uoft.jpg",
      start: "2018",
      end: "2023",
    },
    {
      school: "National Organization for Development of Exceptional Talents",
      href: "https://en.wikipedia.org/wiki/National_Organization_for_Development_of_Exceptional_Talents",
      degree: "Middle & High School",
      logoUrl: "/sampad.png",
      start: "2011",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Engager",
      href: "https://engager.bloorsoft.com",
      dates: "March 2024 - Sept 2024",
      active: true,
      description:
        "Engager was made as an experiment to see if we could grow our software studio with content marketing.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Supabase Auth",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Vercel AI SDK",
      ],
      links: [
        {
          type: "Website",
          href: "https://engager.bloorsoft.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://pub-0c2e72b44c3040afbe4c0fe25e97d31c.r2.dev/engager.mp4",
    },
    {
      title: "Artefice",
      href: "https://artefice.vercel.app/",
      dates: "May 2023 - September 2023",
      active: true,
      description: `Artefice was an AI-powered fashion brand that I started in 2022-2023. The project was born from a late-night conversation with friends: "how cool would it be if we had custom t-shirts of a cow that's getting high!".`,
      technologies: [
        "React",
        "JavaScript",
        "Vite",
        "Firebase",
        "Chakra UI",
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://artefice.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/parsatajik/stealth-dream",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://pub-0c2e72b44c3040afbe4c0fe25e97d31c.r2.dev/artefice.mp4",
    },
    {
      title: "SuperHuman++",
      href: "",
      dates: "Jan 2025 - Current",
      active: true,
      description:
        "SuperHuman like email client with an embedded personal AI assistant.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Gmail API",
        "Vercel AI SDK",
      ],
      links: [
        {
          type: "Website",
          href: "https://shpp.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://pub-0c2e72b44c3040afbe4c0fe25e97d31c.r2.dev/shpp.mp4",
    },
    {
      title: "Affirm Vision",
      href: "",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "This application uses OpenAI's GPT-4 Vision models to identify products in an image or video feed and finds them on Affirm's merchant websites.",
      technologies: [
        "React",
        "JavaScript",
        "Docker",
        "Python",
        "Custom scrapers",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Github",
          href: "https://github.com/parsatajik/ar-shopping",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://pub-0c2e72b44c3040afbe4c0fe25e97d31c.r2.dev/Screenshot%202025-02-04%20at%202.36.39%E2%80%AFAM.png",
      video: "",
    },
  ],
  startups: [
    {
      title: "Chief",
      dates: "Feb 2025 - Mar 2025",
      location: "San Francisco, CA",
      description:
        "Helped Chief with developing an experimentation platform to rapidly test different features internally.",
      image: "",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Founder",
          href: "https://x.com/jb_bakst",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Howie Liu (CEO @ Airtable)",
          href: "https://www.linkedin.com/in/howieliu",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "Fetchr",
      dates: "Jan 2025 - Feb 2025",
      location: "San Francisco, CA",
      description:
        "Helped Fetchr with developing their auth, permissioning, and order management services. I built their stylist facing dashboard with Next.js, and integrated a variety of features with their React Native app.",
      image: "/fetchr.jpeg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://fetchr.so",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Y Combinator",
          href: "https://ycombinator.com",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "Streamline Climate",
      dates: "Mar 2024 - Nov 2024",
      location: "San Francisco, CA",
      description:
        "Helped Streamline develop a full-fledged MS Word Add-In with the key features of their main app. Also integrated their next.js app with MS OneDrive so they can close a deal with Rivian!",
      image: "/streamlineclimate.jpeg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://streamlineclimate.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "PearVC",
          href: "https://pearvc.com",
          icon: <Icons.money className="size-3" />,
        },
        {
          title: "Y Combinator",
          href: "https://ycombinator.com",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "Tuuli",
      dates: "March 2024 - May 2024",
      location: "Toronto, ON",
      description:
        "Tuuli came to me with their core idea and proprietary algorithms. I had ~6 weeks to develop their application from scratch. We successfully launched their next.js app on time which allowed them to secure a big client and extra funding.",
      image: "/tuuli.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://www.trytuuli.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Next Canada",
          href: "https://nextcanada.com",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "Nexavision",
      dates: "Feb 2024 - June 2024",
      location: "San Francisco, CA",
      description:
        "I developed a complete web app with auth, payment, and custom features on top of Nexa's database of basketball data. After the first launch, I helped their team with adding seasonal features for the WNBA.",
      image: "/nexa.png",
      // mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://www.nexaodds.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Founders Inc.",
          href: "https://founders.inc/",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "BrandVM",
      dates: "Oct 2023 - Present",
      location: "Toronto, Ontario",
      description:
        "I've collaborated with BrandVM (one of best web design agencies in Canada) on various projects. I handle architecting and developing complex applications that require custom implementations.",
      image: "/brandvm.jpeg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://www.brandvm.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Bootstrapped",
          href: "",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
    {
      title: "TeleVU Innovation",
      dates: "Nov 2022 - Dec 2023",
      location: "Toronto, Ontario",
      description:
        "Built everything from a chat service to a video streaming platform, and a react native library for data syncing with an at home health monitoring device through BLE.",
      image: "/televu.webp",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "Website",
          href: "https://www.televu.ca/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      vcs: [
        {
          title: "Bootstrapped",
          href: "",
          icon: <Icons.money className="size-3" />,
        },
      ],
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
    {
      title: "DeveloperWeek Hackathon",
      dates: "February 3rd - 4th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    {
      title: "HackDavis",
      dates: "January 20th - 21st, 2018",
      location: "Davis, California",
      description:
        "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint",
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning",
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet",
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server",
        },
      ],
    },
    {
      title: "ETH Waterloo",
      dates: "October 13th - 15th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet",
        },
      ],
    },
    {
      title: "Hack The North",
      dates: "September 15th - 17th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a virtual reality application allowing users to see themselves in third person.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Streamer Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/htn2017",
        },
        {
          title: "Client Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/RTSPClient",
        },
      ],
    },
    {
      title: "Hack The 6ix",
      dates: "August 26th - 27th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ShareShip/ShareShip",
        },
        {
          title: "Site",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://share-ship.herokuapp.com/",
        },
      ],
    },
    {
      title: "Stupid Hack Toronto",
      dates: "July 23rd, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/nsagirlfriend/nsagirlfriend",
        },
      ],
    },
    {
      title: "Global AI Hackathon - Toronto",
      dates: "June 23rd - 25th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/TinySamosas/",
        },
      ],
    },
    {
      title: "McGill AI for Social Innovation Hackathon",
      dates: "June 17th - 18th, 2017",
      location: "Montreal, Quebec",
      description:
        "Developed realtime facial microexpression analyzer using AI",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
      links: [],
    },
    {
      title: "Open Source Circular Economy Days Hackathon",
      dates: "June 10th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/genecis",
        },
      ],
    },
    {
      title: "Make School's Student App Competition 2017",
      dates: "May 19th - 21st, 2017",
      location: "International",
      description: "Improved PocketDoc and submitted to online competition",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
      win: "Top 10 Finalist | Honourable Mention",
      links: [
        {
          title: "Medium Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
        },
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "HackMining",
      dates: "May 12th - 14th, 2017",
      location: "Toronto, Ontario",
      description: "Developed neural network to optimize a mining process",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
      links: [],
    },
    {
      title: "Waterloo Equithon",
      dates: "May 5th - 7th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "SpaceApps Waterloo",
      dates: "April 28th - 30th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/earthwatch",
        },
      ],
    },
    {
      title: "MHacks 9",
      dates: "March 24th - 26th, 2017",
      location: "Ann Arbor, Michigan",
      description:
        "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/threejs-planes",
        },
      ],
    },
    {
      title: "StartHacks I",
      dates: "March 4th - 5th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
      win: "1st Place Winner",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-ionic",
        },
        {
          title: "Source (Server)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-rails",
        },
      ],
    },
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native",
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails",
        },
      ],
    },
    {
      title: "Terrible Hacks V",
      dates: "November 26th, 2016",
      location: "Waterloo, Ontario",
      description:
        "Developed a mock of Windows 11 with interesting notifications and functionality",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
        },
      ],
    },
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark",
        },
      ],
    },
  ],
} as const;
