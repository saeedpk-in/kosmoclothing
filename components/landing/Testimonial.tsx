"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Fashion Influencer",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
    comment:
      "The fabric quality is exceptional. I've never worn anything so comfortable that also looks this premium. My followers keep asking where I got these pieces!",
    highlight: "Exceptional fabric quality",
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    role: "Tech CEO",
    avatar: "/avatars/avatar-2.jpg",
    rating: 4,
    comment:
      "Perfect blend of minimalism and futurism. The designs are timeless yet forward-thinking. Exactly what I need for my professional wardrobe.",
    highlight: "Timeless yet forward-thinking",
  },
  {
    id: 3,
    name: "Jamal Williams",
    role: "Creative Director",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    comment:
      "The attention to detail is remarkable. Every stitch and seam is perfection. These clothes make me feel like I'm wearing the future.",
    highlight: "Remarkable attention to detail",
  },
];

const Testimonials = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-16 md:py-24 max-w-[1920px] mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl  tracking-tight"
        >
          Voices of <span className="font-black">Satisfaction</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Hear what our discerning clients say about their experience with our
          collections
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
              "{testimonial.comment}"
            </blockquote>

            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg inline-block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {testimonial.highlight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Glowing CTA at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-xl font-light mb-4">
          Ready to experience it yourself?
        </h3>
        <Button
          className="group mx-auto mt-6 flex items-center bg-black group-hover:bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
          asChild
        >
          <Link href={"/shop"}>
            Explore It{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default Testimonials;
