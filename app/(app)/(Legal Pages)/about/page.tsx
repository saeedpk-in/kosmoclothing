import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="px-40 pt-20">
      <h1 className="text-6xl font-extrabold tracking-tight">About Us</h1>
      <div className="space-y-6 pt-10">
        <div className="flex items-start gap-10 ">
          <Image
            src={"/kosmo.jpg"}
            alt="logo"
            width={300}
            height={300}
            className="rounded-3xl mb-4 border-2"
            priority={true}
          />
          <p className="max-w-lg tracking-tight font-medium leading-8">
            We are a minimalist brand focused on essential design and quality
            craftsmanship. Founded in 20XX, our mission is to strip away the
            unnecessary and deliver products with purpose. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Temporibus dolorum nulla esse a
            officia. Soluta reprehenderit vel iste cum expedita autem porro,
            sequi doloremque dolores laborum molestiae ipsa voluptatem et. We
            are a minimalist brand focused on essential design and quality
          </p>
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight">
          Our Philosophy
        </h2>
        <p>
          Black and white isn't just a color scheme - it's a mindset. We believe
          in clarity, contrast, and the beauty of simplicity in an increasingly
          complex world.
        </p>

        <h2 className="text-4xl font-extrabold tracking-tight">The Team</h2>
        <div className="flex gap-10 items-start">
          <Image
            src={"/founder.jpg"}
            alt="logo"
            width={300}
            height={300}
            className="rounded-3xl mb-4 border-2 aspect-square object-cover"
            priority={true}
          />
          <div className="">
            <h3 className="text-2xl font-bold tracking-tight">Munavir </h3>
            <p className="text-xs">Founder & CEO <br/> kosmo clothing</p>
            <p className="max-w-lg tracking-tight font-medium leading-8">
              We are a small group of designers, thinkers, and makers committed
              to intentional living and thoughtful production.
            </p>
          </div>
        </div>
                
        {/* <p>
          A small group of designers, thinkers, and makers committed to
          intentional living and thoughtful production.
        </p> */}
      </div>
    </div>
  );
}
