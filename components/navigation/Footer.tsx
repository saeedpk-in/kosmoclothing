// import React from "react";
// import Link from "next/link"; // Assuming you use Next.js for routing
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <footer className=" py-10">
//       <div className="px-5 md:px-24 space-y-3">
//         <div className="flex flex-col md:flex-row justify-between items-start">
//           {/* Logo/Branding or Additional Information */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-x-1">
//               <Image
//                 src={"/kosmo-icon.png"}
//                 alt="logo"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//                 priority={true}
//               />
//               <h1 className="text-2xl font-bold">kosmo</h1>
//             </div>
//             <p className="text-sm text-gray-500 mb-4 max-w-2xs ml-3">
//               Kosmo Clothing is a leading online fashion retailer, offering a
//               wide range of stylish and trendy clothing
//             </p>
//           </div>
//           {/* Links Section */}
//           <div className="text-sm pl-3">
//             <ul className="gap-2 flex flex-col">
//               <li>
//                 <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-900">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-900">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/refund-policy" className="text-gray-500 hover:text-gray-900">
//                   Refund Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/shipping-policy" className="text-gray-500 hover:text-gray-900">
//                   Shipping Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="w-full text-sm font-semibold md:text-center ml-2 text-gray-600">
//           <p>
//             &copy; {new Date().getFullYear()} Kosmo Clothing. All rights
//             reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconBrandThreads , IconBrandX , IconBrandLinkedin,IconBrandInstagram } from '@tabler/icons-react';

const Footer = () => {
  const linkGroups = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/shop" },
        { name: "Trending", href: "/shop?category=trending" },
        { name: "Men's Collection", href: "/shop?category=mens" },
        { name: "Women's Collection", href: "/shop?category=women" },
        { name: "Casual Collection", href: "/shop?category=casual" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Shipping Info", href: "/shipping-policy" },
        { name: "Returns & Exchanges", href: "/return-policy" },
        { name: "About Us", href: "/about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Refund Policy", href: "/return-policy" },
        { name: "Shipping Policy", href: "/shipping-policy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <IconBrandInstagram size={18} />, href: "https://www.instagram.com/kosmo._clothing?igsh=M2hucndpMGx5MGtk" },
    { icon: <IconBrandThreads size={18} />, href: "https://www.threads.com/@kosmo._clothing?igshid=NTc4MTIwNjQ2YQ==" },
    { icon: <IconBrandX size={18} />, href: "https://x.com/kosmo_clothing?s=21" },
    { icon: <IconBrandLinkedin size={18} />, href: "https://www.linkedin.com/in/kosmo-clothing-44aa00363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
  ];

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/kosmo-icon.png"
                alt="Kosmo Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <h2 className="text-2xl font-bold">kosmo</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Elevating everyday style with sustainable, futuristic fashion that blends innovation with timeless design.
            </p>
            
            {/* Newsletter Signup */}
            {/* <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Join our newsletter
              </h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  →
                </button>
              </form>
            </div> */}
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Kosmo Clothing. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;