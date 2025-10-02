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
import { createBlogAction, updateBlogAction } from "@/actions/blogActions";
import { TBlog } from "@/types";
import { useTransition } from "react";

// Validation schema
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Markdown content is required"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().min(1, "Add at least one tag"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type BlogFormProps = {
  blog?: TBlog;
  onClose: () => void;
};

export default function BlogForm({ blog, onClose }: BlogFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditMode = !!blog;

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      thumbnail: blog?.thumbnail || "",
      tags: blog?.tags.join(", ") || "",
      metaTitle: blog?.metaTitle || "",
      metaDescription: blog?.metaDescription || "",
    },
  });

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    // Convert tags string to array
    const tagsArray = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const payload = { ...values, tags: tagsArray };

    startTransition(async () => {
      const result = isEditMode
        ? await updateBlogAction(blog.id, payload)
        : await createBlogAction(payload);

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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Blog Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
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
                <Input placeholder="next-js, web-dev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog content here using Markdown..."
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="SEO Title for the blog" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="SEO Description for the blog"
                  {...field}
                />
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
            "Create Blog"
          )}
        </Button>
      </form>
    </Form>
  );
}
