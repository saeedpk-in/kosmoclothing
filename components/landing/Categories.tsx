// // "use client";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { useState } from "react";
// // import { Button } from "../ui/button";
// // import { ArrowRight } from "lucide-react";
// // import { motion } from "motion/react";

// // const Categories = () => {
// //   const [hoveredId, setHoveredId] = useState<number | null>(null);

// //   // Unsplash images (800x400px - ideal for this layout)
// //   const categories = [
// //     {
// //       id: 1,
// //       name: "Mens",
// //       description: "Stylish outfits for men",
// //       image: "/mens.png",
// //     },
// //     {
// //       id: 2,
// //       name: "Womens",
// //       description: "Trendy collections for women",
// //       image: "/womens.png",
// //     },
// //     {
// //       id: 3,
// //       name: "Kids",
// //       description: "Cute and comfy kids wear",
// //       image: "/kids.png",
// //     },
// //     {
// //       id: 4,
// //       name: "Unisex",
// //       description: "Versatile styles for all",
// //       image: "/unisex.png",
// //     },
// //     {
// //       id: 5,
// //       name: "Formal",
// //       description: "Elegant office & party wear",
// //       image: "/formal.png",
// //     },
// //     {
// //       id: 6,
// //       name: "Casual",
// //       description: "Everyday comfortable fashion",
// //       image: "/casual.png",
// //     },
// //     {
// //       id: 7,
// //       name: "Trending",
// //       description: "This season's hottest picks",
// //       image: "/trending.png",
// //     },
// //   ];

// //   return (
// //     <section className="flex flex-col  px-4 sm:px-20 py-10 mt-20">
// //       <h1 className="mt-5 font-extrabold text-5xl tracking-tight font-sans">
// //         Collect By Categories
// //       </h1>
// //       <motion.div
// //         className="bg-zinc-200 w-full p-2 rounded-3xl flex gap-2 h-150 mt-32"
// //         layout
// //       >
// //         {categories.map((category) => (
// //           <motion.div
// //             key={category.id}
// //             className="relative rounded-3xl overflow-hidden cursor-pointer"
// //             layout
// //             initial={{ flex: 1 }}
// //             animate={{
// //               flex: hoveredId === category.id ? 1.5 : hoveredId ? 0.8 : 1,
// //             }}
// //             transition={{ type: "keyframes", stiffness: 300, damping: 20 }}
// //             onHoverStart={() => setHoveredId(category.id)}
// //             onHoverEnd={() => setHoveredId(null)}
// //           >
// //             <Image
// //               src={category.image}
// //               alt={category.name}
// //               fill
// //               className="object-cover"
// //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //               priority={category.id <= 3} // Lazy load except first 3 images
// //             />
// //             <motion.div
// //               className="absolute inset-0 bg-black/40 p-4 pt-2 flex flex-col justify-end"
// //               initial={{ opacity: 0}}
// //               animate={{
// //                 opacity: hoveredId === category.id ? 1 : 0,
// //               }}
// //               transition={{ delay: 0.05 }}
// //             >
// //               {/* <Link href={`/shop/${category.name}`.toLowerCase()}>
// //                 <Button
// //                   variant="outline"
// //                   className="flex items-center gap-2 mt-2 rounded-2xl"
// //                 >
// //                   Shop Now
// //                 </Button>
// //               </Link> */}
// //               <div className="flex flex-col gap-2 justify-end items-start mt-2 h-1/2">
// //                 <h3 className="text-white font-bold text-lg drop-shadow-md">
// //                   {category.name}
// //                 </h3>
// //                 <p className="text-white text-sm drop-shadow-md">
// //                   {category.description}
// //                 </p>
// //               </div>
// //             </motion.div>
// //             {/* <motion.div
// //               className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-center items-center"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: hoveredId === category.id ? 1 : 0 }}
// //               transition={{ delay: 0.1 }}
// //             >
// //               <Link href={(`/shop/${category.name}`).toLowerCase()} >
// //                 <Button
// //                   variant="outline"
// //                   // className="flex items-center gap-2 mt-2"
// //                 >
// //                   Shop Now <ArrowRight size={16} />
// //                 </Button>
// //               </Link>
// //             </motion.div> */}
// //           </motion.div>
// //         ))}
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default Categories;
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// const Categories = () => {
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   const categories = [
//     {
//       id: 1,
//       name: "Mens",
//       description: "Stylish outfits for men",
//       image: "/mens.png",
//     },
//     {
//       id: 2,
//       name: "Womens",
//       description: "Trendy collections for women",
//       image: "/womens.jpg",
//     },
//     {
//       id: 3,
//       name: "Kids",
//       description: "Cute and comfy kids wear",
//       image: "/kids.PNG",
//     },
//     {
//       id: 4,
//       name: "Unisex",
//       description: "Versatile styles for all",
//       image: "/unisex.PNG",
//     },
//     {
//       id: 5,
//       name: "Formal",
//       description: "Elegant office & party wear",
//       image: "/formal.png",
//     },
//     {
//       id: 6,
//       name: "Casual",
//       description: "Everyday comfortable fashion",
//       image: "/casual.JPG",
//     },
//     {
//       id: 7,
//       name: "Trending",
//       description: "This season's hottest picks",
//       image: "/trending.png",
//     },
//   ];

//   return (
//     <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-10 mt-10 md:mt-20 max-w-[1920px] mx-auto">
//       <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight font-sans text-center md:text-left">
//         Collect By Categories
//       </h1>

//       {/* Mobile Layout - Grid */}
//       <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
//         {categories.slice(0, 4).map((category) => (
//           <Link
//             key={category.id}
//             href={`/shop?category=${category.name.toLowerCase()}`}
//             className="group relative aspect-square rounded-2xl overflow-hidden"
//           >
//             <Image
//               src={category.image}
//               alt={category.name}
//               fill
//               className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:object-center"
//               sizes="(max-width: 768px) 50vw, 33vw"
//             />
//             <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
//               <h3 className="text-white font-bold text-sm sm:text-base drop-shadow-md">
//                 {category.name}
//               </h3>
//               <p className="text-white text-xs sm:text-sm drop-shadow-md">
//                 {category.description}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//       {categories.length > 4 && (
//         <div className="md:hidden grid grid-cols-3 gap-4 mt-4">
//           {categories.slice(4).map((category) => (
//             <Link
//               key={category.id}
//               href={`/shop?category=${category.name.toLowerCase()}`}
//               className="relative aspect-square rounded-2xl overflow-hidden"
//             >
//               <Image
//                 src={category.image}
//                 alt={category.name}
//                 fill
//                 className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:object-center"
//                 sizes="(max-width: 768px) 33vw, 25vw"
//               />
//               <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
//                 <h3 className="text-white font-bold text-sm sm:text-base drop-shadow-md">
//                   {category.name}
//                 </h3>
//                 <p className="text-white text-xs sm:text-sm drop-shadow-md line-clamp-1">
//                   {category.description}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Desktop Layout - Animated Flex */}
//       <motion.div
//         className="hidden md:flex bg-zinc-200 w-full p-2 rounded-3xl gap-2 h-150 mt-12 lg:mt-16"
//         layout
//       >
//         {categories.map((category) => (
//           <motion.div
//             key={category.id}
//             className="relative rounded-3xl overflow-hidden cursor-pointer min-w-[50px]"
//             layout
//             initial={{ flex: 1 }}
//             animate={{
//               flex: hoveredId === category.id ? 1.5 : hoveredId ? 0.8 : 1,
//             }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             onHoverStart={() => setHoveredId(category.id)}
//             onHoverEnd={() => setHoveredId(null)}
//           >
//             <Link
//                 href={`/shop?category=${category.name.toLowerCase()}`}
//                 className="w-full"
//               >
//             <Image
//               src={category.image}
//               alt={category.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 1024px) 20vw, (max-width: 1536px) 15vw, 10vw"
//               priority={category.id <= 3}
//             />
//             <motion.div
//               className="absolute inset-0 bg-black/40 p-4 pt-2 flex flex-col justify-end"
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: hoveredId === category.id ? 1 : 0,
//               }}
//               transition={{ delay: 0.05 }}
//             >

//               <div className="flex flex-col gap-2 justify-end items-start mt-2 h-1/2">
//                 <h3 className="text-white font-bold text-lg drop-shadow-md">
//                   {category.name}
//                 </h3>
//                 <p className="text-white text-sm drop-shadow-md">
//                   {category.description}
//                 </p>
//               </div>
//             </motion.div>
//             </Link>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default Categories;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Categories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      name: "Mens",
      description: "Stylish outfits for men",
      image: "/mens.png",
    },
    {
      id: 2,
      name: "Womens",
      description: "Trendy collections for women",
      image: "/womens.jpg",
    },
    {
      id: 3,
      name: "Kids",
      description: "Cute and comfy kids wear",
      image: "/kids.png",
    },
    {
      id: 4,
      name: "Unisex",
      description: "Versatile styles for all",
      image: "/unisex.png",
    },
    {
      id: 5,
      name: "Formal",
      description: "Elegant office & party wear",
      image: "/formal.png",
    },
    {
      id: 6,
      name: "Casual",
      description: "Everyday comfortable fashion",
      image: "/casual.jpg",
    },
    {
      id: 7,
      name: "Trending",
      description: "This season's hottest picks",
      image: "/trending.png",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-10 mt-10 md:mt-20 max-w-[1920px] mx-auto">
      <h1 className="font-light text-5xl md:text-6xl lg:text-7xl tracking-tight font-sans  text-left mb-8 md:mb-12">
        Collect By <span className="font-black">Category</span>
      </h1>

      {/* Enhanced Mobile Layout */}
      <div className="md:hidden">
        {/* Featured Categories (First 2) */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name.toLowerCase()}`}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg">
                  {category.name}
                </h3>
                <p className="text-white/90 text-sm sm:text-base drop-shadow-lg mt-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Secondary Categories (Rest) */}
        <div className="grid grid-cols-2 gap-3">
          {categories.slice(3).map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name.toLowerCase()}`}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
                <h3 className="text-white font-bold text-base drop-shadow-lg">
                  {category.name}
                </h3>
                <p className="text-white/90 text-xs md:text-sm  drop-shadow-lg mt-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button for Mobile */}
        <div className="mt-6 flex justify-center">
          <Button
            className="group mt-6 flex items-center bg-black group-hover:bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
            asChild
          >
            <Link href={`/shop`}>
              Shop with categories{" "}
              <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop Layout - Animated Flex (unchanged) */}
      <motion.div
        className="hidden md:flex bg-zinc-200 w-full p-2 rounded-3xl gap-2 h-150 mt-12 lg:mt-16"
        layout
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="relative rounded-3xl overflow-hidden cursor-pointer min-w-[50px]"
            layout
            initial={{ flex: 1 }}
            animate={{
              flex: hoveredId === category.id ? 1.5 : hoveredId ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onHoverStart={() => setHoveredId(category.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <Link
              href={`/shop?category=${category.name.toLowerCase()}`}
              className="w-full"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 20vw, (max-width: 1536px) 15vw, 10vw"
                priority={category.id <= 3}
              />
              <motion.div
                className="absolute inset-0 bg-black/40 p-4 pt-2 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === category.id ? 1 : 0,
                }}
                transition={{ delay: 0.05 }}
              >
                <div className="flex flex-col gap-2 justify-end items-start mt-2 h-1/2">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-white text-sm drop-shadow-md">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;
