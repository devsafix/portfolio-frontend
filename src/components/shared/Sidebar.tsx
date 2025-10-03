"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, LogOut, Menu, Newspaper, LayoutGrid, User } from "lucide-react";
import { logoutAction } from "@/actions/authActions";
import { FaHome } from "react-icons/fa";
import { toast } from "sonner";

// Navigation links data
const navLinks = [
  { href: "/", label: "Home", icon: <FaHome className="size-5" /> },
  { href: "/dashboard", label: "Dashboard", icon: <Home className="size-5" /> },
  {
    href: "/dashboard/about-info",
    label: "About Information",
    icon: <User className="size-5" />,
  },
  {
    href: "/dashboard/all-projects",
    label: "Manage Projects",
    icon: <LayoutGrid className="size-5" />,
  },
  {
    href: "/dashboard/all-blogs",
    label: "Manage Blogs",
    icon: <Newspaper className="size-5" />,
  },
];

const NavLink = ({ href, label, icon }: (typeof navLinks)[0]) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

const DashboardNav = () => (
  <nav className="grid items-start gap-2 px-2 text-sm font-medium">
    {navLinks.map((link) => (
      <NavLink key={link.href} {...link} />
    ))}
  </nav>
);

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result?.success) {
      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();
    } else {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-card/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-10 pt-10">
          <div className="flex-1">
            <DashboardNav />
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full" onClick={handleLogout}>
              <LogOut className="size-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header with Sheet */}
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col pt-10">
            <DashboardNav />
            <div className="mt-auto">
              <Button
                size="sm"
                className="w-full cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="size-4" /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
