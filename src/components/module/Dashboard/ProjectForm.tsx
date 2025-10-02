/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/projectActions";
import { TProject } from "@/types";
import { useTransition } from "react";

// The validation schema (must match server action)
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Must be a valid URL"),
  liveSite: z.string().url("Must be a valid URL"),
  githubClient: z.string().url("Must be a valid URL"),
  githubBackend: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  technologies: z.string().min(1, "Add at least one technology"),
  features: z.string().min(1, "Add at least one feature"),
  tags: z.string().min(1, "Add at least one tag"),
});

type ProjectFormProps = {
  project?: TProject;
  onClose: () => void;
};

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditMode = !!project;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      thumbnail: project?.thumbnail || "",
      liveSite: project?.liveSite || "",
      githubClient: project?.githubClient || "",
      githubBackend: project?.githubBackend || "",
      technologies: project?.technologies.join(", ") || "",
      features: project?.features.join(", ") || "",
      tags: project?.tags.join(", ") || "",
    },
  });

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    // Transform comma-separated strings to arrays
    const transformedValues = {
      ...values,
      technologies: values.technologies.split(",").map((tech) => tech.trim()),
      features: values.features.split(",").map((feat) => feat.trim()),
      tags: values.tags.split(",").map((tag) => tag.trim()),
    };

    startTransition(async () => {
      const result = isEditMode
        ? await updateProjectAction(project.id, transformedValues as any)
        : await createProjectAction(transformedValues as any);

      if (result?.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* We can map over an array to create fields */}
        {[
          {
            name: "title",
            label: "Title",
            placeholder: "e.g., My Awesome Project",
          },
          {
            name: "thumbnail",
            label: "Thumbnail URL",
            placeholder: "https://example.com/image.png",
          },
          {
            name: "liveSite",
            label: "Live Site URL",
            placeholder: "https://my-project.com",
          },
          {
            name: "githubClient",
            label: "GitHub Client URL",
            placeholder: "https://github.com/user/client-repo",
          },
          {
            name: "githubBackend",
            label: "GitHub Backend URL (Optional)",
            placeholder: "https://github.com/user/server-repo",
          },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Textarea fields for multi-line inputs */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="React, Next.js, Tailwind CSS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Feature A, Feature B, Feature C"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="full-stack, next-js, top" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : isEditMode ? (
            "Save Changes"
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </Form>
  );
}
