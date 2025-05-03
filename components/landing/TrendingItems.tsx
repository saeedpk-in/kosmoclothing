import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency } from "@/lib/utils";
import Products from "@/models/Products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

async function TrendingItems() {
  await connectToDatabase();
  // Get trending products (you might want to sort by views, sales, etc.)
  const trendingProducts = await Products.find({trending: true})
    .sort({ views: 1 }) // Sort by most viewed
    .limit(7); // Get 6 trending items

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-16 md:py-24 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tighter text-center md:text-left">
          <span className="font-black">Trending </span>Now.
        </h1>
        <Button
          className="group mt-6 flex items-center bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
          asChild
        >
          <Link href="/shop">
            Shop All Trending{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </div>

      {/* Bento Grid Layout for Trending Items */}
      <div className="grid grid-cols-1 md:grid-cols-8 md:grid-rows-2 gap-4">
        {trendingProducts.map((product, index) => (
          <div 
            key={product._id}
            className={`
              relative group overflow-hidden rounded-2xl
              ${index === 0 ? 'md:col-span-3 md:row-span-2 h-[500px]' : ''}
              ${index === 1 ? 'md:col-span-3 md:row-span-1 h-[240px]' : ''}
              ${index === 2 ? 'md:col-span-2 md:row-span-1 h-[240px]' : ''}
              ${index === 3 ? 'md:col-span-2 md:row-span-2 h-[500px]' : ''}
              ${index === 4 ? 'md:col-span-3 md:row-span-1 h-[240px]' : ''}
              ${index === 5 ? 'md:col-span-3 md:row-span-1 h-[240px]' : ''}
              ${index === 6 ? 'md:col-span-3 md:row-span-1 h-[240px]' : ''}
            `}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2} // Priority for first two images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
              <div>
                <Badge className="inline-block px-2 py-1 bg-white text-black text-xs font-bold rounded-full mb-2">
                  #{index + 1} Trending
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white">{product.name}</h3>
                <p className="text-white/80 mb-2">{product.category}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">{formatCurrency(product.price)}</span>
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
            Shop All Trending{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default TrendingItems;