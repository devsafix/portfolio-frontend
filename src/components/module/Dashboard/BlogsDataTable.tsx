"use client";

import { useState, useTransition } from "react";
import { TBlog } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PlusCircle,
  Trash,
  Edit,
  ExternalLink,
} from "lucide-react";
import BlogForm from "./BlogForm";
import { deleteBlogAction } from "@/actions/blogActions";
import { toast } from "sonner";
import Link from "next/link";

export default function BlogsDataTable({ blogs }: { blogs: TBlog[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<TBlog | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (blog: TBlog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteBlogAction(id);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingBlog(undefined);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => !open && closeDialog()}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="size-4" /> Add New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </DialogTitle>
            </DialogHeader>
            <BlogForm blog={editingBlog} onClose={closeDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table className="overflow-x-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead className="hidden lg:table-cell">Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium max-w-[200px] truncate md:max-w-full">{blog.title}</TableCell>
                <TableCell className="hidden md:table-cell text-xs text-muted-foreground truncate">
                  {blog.tags.slice(0, 4).join(", ")}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/blogs/${blog.slug}`} target="_blank">
                          <ExternalLink className="size-4" />
                          View Post
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(blog)}>
                        <Edit className="size-4" />
                        Edit
                      </DropdownMenuItem>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive"
                          >
                            <Trash className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this blog post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog.id)}
                              disabled={isPending}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              {isPending ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
