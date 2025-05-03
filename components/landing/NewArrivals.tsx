import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency } from "@/lib/utils";
import Products from "@/models/Products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

async function NewArrivals() {
  await connectToDatabase();
  const latestProducts = await Products.find()
    .sort({ _id: 1 }) // Changed to -1 for descending (newest first)
    .limit(5);

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-16 md:py-24 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tighter text-left ">
          Just <span className="font-black">Dropped.</span>
        </h1>
        <Button
          className="group mt-6 flex items-center bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
          asChild
        >
          <Link href="/shop">
            View All New Arrivals{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </div>

      {/* Enhanced Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4">
        {latestProducts.map((product, index) => (
          <div
            key={product._id}
            className={`
              relative group overflow-hidden rounded-3xl
              ${index === 0 ? "md:col-span-4 md:row-span-2 h-[500px]" : ""}
              ${index === 1 ? "md:col-span-2 md:row-span-1 h-[240px]" : ""}
              ${index === 2 ? "md:col-span-2 md:row-span-1 h-[240px]" : ""}
              ${index === 3 ? "md:col-span-3 md:row-span-1 h-[240px]" : ""}
              ${index === 4 ? "md:col-span-3 md:row-span-1 h-[240px]" : ""}
            `}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0} // Priority for the largest image
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {product.name}
              </h3>
              <p className="text-white/80 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">
                  {formatCurrency(product.price)}
                </span>
                <Button
                  className="group mt-6 flex items-center bg-black/20 group-hover:bg-black/40 hover:bg-black/40 text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
                  asChild
                >
                  <Link href={`/products/${product._id}`}>
                    View Details{" "}
                    <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-10 flex justify-center md:hidden">
      <Button
          className="group mt-6 flex items-center bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
          asChild
        >
          <Link href="/shop">
            View All New Arrivals{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default NewArrivals;
