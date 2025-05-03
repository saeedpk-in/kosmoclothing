import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

function Fasion() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-24 max-w-[1920px] mx-auto bg-gray-50">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
            <h2 className="text-5xl md:text-6xl lg:text-7xltracking-tighter mb-6"><span className="font-black">Fashion</span> Forward</h2>
          <p className="text-lg mb-4">
            Fashion is not just about clothing; it's a way to express your personality, creativity, and individuality. It reflects the culture, trends, and innovation of the times, allowing you to make a statement without saying a word.
          </p>
            <p className="text-lg mb-6">
            Explore our curated collection of fashion-forward pieces, designed
            to keep you stylish and confident for every occasion.
            </p>
          <Button
            className="group mt-6 flex items-center bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
            asChild
          >
            <Link href="/shop">
              Explore the fasion{" "}
              <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Link>
          </Button>
        </div>
        <div className="relative w-full">
          <Image
            src="/Fasion.PNG"
            alt="Our Brand Story"
            width={800}
            height={600}
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Fasion;
