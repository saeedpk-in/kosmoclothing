// "use client";
// import Image from "next/image";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { IProduct, Size } from "@/types";
// // import axios from "axios";
// import { Fragment, useEffect, useState, useTransition } from "react";
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { getProductById } from "@/actions/products";
// import { Minus, Plus, ShoppingBag } from "lucide-react";
// import { addItemToCart } from "@/actions/cart";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import SizeSelector from "@/components/intractive/SizeSelector";
// import Spinner from "@/components/intractive/Spinner";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// export default function Page() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<IProduct | null>(null);
//   const [emblaApi, setEmblaApi] = useState<any>(null);
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [cartId, setCartId] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<Size>();
//   const [quantity, setQuantity] = useState(1);
//   const [pending, startTransition] = useTransition();

//   const loadCartId = () => {
//     const storedCartId = localStorage.getItem("cartId");
//     if (!storedCartId) {
//       const newCartId = Math.random().toString(36).substring(2, 15);
//       localStorage.setItem("cartId", newCartId);
//       setCartId(newCartId);
//     } else {
//       setCartId(storedCartId);
//     }
//   };

//   useEffect(() => {
//     // const fetchProduct = async () => {
//     //   console.log("Loading cartId     ddd");
//     // };
//     startTransition(async () => {
//       try {
//         const response = await getProductById(id as string);
//         if (response.success && response.product) {
//           setProduct(response.product);
//           console.log(response.product);
//         } else {
//           console.log("Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     });

//     // fetchProduct();
//     if (!pending) {
//       loadCartId();
//     }
//   }, []);

//   if (!product) {
//     return (
//       <div className="min-h-screen justify-center items-center flex">
//         <Spinner />
//       </div>
//     );

//   }

//   const {
//     name,
//     description,
//     price,
//     category,
//     inStock,
//     images,
//     sizes: availableSizes,
//     trending,
//   } = product;

//   const handleThumbnailClick = (index: number) => {
//     if (emblaApi) {
//       emblaApi.scrollTo(index); // Scroll to the clicked slide
//     }
//   };

//   const handleAddToCart = async () => {
//     console.log(selectedSize);

//     if (session?.user) {
//       const response = await addItemToCart({
//         userId: session?.user?.id,
//         productId: product._id as string,
//         quantity,
//         size: selectedSize as Size,
//       });
//       if (response.success) {
//         console.log("added by userId success");
//         toast(`${product.name} is added to your cart`, {
//           description: `Added on ${new Date().toLocaleString()}`,
//           action: {
//             label: "view",
//             onClick: () => router.push("/pocket"),
//           },
//         });
//       }
//     } else if (cartId) {
//       const response = await addItemToCart({
//         cartId,
//         productId: product._id as string,
//         quantity,
//         size: selectedSize as Size,
//       });

//       if (response.success) {
//         console.log("added by cartId success");
//         toast(`${product.name} is added to your cart`, {
//           description: `Added on ${new Date().toLocaleString()}`,
//           action: {
//             label: "view",
//             onClick: () => router.push("/pocket"),
//           },
//         });
//       }
//       console.log("cartId only found");
//     } else {
//       console.log("both are not found");
//     }
//   };

//   return (
//     <div className="flex px-52 h-fit ">
//       {/* <Spinner /> */}
//       <div className="w-1/2 p-10">
//         <Carousel className="h-[35rem] w-[30rem] p-0" setApi={setEmblaApi}>
//           <CarouselContent>
//             {images.map((image, index) => (
//               <CarouselItem key={index}>
//                 <Image
//                   src={image}
//                   alt="product"
//                   width={500}
//                   height={500}
//                   className=" max-h-screen h-[35rem] w-[30rem]  object-cover rounded-xl"
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//       <div className="w-1/2 h-full px-16 py-10 space-y-5">
//         <h1 className="text-3xl uppercase font-black">{name}</h1>
//         <p className="text-primary/70 text-sm">
//           {description} Lorem ipsum dolor sit amet consectetur, adipisicing
//           elit. Facere cupiditate aliquam fugit voluptates? Assumenda
//           repellendus enim laboriosam modi mollitia nostrum aliquam, et labore
//           magni corporis ducimus cupiditate praesentium, alias sequi?
//         </p>
//         <div className="">
//           <div className="flex gap-4 ">
//             {images.map((image, index) => (
//               <Image
//                 onClick={() => handleThumbnailClick(index)}
//                 key={index}
//                 src={image}
//                 alt="product"
//                 width={100}
//                 height={100}
//                 className="rounded-2xl hover:opacity-80 transition duration-300 ease-in-out cursor-pointer"
//               />
//             ))}
//           </div>
//         </div>
//         <div className="">
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <p className="text-3xl font-semibold">
//                 <span className="text-base">₹</span>
//                 {price.toFixed(2)}/-
//               </p>
//             </div>
//             <div className="">
//               <h4 className="text-xs">Category</h4>
//               <p className="">{category}</p>
//             </div>
//             <div className="">
//               <h4 className="text-xs">sizes</h4>
//               <div className="space-x-2 flex">
//                 {/* {availableSizes.map((size, i) => (
//                   <Badge key={i} className="p-2">{size}</Badge>
//                 ))} */}
//                 <SizeSelector
//                   sizes={availableSizes}
//                   setSelectedSizes={setSelectedSize}
//                   selectedSizes={selectedSize}
//                 />
//               </div>
//             </div>
//             <div className="">
//               {inStock ? (
//                 <Badge className="text-xs">In Stock</Badge>
//               ) : (
//                 <Badge className="text-xs">Out of Stock</Badge>
//               )}
//             </div>
//             <div className="space-y-3">
//               <h4 className="text-xs">Quantity</h4>
//               <Button variant={"outline"} className="rounded-full" size={"lg"}>
//                 <span
//                   className="cursor-pointer"
//                   onClick={() => {
//                     if (quantity <= 1) {
//                       return;
//                     } else {
//                       setQuantity((prev) => prev - 1);
//                     }
//                   }}
//                   aria-disabled={quantity <= 1}
//                 >
//                   <Minus />
//                 </span>
//                 <span>{quantity}</span>
//                 <span
//                   className="cursor-pointer"
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                 >
//                   <Plus />
//                 </span>
//               </Button>
//             </div>
//             {trending && (
//               <div>
//                 <p className="text-primary/60 text-xs">
//                   hurry ! only{" "}
//                   <span className="text-lg text-white px-2">2</span> stock
//                   available
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <div className="relative w-full">
//                   {" "}
//                   {/* Wrap in a div to allow hover even when disabled */}
//                   <Button
//                     className="px-4 py-2 rounded-3xl w-full"
//                     size={"lg"}
//                     onClick={handleAddToCart}
//                     disabled={!selectedSize}
//                   >
//                     <Plus />
//                     Add to pocket
//                   </Button>
//                   {!selectedSize && <div className="absolute inset-0" />}
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 {!selectedSize
//                   ? "Please select a size first"
//                   : "Add to library"}
//               </TooltipContent>
//             </Tooltip>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <div className="relative w-full">
//                   {" "}
//                   <Button
//                     className=" px-4 py-2 rounded-3xl w-full"
//                     size={"lg"}
//                     disabled={!selectedSize}
//                   >
//                     <ShoppingBag />
//                     Buy Now
//                   </Button>
//                   {!selectedSize && <div className="absolute inset-0" />}
//                 </div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 {!selectedSize
//                   ? "Please select a size first"
//                   : "Add to library"}
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IProduct, Size } from "@/types";
import {  useEffect, useState, useTransition } from "react";
import {  useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProductById, getProducts } from "@/actions/products";
import { Copy, Minus, Plus, Share2, ShoppingBag, Star } from "lucide-react";
import { addItemToCart } from "@/actions/cart";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import SizeSelector from "@/components/intractive/SizeSelector";
import Spinner from "@/components/intractive/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductCard from "@/components/intractive/ProductCard";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [similarProducts, setSimilarProducts] = useState<IProduct[] | null>(
    null
  );
  const [emblaApi, setEmblaApi] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [cartId, setCartId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [quantity, setQuantity] = useState(1);
  const [pending, startTransition] = useTransition();

  const loadCartId = () => {
    const storedCartId = localStorage.getItem("cartId");
    if (!storedCartId) {
      const newCartId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
    } else {
      setCartId(storedCartId);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getProductById(id as string);
        if (response.success && response.product) {
          setProduct(response.product);
        } else {
          console.log("Failed to fetch products");
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    });

    if (!pending) {
      loadCartId();
    }
  }, []);

  useEffect(() => {
    if (!product) return;
    async function fetchSimilarProducts() {
      const category = product?.category;
      try {
        const response = await getProducts({ category, limit: 4 });
        if (response.success && response.products) {
          setSimilarProducts(
            response.products.filter((item: IProduct) => item._id !== id)
          );
        } else {
          console.log("Failed to fetch similar products");
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    }
    fetchSimilarProducts();
  }, [product]);


  if ( !product) {
    if(pending ){
      return (
        <div className="min-h-screen justify-center items-center flex">
          <Spinner />
        </div>
      );
    }else{
      return
    }

  }

  const {
    name,
    description,
    price,
    category,
    inStock,
    images,
    sizes: availableSizes,
    trending,
  } = product;

  const handleThumbnailClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };
  const handleAddToCart = async () => {
    startTransition(async () => {
      if (session?.user) {
        const response = await addItemToCart({
          userId: session?.user?.id,
          productId: product._id as string,
          quantity,
          size: selectedSize as Size,
        });
        if (response.success) {
          toast(`${product.name} is added to your cart`, {
            description: `Added on ${new Date().toLocaleString()}`,
            action: {
              label: "view",
              onClick: () => router.push("/pocket"),
            },
          });
          localStorage.setItem("cart-reminder", "true");
          window.dispatchEvent(new Event("cartReminderChanged"));
        }
      } else if (cartId) {
        const response = await addItemToCart({
          cartId,
          productId: product._id as string,
          quantity,
          size: selectedSize as Size,
        });

        if (response.success) {
          toast(`${product.name} is added to your cart`, {
            description: `Added on ${new Date().toLocaleString()}`,
            action: {
              label: "view",
              onClick: () => router.push("/pocket"),
            },
          });
          localStorage.setItem("cart-reminder", "true");
          window.dispatchEvent(new Event("cartReminderChanged"));
        }
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-52 py-6 md:py-10">
      {/* Image Gallery Section */}
      <div className="w-full lg:w-1/2 p-2 sm:p-4 md:p-6 lg:p-8 h-fit md:sticky md:top-20">
        <Carousel className="h-auto w-full" setApi={setEmblaApi}>
          <CarouselContent>
            {images.map((image, index) => (
              // <Fragment key={index}>
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <Image
                    src={image}
                    alt="product"
                    fill
                    className="object-cover rounded-xl"
                    priority={index === 0}
                    onClick={() => {
                      document.getElementById("dialog-trigger")?.click();
                    }}
                  />
                </div>
                <Dialog>
                  <DialogTrigger id="dialog-trigger" hidden>
                    Open
                  </DialogTrigger>
                  <DialogContent>
                    {/* <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader> */}
                    <DialogTitle>{name}</DialogTitle>
                    <div className="w-fit h-fit ">
                      <Image
                        src={image}
                        alt="product"
                        width={500}
                        height={500}
                        className="rounded-xl"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              // </Fragment>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        {/* Thumbnail Navigation */}
        <div className="mt-4 flex gap-2 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt="thumbnail"
                fill
                className="object-cover hover:opacity-80 transition duration-300 ease-in-out"
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className="rounded-3xl mt-4 "
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "Check this out!",
                    text: "Thought you might like this:",
                    url: window.location.href, // or use a specific URL
                  });
                  console.log("Content shared successfully");
                } catch (error) {
                  console.error("Error sharing:", error);
                }
              } else {
                toast("Sharing is not supported on this browser.");
              }
            }}
          >
            <Share2 size={18} className="mr-2" />
            Share this product
          </Button>
          <Button
            variant={"outline"}
            className="rounded-3xl mt-4 "
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                toast("Link copied to clipboard!");
              } catch (err) {
                console.error("Failed to copy: ", err);
                toast("Failed to copy link");
              }
            }}
          >
            <Copy size={18} className="mr-2" />
            Copy link
          </Button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 lg:px-10 py-6 space-y-4 md:space-y-6 font-semibold">
        <h1 className="text-2xl sm:text-3xl font-black uppercase">{name}</h1>
        <div className="flex gap-2 items-center">
          <div className="rounded-md bg-green-600 text-white text-xs p-1  flex items-center justify-center gap-1">
            {trending
              ? Math.min(((price / 1000) % 5) + 4, 5).toFixed(1)
              : Math.min(((price / 1000) % 5) + 3.6, 5).toFixed(1)}
            <Star size={10} fill="white" />
          </div>
          <p className="text-xs">Best Reviews</p>
          <Badge variant={"outline"}>
            <Image
              src={"/kosmo-icon.JPG"}
              alt="kosmo-icon"
              width={20}
              height={20}
              className=""
            />
            Assured
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="col-span-2">
            <p className="text-green-600 font-bold">Special Price</p>
            <div className="flex items-center gap-3">
              <h4 className="text-2xl sm:text-3xl  tracking-tight font-sans">
                {`${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(price)}/-`}
              </h4>
              <p className="text-sm line-through text-primary/70">
                {`${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(price * 1.7)}/-`}
              </p>
              <p className="text-green-600 flex">40% off</p>
            </div>
          </div>

          <div className="col-span-1">
            <Badge className="text-sm sm:text-base rounded-3xl">
              {category}
            </Badge>
          </div>

          <div className="col-span-1">
            {inStock ? (
              <Badge
                className="text-xs sm:text-sm rounded-3xl text-green-600 border-green-600"
                variant={"outline"}
              >
                In Stock
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="text-xs sm:text-sm rounded-3xl"
              >
                Out of Stock
              </Badge>
            )}
          </div>
          <p className="text-sm flex gap-2">
            Delivery Now
            <span className="text-green-600">Free </span>
            <span className="line-through text-primary/70">₹60/-</span>
          </p>
          <p className="text-primary/70 text-sm sm:text-base col-span-2">
            {description}
          </p>

          <div className="col-span-1 sm:col-span-2">
            <h4 className="text-xs sm:text-sm">Sizes</h4>
            <div className="mt-1">
              <SizeSelector
                sizes={availableSizes}
                setSelectedSizes={setSelectedSize}
                selectedSizes={selectedSize}
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <h4 className="text-xs sm:text-sm">Quantity</h4>
            <div className="mt-2">
              <Button variant="outline" className="rounded-full" size="lg">
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    quantity > 1 && setQuantity((prev) => prev - 1)
                  }
                >
                  <Minus size={18} />
                </span>
                <span className="mx-4">{quantity}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus size={18} />
                </span>
              </Button>
            </div>
          </div>

          {trending && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-primary/90 text-xs sm:text-sm font-semibold">
                Hurry! Only <span className="test-black px-1">2</span> left in
                stock
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-full">
                  <Button
                    className="w-full rounded-xl"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || pending}
                  >
                    {pending ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      <>
                        <Plus className="mr-2" size={18} />
                        Add to pocket
                      </>
                    )}
                  </Button>
                  {!selectedSize && <div className="absolute inset-0" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {pending
                  ? "Adding to cart..."
                  : !selectedSize
                  ? "Please select a size first"
                  : "Add to cart"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-full">
                  <Button
                    className="w-full  rounded-xl bg-primary/20 hover:bg-primary/30 "
                    size="lg"
                    variant="outline"
                    disabled={!selectedSize}
                    asChild
                  >
                    <Link
                      href={{
                        pathname: "/checkout",
                        query: {
                          mode: "product",
                          productId: product._id,
                          quantity,
                          size: selectedSize,
                        },
                      }}
                      className="flex"
                    >
                      <ShoppingBag className="mr-2" size={18} />
                      Buy Now
                    </Link>
                  </Button>
                  {!selectedSize && <div className="absolute inset-0" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {!selectedSize
                  ? "Please select a size first"
                  : "Proceed to checkout"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {similarProducts && similarProducts.length > 0 && (
          <div className="">
            <h3 className="text-2xl tracking-tight font-bold">
              Similar Products
            </h3>
            <div className="h-full  grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-10">
              {similarProducts?.map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {similarProducts.length > 4 && (
              <Button asChild variant="link" className="text-primary/70">
                <Link href={`/shop?category=${category}`}>View More</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
