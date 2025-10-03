"use client";

import { useRef, useState } from "react";
import ComponentHeader from "@/components/shared/ComponentHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send, Loader2, PenLine } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { motion, Variants } from "framer-motion";

// Re-styled contact info data for the new design
const contactDetails = [
  {
    icon: <MapPin />,
    info: "Tangail, Dhaka, Bangladesh",
  },
  {
    icon: <Mail />,
    info: "devsafix@gmail.com",
  },
  {
    icon: <Phone />,
    info: "+880 1709190412",
  },
];

// Animation Variants for a staggered effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    setIsSubmitting(true);
    const serviceID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY as string;
    const templateID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY as string;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        toast.success("Message sent successfully! I'll be in touch soon.");
        form.current?.reset();
        setIsSubmitting(false);
      },
      (error) => {
        toast.error("Failed to send message. Please try again later.");
        console.error("EMAILJS ERROR:", error.text);
        setIsSubmitting(false);
      }
    );
  };

  return (
    <div className="py-10" id="contact">
      <ComponentHeader
        title="Let's Build Something Amazing"
        subTitle="Ready to start a project or just want to connect? Reach out, and let's create something powerful together."
      />
      <div className="mt-10 max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Gradient Info Panel */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 bg-gradient-to-br from-primary via-primary/80 to-primary/70 text-primary-foreground p-8 md:p-12 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-3xl font-bold flex items-center">
                  <PenLine className="mr-3" />
                  Contact Info
                </h3>
                <p className="mt-4 text-primary-foreground/80">
                  Find me here. I&apos;m always open to discussing new projects
                  and creative ideas.
                </p>
              </div>
              <div className="mt-8 space-y-6">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-2xl">{detail.icon}</div>
                    <p>{detail.info}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 bg-card text-card-foreground p-8 md:p-12"
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from_name">Full Name</Label>
                    <Input
                      id="from_name"
                      name="from_name"
                      type="text"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from_email">Email Address</Label>
                    <Input
                      id="from_email"
                      name="from_email"
                      type="email"
                      placeholder="e.g., j.doe@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Hello, I'd like to talk about..."
                    required
                    rows={6}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
