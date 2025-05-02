import { auth } from "@/auth";
import Categories from "@/components/landing/Categories";
import Hero from "@/components/landing/Hero";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
// import ProductsTray from "@/components/landing/ProductsTray";
export default async function Home() {
  const session = await auth();
  return (
    <div className="  ">
      <Hero />
      <Categories />
    </div>
  );
}

const products = [
  {
    _id: 1,
    name: "Product 1",
    category: "smartphone",
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
  {
    _id: 2,
    name: "Product 2",
    category: "smartwatch",
    images: [
      "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
  {
    _id: 3,
    name: "Product 3",
    category: "laptop",
    images: [
      "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
  {
    _id: 4,
    name: "Product 4",
    category: "headphone",
    images: [
      "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
  {
    _id: 5,
    name: "Product 5",
    category: "smartphone",
    images: [
      "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
  {
    _id: 6,
    name: "Product 6",
    category: "smartwatch",
    images: [
      "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price: 1000,
  },
];
