"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Products from "@/models/Products";

export async function getProductById(id: string) {
  try {
    await connectToDatabase();
    const product = await Products.findById(id).lean();

    if (product) {
      return { success: true, product: JSON.parse(JSON.stringify(product)) };
    } else {
      return { success: false, message: "Product not found", status: 404 };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to retrieve product",
      status: 500,
    };
  }
}

export async function getProducts({
  page,
  limit,
  category,
  priceSort,
  searchQuery,
}: { page?: number; limit?: number; category?: string; priceSort?: string; searchQuery?:string; } = {}) {

  try {
    await connectToDatabase();
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const sort: { [key: string]: 1 | -1 } = priceSort === "asc" ? { price: 1 } : priceSort === "desc" ? { price: -1 } : {};
    const searchQueryRegex = searchQuery ? new RegExp(searchQuery, "i") : null;
    const searchQueryFilter = searchQueryRegex ? {  name: searchQueryRegex , description: searchQueryRegex } : {};
    const totalProducts = category 
      ? await Products.countDocuments({ category }) 
      : searchQueryFilter ? await Products.countDocuments(searchQueryFilter)
      : await Products.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);
    let products = [];
    if (category) {
      const categoryResponse = await getProductsByCategory({ category, skip, sort , limitNumber  });
      if (Array.isArray(categoryResponse)) {
        products = categoryResponse;
      } else {
        return {
          success: false,
          message: categoryResponse.message || "Failed to retrieve products by category",
          status: categoryResponse.status || 500,
          products: [],
        };
      }
    } else {
      products = await Products.find(searchQueryFilter).skip(skip).limit(limitNumber).sort(sort).lean();
    }
    const paginatedProducts = products.map((product) => {
      return JSON.parse(JSON.stringify(product));
    });
    // const products = await Products.find().lean();
    return {
      success: true,
      products: paginatedProducts,
      totalPages,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: "Failed to retrieve products",
      status: 500,
      products: [],
    };
  }
}

export async function getProductsByCategory({
  skip,
  limitNumber,
  category,
  sort
}: {
  skip: number;
  limitNumber: number;
  category?: string;
  sort: { [key: string]: 1 | -1 };
}) {
  try {
    await connectToDatabase();
    if (!category) {
      return { success: false, message: "Category is required", status: 400 };
    }
    if (category === "trending") {
      const products = await Products.find({ trending: true })
        .skip(skip)
        .limit(limitNumber)
        .sort(sort)
        .lean();
      return products;
    }
    const products = await Products.find({ category })
      .skip(skip)
      .limit(limitNumber)
      .sort(sort)
      .lean();

    if (products && products.length > 0) {
      return products;
    } else {
      return [];
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to retrieve product",
      status: 500,
    };
  }
}
