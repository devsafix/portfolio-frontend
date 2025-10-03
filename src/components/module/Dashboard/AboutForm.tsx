"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { updateAboutAction } from "@/actions/aboutActions";
import { TAbout } from "@/types";
import { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

// Zod schema for client-side validation
const aboutSchema = z.object({
  heroText: z.string().min(1, "Hero text cannot be empty."),
  careerSummary: z.string().min(1, "Career summary cannot be empty."),
  interestText: z.string().min(1, "Interest text cannot be empty."),
  goalText: z.string().min(1, "Goal text cannot be empty."),
  resumeLink: z.string().url("Must be a valid URL."),
});

export default function AboutForm({ aboutData }: { aboutData: TAbout | null }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      heroText: aboutData?.heroText || "",
      careerSummary: aboutData?.careerSummary || "",
      interestText: aboutData?.interestText || "",
      goalText: aboutData?.goalText || "",
      resumeLink: aboutData?.resumeLink || "",
    },
  });

  const onSubmit = (values: z.infer<typeof aboutSchema>) => {
    startTransition(async () => {
      const result = await updateAboutAction(values);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Manage Your Story</CardTitle>
              <CardDescription>
                Update the text that appears on your public portfolio&apos;s
                hero and about sections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="heroText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Introduction</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The short, impactful intro on your homepage."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="careerSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The first paragraph of your 'About Me' timeline."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interestText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests & Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The second paragraph of your 'About Me' timeline."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goalText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The final paragraph of your 'About Me' timeline."
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://docs.google.com/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </motion.div>
  );
}
