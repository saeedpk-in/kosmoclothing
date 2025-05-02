"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const categories = [
  "mens",
  "womens",
  "kids",
  "unisex",
  "formal",
  "casual",
  "trending",
] as const;

function Filters({
  children,
  currentPage,
  totalPages,
}: {
  children: React.ReactNode;
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get initial values from URL
  const initialCategory = searchParams.get("category") || "";
  const initialPriceSort = searchParams.get("priceSort") || "";

  // State for controlled components
  const [category, setCategory] = useState(initialCategory);
  const [priceSort, setPriceSort] = useState(initialPriceSort);
  const [page, setPage] = useState(1);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
      params.delete("search");
    } else {
      params.delete("category");
    }
    if (page) {
      params.set("page", page.toString());
    }

    if (priceSort) {
      params.set("priceSort", priceSort);
    } else {
      params.delete("priceSort");
    }

    // Only update if there are actual changes
    if (params.toString() !== searchParams.toString()) {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [category, priceSort, page, pathname, router]);

  // Sync state with URL when back/forward navigation occurs
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setPriceSort(searchParams.get("priceSort") || "");
    setPage(Number(searchParams.get("page")));
  }, [searchParams]);

  return (
    <>
      <div className="flex justify-between items-center gap-2 ">
        <div className="flex gap-2">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              className="w-fit md:w-[180px] text-xs md:text-sm"
              size="sm"
            >
              <SelectValue placeholder="Collect by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {category && (
            <Button
              className="text-xs"
              size={"sm"}
              variant={"secondary"}
              onClick={() => {
                setCategory("");
              }}
            >
              <X />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Select
            value={priceSort}
            onValueChange={(value) => setPriceSort(value)}
          >
            <SelectTrigger
              className="w-fit md:w-[180px] text-xs md:text-sm"
              size="sm"
            >
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {priceSort && (
            <Button
              className="text-xs"
              size={"sm"}
              variant={"secondary"}
              onClick={() => {
                setPriceSort("");
              }}
            >
              <X />
            </Button>
          )}
        </div>
      </div>
      {children}
      <div className="">
        <Pagination>
          <PaginationContent>
            {currentPage - 1 !== 0 && (
              <>
                <PaginationItem onClick={() => setPage(currentPage - 1)}>
                  <PaginationPrevious href="" />
                </PaginationItem>
                <PaginationItem onClick={() => setPage(currentPage - 1)}>
                  <PaginationLink href="">{currentPage - 1}</PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationLink href="" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage + 1 <= totalPages && (
              <PaginationItem onClick={() => setPage(currentPage + 1)}>
                <PaginationLink href="">{currentPage + 1}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem onClick={() => setPage(totalPages)}>
              <PaginationLink href="">{totalPages}</PaginationLink>
            </PaginationItem>
            {currentPage + 1 <= totalPages && (
              <PaginationItem onClick={() => setPage(currentPage + 1)}>
                <PaginationNext href="" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default Filters;
