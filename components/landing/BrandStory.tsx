import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

function BrandStory() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-20 py-24 max-w-[1920px] mx-auto bg-gray-50">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="relative w-full">
        <Image
          src="/shadow.PNG"
          alt="Our Brand Story"
          width={800}
          height={600}
          className="rounded-2xl shadow-xl w-full object-cover" 
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6">Our <span className="font-black">Story</span></h2>
        <p className="text-lg mb-4">
          Founded in 2020, we started with a simple mission: to create clothing that blends timeless style with modern comfort.
        </p>
        <p className="text-lg mb-6">
          Every piece in our collection is crafted with attention to detail, using sustainable materials and ethical manufacturing practices.
        </p>
        <Button
          className="group mt-6 flex items-center bg-black hover:bg-black text-white rounded-full px-6 py-8 font-semibold shadow-xl w-fit"
          asChild
        >
          <Link href="/shop">
            Learn more about us{" "}
            <span className="ml-2 bg-white text-black p-2 rounded-full transition-all duration-300 ease-in-out group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  </section>
  )
}

export default BrandStory