"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { ArrowDown } from "lucide-react";
import {
  SiDocker,
  SiGraphql,
  SiJavascript,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { DiAws } from "react-icons/di";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-4 pb-20 lg:pb-28 pt-32 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-4xl font-medium md:text-6xl"
              >
                Assalamu Alaikum, I am Kawser Ferdous Safi
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-pretty text-md"
              >
                A highly driven full-stack developer with expertise in building
                scalable web applications, backend systems, and cloud-based
                solutions. Passionate about integrating AI automation and modern
                DevOps practices to deliver high-performance digital products.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    asChild
                    className="rounded-(--radius) py-5 px-8 cursor-pointer"
                  >
                    <Link
                      href={
                        "https://docs.google.com/document/d/1pHPCafL-0FDBjeluJvTy2kJFhm_TUxpjDdMnfNPoxuc/edit?tab=t.0"
                      }
                      target="_blank"
                    >
                      <span className="text-[14px] font-medium tracking-wide">
                        View Resume
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-(--radius) py-5 px-8 cursor-pointer"
                  >
                    <Link href="#projects">
                      <ArrowDown />
                      <span>View Projects</span>
                    </Link>
                  </Button>
                </div>

                <div className="x-auto relative mx-auto mt-8 max-w-lg sm:mt-12">
                  <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.gray.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.gray.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
                  <div className="absolute inset-x-0 top-12 -z-[1] mx-auto h-1/3 w-2/3 rounded-full bg-blue-300 blur-3xl dark:bg-white/20"></div>

                  <Swiper
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop
                    autoplay={{ delay: 5000 }}
                    modules={[Autoplay, EffectCoverflow]}
                  >
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiJavascript className="text-yellow-400 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          The programming language of the Web
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiTypescript className="text-blue-600 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Typed JavaScript
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiTailwindcss className="text-teal-400 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          A utility-first CSS framework
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiReact className="text-cyan-400 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          UI library
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiNextdotjs className="text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          React framework
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiRedux className="text-purple-500 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          State management
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiNodedotjs className="text-green-500 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Javascript runtime
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiGraphql className="text-pink-500 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Graphql API
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <TbApi className="text-green-400 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Rest API
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiMongoose className="text-orange-700 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          MongoDB ODM
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiPostgresql className="text-blue-500 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          SQL database
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiRedis className="text-red-600 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          In-memory store
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <SiDocker className="text-blue-500 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Containerization
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="px-2">
                      <div className="bg-input/70 rounded-(--radius) h-44 max-w-lg border p-9">
                        <div className="mx-auto h-fit w-full">
                          <DiAws className="text-orange-400 text-4xl md:text-6xl mx-auto" />
                        </div>
                        <p className="mt-6 text-center text-lg font-medium">
                          Cloud provider
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
