import { Skeleton } from "@/components/ui/skeleton";

export const CartItemSkelton = () => {
  return (
    <Skeleton className="flex justify-between items-center p-4  rounded-xl ">
      <div className="flex gap-3">
        <Skeleton className="w-16 h-16 sm:w-20 sm:h-20  rounded-xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-4  rounded-md"></Skeleton>
          <Skeleton className="w-16 h-4  rounded-md"></Skeleton>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <Skeleton className="w-12 h-4  rounded-md"></Skeleton>
        <div className="flex gap-2">
          <Skeleton className="w-18 h-6  rounded-full"></Skeleton>
        </div>
        <Skeleton className="w-12 h-4  rounded-md"></Skeleton>
      </div>
    </Skeleton>
  );
};

export const ProductsSkelton = () => {
  return (
    <div className="h-full  grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="group" key={index}>
          <div className="overflow-hidden rounded-2xl relative">
            <Skeleton className="w-full h-80" />

            <div className="absolute transform translate-x-3 -translate-y-8 dark:bg-black bg-white bg-opacity-50 px-2 py-1 rounded-full">
              <Skeleton className="h-3 w-12" />
            </div>
          </div>

          <div className="p-2 flex justify-between">
            <Skeleton className="h-4 w-1/2" />

            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-3 w-10" /> {/* Original price */}
              <Skeleton className="h-5 w-16" /> {/* Discounted price */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
