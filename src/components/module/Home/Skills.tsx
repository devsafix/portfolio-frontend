"use client";

import ComponentHeader from "@/components/shared/ComponentHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
// Keep all your react-icons imports here...
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiDocker,
  SiGithub,
  SiVercel,
  SiRender,
  SiRailway,
  SiSupabase,
} from "react-icons/si";
import { TbApi, TbBrandOauth } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { DiAws } from "react-icons/di";

// The skillsData array remains the same as before...
const skillsData = [
  {
    category: "Frontend",

    skills: [
      {
        name: "HTML",
        icon: <SiHtml5 className="text-orange-500" />,
        description: "Web structure",
      },
      {
        name: "CSS",
        icon: <SiCss3 className="text-blue-500" />,
        description: "Styling webpages",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" />,
        description: "Web interactivity",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="text-blue-600" />,
        description: "Typed JavaScript",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-teal-400" />,
        description: "Utility-first CSS",
      },
      {
        name: "React.js",
        icon: <SiReact className="text-cyan-400" />,
        description: "UI library",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        description: "React framework",
      },
      {
        name: "Redux Toolkit",
        icon: <SiRedux className="text-purple-500" />,
        description: "State management",
      },
      {
        name: "TanStack Query",
        icon: <SiReact className="text-rose-500" />,
        description: "Data fetching",
      },
      {
        name: "Axios",
        icon: <SiAxios className="text-purple-600" />,
        description: "HTTP client",
      },
    ],
  },

  {
    category: "Backend",

    skills: [
      {
        name: "Node.js",
        icon: <SiNodedotjs className="text-green-500" />,

        description: "JS runtime",
      },
      {
        name: "Express.js",
        icon: <SiExpress />,
        description: "Node.js framework",
      },
      {
        name: "REST APIs",
        icon: <TbApi className="text-green-400" />,
        description: "API architecture",
      },
      {
        name: "GraphQL",
        icon: <SiGraphql className="text-pink-500" />,
        description: "Query language",
      },
      {
        name: "JWT",
        icon: <SiJsonwebtokens className="text-purple-400" />,

        description: "Authentication",
      },
      {
        name: "OAuth",
        icon: <TbBrandOauth className="text-blue-400" />,
        description: "Authorization",
      },
    ],
  },

  {
    category: "Database",
    skills: [
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-green-600" />,
        description: "NoSQL database",
      },
      {
        name: "Mongoose",
        icon: <SiMongoose className="text-orange-700" />,

        description: "MongoDB ODM",
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="text-blue-500" />,

        description: "SQL database",
      },
      { name: "Prisma ORM", icon: <SiPrisma />, description: "Next-gen ORM" },
      {
        name: "Supabase",
        icon: <SiSupabase className="text-emerald-600" />,
        description: "Postgres development platform",
      },
      {
        name: "Redis",
        icon: <SiRedis className="text-red-600" />,
        description: "In-memory store",
      },
    ],
  },

  {
    category: "DevOps & Cloud",

    skills: [
      {
        name: "Docker",
        icon: <SiDocker className="text-blue-500" />,
        description: "Containerization",
      },
      { name: "GitHub", icon: <SiGithub />, description: "Version control" },
      {
        name: "CI/CD",
        icon: <FaGitAlt className="text-orange-500" />,
        description: "Automation",
      },
      {
        name: "AWS",
        icon: <DiAws className="text-orange-400" />,
        description: "Cloud provider",
      },
      { name: "Vercel", icon: <SiVercel />, description: "Cloud platform" },
      { name: "Render", icon: <SiRender />, description: "Cloud platform" },
      { name: "Railway", icon: <SiRailway />, description: "Cloud platform" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

export default function Skills() {
  return (
    <div className="py-10 md:py-16" id="skills">
      <ComponentHeader
        title="Skills & Expertise"
        subTitle="A comprehensive set of tools and technologies I use to build scalable, efficient, and user-friendly applications."
      />
      <div className="mt-10 max-w-5xl mx-auto px-4">
        <Tabs defaultValue="Frontend" className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TabsList className="gap-2 lg:gap-20 flex flex-wrap items-center bg-transparent w-full">
              {skillsData.map((categoryItem) => (
                <TabsTrigger
                  key={categoryItem.category}
                  value={categoryItem.category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none text-white/70 hover:text-white/80"
                >
                  {categoryItem.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {skillsData.map((categoryItem) => (
            <TabsContent
              key={categoryItem.category}
              value={categoryItem.category}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-7 md:mt-10">
                {categoryItem.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center text-center gap-3 p-4 bg-card rounded-lg border border-border/60 shadow-sm cursor-pointer"
                  >
                    <div className="text-4xl">{skill.icon}</div>
                    <h4 className="font-semibold text-card-foreground">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
