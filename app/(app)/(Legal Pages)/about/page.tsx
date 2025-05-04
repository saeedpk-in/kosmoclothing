import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-40 py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Crafting Timeless Essentials
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl">
          Where minimalism meets exceptional craftsmanship. Since 2020, we've
          been redefining wardrobe essentials with purpose and precision.
        </p>
      </div>

      {/* Brand Story */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              We started with nothing but a dream — no money, no team, no
              roadmap. Just belief. Kosmo wasn’t born in a boardroom. It was
              built in bedrooms, backyards, and borrowed spaces. When we
              launched, the only asset we had was our vision. No fancy gear, no
              deep pockets — just raw passion and the guts to keep going when
              everything around us said to quit. We’ve faced setbacks, made
              mistakes, and hit more walls than we can count. But we survived.
              We learned. And we kept building — piece by piece, drop by drop —
              until Kosmo became more than a name. It became a symbol of
              resilience. Today, Kosmo is in a good place — not because it was
              easy, but because it was real. We’ve never followed trends. We’ve
              followed truth. That’s why every product we put out carries our
              story — one of risk, rebellion, and rising above.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We don’t create for the masses. We create for the few who know
              what it means to bet on yourself and never back down. Kosmo is
              rare — because the journey that built it was.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/5] w-full h-fit rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/kosmo.jpg"
            alt="Kosmo clothing studio"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-gray-50 p-16 md:p-24 mb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Minimal by Design
              </h3>
              <p className="text-gray-600">
                We believe in stripping back to the essentials, creating pieces
                that serve as the foundation of a thoughtful wardrobe.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Quality as Standard
              </h3>
              <p className="text-gray-600">
                Every stitch, seam, and fabric is carefully considered to ensure
                longevity and comfort that lasts.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Sustainable by Nature
              </h3>
              <p className="text-gray-600">
                From sourcing to production, we prioritize ethical practices
                that respect both people and planet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto mb-24" id={"meet-founders"}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Meet the Founders
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Founder 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative aspect-square w-full md:w-1/3 min-w-[200px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/founder.JPG"
                alt="Munavir - Founder & CEO"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900">
                Muhammed Munavir
              </h3>
              <p className="text-sm text-gray-500 mb-4">Founder & CEO</p>
              <p className="text-gray-600 leading-relaxed">
                Kosmo was founded by Munavir, with a vision to create more than
                just clothing — to build a universe where style speaks louder
                than trends and individuality comes first. What started as a
                personal creative outlet quickly evolved into a bold brand
                rooted in self-expression, culture, and conscious design.
              </p>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative aspect-square w-full md:w-1/3 min-w-[200px] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/co-founder.JPG" // You might want a different image
                alt="Co-Founder"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900">
                Muhammed Uways
              </h3>
              <p className="text-sm text-gray-500 mb-4">Co-Founder</p>
              <p className="text-gray-600 leading-relaxed">
                Joining him on this journey is Uways, co-founder and creative
                force, bringing energy, insight, and a shared passion for
                reshaping how fashion connects with identity. Together, they’ve
                built Kosmo as a response to a world that too often tries to
                define you before you can define yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black rounded-2xl p-8 md:p-12 text-center text-white max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join Our Journey
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-indigo-100">
          Discover the difference intentional design can make in your everyday
          wear.
        </p>
        <Button variant={"secondary"} asChild>
          <Link href="/shop">Shop Our Collection</Link>
        </Button>
      </div>
    </div>
  );
}
