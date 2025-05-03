import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Truck } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";
import Head from "next/head";

const Hero = () => {
  return (
    <>
      <Head>
        <link rel="preload" href="/hero.png" as="image" />
      </Head>
      <section className="flex items-center justify-center px-4 sm:px-6 -mt-8  dark">
        
        <div
          className="md:bg-left-top  bg-top bg-no-repeat bg-cover bg-fixed w-full py-8 rounded-3xl flex flex-col md:flex-row items-center md:justify-between justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 relative overflow-hidden min-h-[90vh]"
          style={{
            backgroundImage: "url('/hero.png')",
            willChange: "transform",
          }}
        >
          {/* Changed to overflow-visible */}
          <div className="md:w-1/2  z-10 ">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
              Elevate your style with KOSMO.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
              Discover the perfect blend of comfort and elegance. Step into a
              world where fashion meets functionality.
            </p>
            <Button
              className="group mt-6 flex items-center bg-white hover:bg-white text-black rounded-full px-6 py-8 font-semibold shadow-lg w-fit"
              asChild
            >
              <Link href="/shop">
                Shop now{" "}
                <span className="ml-2 bg-black text-white p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </Link>
            </Button>
          </div>
          <div className="absolute bottom-2 right-2 z-20">
            <div className="flex items-center gap-2 px-3 py-1 md:px-5 md:py-3 bg-[#f4f0ec] text-gray-800 rounded-3xl">
              <Truck className="text-gray-800" size={20} />
              <span className="text-xs md:text-sm font-medium">
                Free Shipping & COD Available
              </span>
            </div>
          </div>
        </div>
        {/* <HeroCarousel /> */}
      </section>
    </>
  );
};

export default Hero;
