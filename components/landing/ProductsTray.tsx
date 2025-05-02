// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { Card, Carousel } from "../ui/apple-cards-carousel";
// import { Button } from "../ui/button";
// interface Product {
//   _id: number;
//   images: string[];
//   name: string;
//   price: number;
//   category: string;
// }
// interface Props {
//   title: string;
//   products: Product[];
// }

// const ProductsTray = ({ products, title }: Props) => {
//   const productset = products.map((product) => {
//     return {
//       id: product._id,
//       src: product.images[0],
//       name: product.name,
//       category: product.category,
//       content: (
//         <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-8 rounded-3xl mb-4">
//           <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto flex flex-col">
//             <span className="font-bold text-neutral-700 dark:text-neutral-200">
//               {product.name}
//             </span>
//             <span className="pl-5">{product.category} is ready to capture every thought.</span>
//             <span className="text-sm ">
//             ₹<span className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-neutral-200"> {product.price.toFixed(2)}</span>
//             </span>
//           </p>
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             height="500"
//             width="500"
//             className="md:w-1/2 md:h-1/2 h-3/4 w-3/4 mx-auto object-contain rounded-3xl"
//           />
//           <div className="w-full flex justify-center gap-5 items-center">
//             <Link href="/products" className="text-xl">
//               <Button  variant={"destructive"} className="bg-yellow-400 hover:bg-yellow-500 text-black">
//                 Add to Cart
//               </Button>
//             </Link>
//             <Link href="/products" className="text-xl">
//               <Button  variant={"outline"}>
//                 More Info
//               </Button>
//             </Link>
//             <Link href="/products" className="text-xl">
//               <Button  variant={"destructive"} className="bg-green-600 hover:bg-green-800">
//                 Buy Now
//               </Button>
//             </Link>
//           </div>
//         </div>
//       ),
//     };
//   });
//   const cards = productset.map((card, index) => (
//     <Card key={index} card={card} index={index} />
//   ));
//   return (
//     <section className="py-16">
//       <div className="w-full h-full pt-20">
//         <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
//           {title}
//         </h2>
//         <Carousel items={cards} />
//       </div>
//     </section>
//   );
// };

// export default ProductsTray;
// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => {
//         return (
//           <div
//             key={"dummy-content" + index}
//             className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
//           >
//             <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//               <span className="font-bold text-neutral-700 dark:text-neutral-200">
//                 The first rule of Apple club is that you boast about Apple club.
//               </span>{" "}
//               Keep a journal, quickly jot down a grocery list, and take amazing
//               class notes. Want to convert those notes to text? No problem.
//               Langotiya jeetu ka mara hua yaar is ready to capture every
//               thought.
//             </p>
//             <Image
//               src="https://assets.aceternity.com/macbook.png"
//               alt="Macbook mockup from Aceternity UI"
//               height="500"
//               width="500"
//               className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
//             />
//           </div>
//         );
//       })}
//     </>
//   );
// };
