import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
    return (
      <Link href={`/products/${product._id}`} className="group">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-80 object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:object-center"
          />
          <div className="absolute transform translate-x-3 -translate-y-8 dark:bg-black bg-white  bg-opacity-50 px-2 py-1 rounded-full">
            <p className="text-[0.6rem]">{product.category}</p>
          </div>
        </div>
        <div className="p-2 flex justify-between">
          <h2 className="text-sm font-semibold ">{product.name}</h2>
          <div className="flex justify-center gap-2 items-center">
            <span className="text-xs line-through ">
              Rs.
              {(product.price * 1.7).toFixed(0)}
            </span>
            <p className="text-base  font-bold">
              <span className="text-xs">Rs.</span>
              {product.price}/-
            </p>
          </div>
        </div>
      </Link>
    );
  };

  export default ProductCard;