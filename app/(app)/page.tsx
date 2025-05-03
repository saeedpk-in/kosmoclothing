import { auth } from "@/auth";
import BrandStory from "@/components/landing/BrandStory";
import Categories from "@/components/landing/Categories";
import Fasion from "@/components/landing/Fasion";
import Hero from "@/components/landing/Hero";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import NewArrivals from "@/components/landing/NewArrivals";
import NewsletterSignup from "@/components/landing/NewsletterSignup";
import Testimonials from "@/components/landing/Testimonial";
import TrendingItems from "@/components/landing/TrendingItems";
// import ProductsTray from "@/components/landing/ProductsTray";
export default async function Home() {
  const session = await auth();
  return (
    <div className="">
      <Hero />
      <Categories />
      <NewArrivals  />
      <BrandStory />
      <TrendingItems />
      <Fasion />
      <Testimonials />
      {/* <StyleEdit /> */}
      {/* <UserGallery /> */}
      {/* <SaleSection /> */}
      <NewsletterSignup />
      
    </div>
  );
}

