
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Truck } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";

const Hero = () => {
  
  return (
    <section className="flex items-center justify-center px-4 sm:px-6 -mt-8  dark">
      {/* <div className="bg-[url(/hero-.png)] bg-left-top  w-full py-8 rounded-3xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 relative overflow-hidden min-h-[90vh]"> */}
      <div
  className="md:bg-left-top  bg-top bg-no-repeat bg-cover bg-fixed w-full py-8 rounded-3xl flex flex-col md:flex-row items-center md:justify-between justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 relative overflow-hidden min-h-[90vh]"
  style={{ backgroundImage: "url('/hero-.png')"  }}
>

        {" "}
        {/* Changed to overflow-visible */}
        <div className="md:w-1/2  z-10 ">
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Elevate your style with KOSMO.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
            Discover the perfect blend of comfort and elegance. Step into a world where fashion meets functionality.
          </p>
          <Button
            className="group mt-6 flex items-center bg-white hover:bg-white text-black rounded-full px-6 py-8 font-semibold shadow-lg w-fit"
            asChild
          >
            <Link href="/shop">
              {/* <Button className="group w-fit rounded-xl text-sm sm:text-base md:text-lg lg:text-xl">
              Shop Now
              <ArrowRight className="transition-all duration-300 ease-in-out group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5" />
            </Button> */}
              Shop now{" "}
              <span className="ml-2 bg-black text-white p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Link>
          </Button>
        </div>
        {/* Image Container - Adjusted for full visibility */}
        {/* <div className="absolute right-20 top-1">
          <Image
            src="/model-2.png"
            alt="Hero Image"
            objectFit="contain"
            width={205}
            height={300}
            className=""
          />
        </div> */}
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
    //     <section className="flex items-center justify-center px-4 sm:px-6 relative">
    //   <div className="relative w-full max-w-7xl overflow-hidden rounded-[40px] bg-cover bg-center min-h-[90vh] flex flex-col justify-between p-8"
    //        style={{ backgroundImage: "url('/hero-.png')" }}>

    //     {/* Content */}
    //     <div className="text-white max-w-xl">
    //       <h1 className="text-5xl font-bold leading-tight">Visions of Elysium</h1>
    //       <button className="mt-6 flex items-center bg-white text-black rounded-full px-6 py-3 font-semibold shadow-lg">
    //         Watch now <span className="ml-3 bg-black text-white p-2 rounded-full">{'>'}</span>
    //       </button>
    //     </div>

    //     {/* Overlay box in bottom-right */}
    //     <div className="absolute bottom-0 right-0 z-20">
    //       <div className="flex items-center gap-3 px-5 py-3 bg-[#f4f0ec] text-gray-800 rounded-tl-[60px]">
    //         <span className="bg-gray-400 p-2 rounded-lg">
    //           🔒
    //         </span>
    //         <span className="text-base font-medium">Available to rent or buy</span>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Hero;
