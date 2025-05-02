import React from "react";
import Link from "next/link"; // Assuming you use Next.js for routing
import Image from "next/image";

const Footer = () => {
  return (
    <footer className=" py-10">
      <div className="px-5 md:px-24 space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo/Branding or Additional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-x-1">
              <Image
                src={"/kosmo-icon.jpg"}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
                priority={true}
              />
              <h1 className="text-2xl font-bold">kosmo</h1>
            </div>
            <p className="text-sm text-gray-500 mb-4 max-w-2xs ml-3">
              Kosmo Clothing is a leading online fashion retailer, offering a
              wide range of stylish and trendy clothing
            </p>
          </div>
          {/* Links Section */}
          <div className="text-sm pl-3">
            <ul className="gap-2 flex flex-col">
              <li>
                <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-500 hover:text-gray-900">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-500 hover:text-gray-900">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full text-sm font-semibold md:text-center ml-2 text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Kosmo Clothing. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
