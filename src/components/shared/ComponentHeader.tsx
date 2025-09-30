"use client";

import { motion } from "framer-motion";

interface IProps {
  title: string;
  subTitle: string;
}

const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
};

export default function ComponentHeader({ title, subTitle }: IProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 text-center">
      <motion.h1
        variants={fadeInAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={0}
        className="text-balance text-3xl font-bold md:text-4xl"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={fadeInAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        custom={0.2}
        className="mx-auto mt-6 max-w-2xl text-pretty text-md text-muted-foreground"
      >
        {subTitle}
      </motion.p>
    </div>
  );
}
