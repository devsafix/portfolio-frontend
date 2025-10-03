# Kawser Ferdous Safi - Personal Portfolio (Frontend)

### Live Deployment Link

[https://devsafix.vercel.app](https://devsafix.vercel.app)

---

## Project Overview & Features

This repository contains the **frontend** for my personal portfolio website — a **high-performance, fully responsive, and SEO-optimized application** built with **Next.js (App Router)**.

It serves as a dynamic showcase of my **skills, projects, and articles**, with a **secure, private dashboard** for managing all content.

---

### Key Features Implemented

#### Public-Facing Site

- **Fully Responsive UI/UX** – Modern design optimized for mobile, tablet, and desktop.
- **Dynamic Content** – Projects, blogs, and about section fetched dynamically from the backend API.
- **SSG (Static Site Generation)** – Pre-renders critical pages (About, Project details, Blog details) for instant loading.
- **ISR (Incremental Static Regeneration)** – Automatically revalidates and refreshes content without redeployments.
- **Server Components** – Optimized server-side data fetching for performance and SEO.
- **SEO Optimized** – Dynamic metadata (title, description, Open Graph tags, etc.) for discoverability.
- **Interactive Filtering & Search** – Category-based filtering and debounced real-time search for blogs/projects.
- **Smooth Animations** – Framer Motion-based smooth UI transitions and animations.

#### Private Dashboard

- **Secure Login** – Professional login page with authentication.
- **Protected Routes** – `/dashboard/*` routes secured via Next.js middleware.
- **Full CRUD Management** – Add, edit, delete projects and blogs from the dashboard.
- **Dynamic “About Me” Management** – Update hero text, career summary, and personal info dynamically.
- **Robust Form Validation** – `zod` + `react-hook-form` ensures strong validation and error handling.
- **User Feedback** – Real-time notifications and alerts powered by `sonner` toasts.

---

## Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Form Management:** zod + react-hook-form
- **Animations:** framer-motion
- **Deployment:** Vercel

---

## Local Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/devsafix/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create Environment File**
   Create a `.env.local` file in the root directory and add your backend API URL:

   ```env
   NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at:
   👉 [http://localhost:3000](http://localhost:3000)

---

## Author

**Md Kawser Ferdous Safi**

Full-Stack Developer | MERN Stack | Backend Enthusiast 🚀
