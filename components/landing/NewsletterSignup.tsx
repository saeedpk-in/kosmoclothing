"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { addEmail } from "@/actions/user";
import { toast } from "sonner";

const NewsletterSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await addEmail(email);
      if (res.success) {
        setIsSuccess(true);
        toast.success("Message Sended Successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error((error as string) || "An error");
    }
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-20 py-20 md:py-32 overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/50 dark:to-gray-900/50"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6"
        >
          Join Our <span className="font-black">Future</span> Fashion
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-500 max-w-2xl mx-auto mb-10 text-sm sm:text-base"
        >
          Be the first to access exclusive drops, member-only sales, and style
          insights from our design team.
        </motion.p>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-4 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg"
          >
            Thank you for subscribing! Check your email soon.
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="relative flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-3 h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                isSubmitting
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  : "bg-black dark:bg-white text-white dark:text-black hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 text-xs text-gray-400"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>
      <div className="absolute top-10 -right-10 w-60 h-60 rounded-full bg-blue-500/10 blur-xl"></div>
    </section>
  );
};

export default NewsletterSignup;
