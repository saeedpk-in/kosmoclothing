import { IProduct } from "@/types";
import { getProducts } from "@/actions/products";
import Filters from "@/components/intractive/Filters";
import ProductCard from "@/components/intractive/ProductCard";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductsSkelton } from "@/components/Skeltons";
export const metadata: Metadata = {
  title: "Shop",
};

const ProductsSection = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams
  const { products, totalPages, currentPage } = await getProducts({
    page: Number(params.page),
    limit: 4 * 5,
    category: params.category as string,
    priceSort: params.priceSort as string,
    searchQuery: params.search as string,
  });

  return (
    <Filters
      currentPage={currentPage as number}
      totalPages={totalPages as number}
    >
      <div className="h-full  grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-10">
        {products.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Filters>
  );
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const header = params.category || params.search || "Collect things you love";

  return (
    <div className="flex flex-col h-full px-5 md:px-20 ">
      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-start my-10">
        {header}
      </h1>
      <Suspense fallback={<ProductsSkelton />}>
        <ProductsSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default page;
