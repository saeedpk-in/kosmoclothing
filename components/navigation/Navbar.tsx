"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import hamburger menu icons
import { ArrowRight, WalletCardsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SearchBtn from "../intractive/SearchBtn";
import {} from "next/router";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="bg-white dark:bg-black sticky top-0 z-50 shadow-sm">
//       <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo and hamburger menu (mobile) */}
//           <div className="flex items-center justify-between w-full md:w-auto">
//             <div className="flex items-center gap-x-1">
//               <Image
//                 src={"/kosmo-icon.jpg"}
//                 alt="logo"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//                 priority={true}
//               />
//               <h1 className="text-2xl font-bold">kosmo</h1>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-500 hover:text-gray-600 focus:outline-none"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <div>
//               <ul className="flex space-x-4 items-center">
//                 <li>
//                   <Link
//                     href="/shop"
//                     className="hover:underline text-primary/60 text-sm"
//                   >
//                     Shop
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/about"
//                     className="hover:underline text-primary/60 text-sm"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/contact"
//                     className="hover:underline text-primary/60 text-sm"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Desktop Right Side Items */}
//           <div className="hidden md:flex items-center space-x-4">
//             <SearchBtn />
//             <Link href="/pocket">
//               <Button variant={"secondary"}>
//                 <WalletCardsIcon size={20} />
//               </Button>
//             </Link>
//             {session?.user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline">
//                     <div className="flex items-center justify-between space-x-3">
//                       <Image
//                         src={session?.user?.image || "/default-user.jpg"}
//                         alt={session?.user?.name || "user icon"}
//                         width={20}
//                         height={20}
//                         className="rounded-full"
//                       />
//                       <span className="hidden sm:inline">
//                         {session.user?.name}
//                       </span>
//                     </div>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56">
//                   {/* ... rest of your dropdown menu items ... */}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link href="/signin" className="text-xl">
//                 <Button className="group p-3 rounded-xl">
//                   Login Now{" "}
//                   <ArrowRight className="transition-all duration-300 ease-in-out group-hover:translate-x-1" />
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
//           <div className="pt-2 pb-4 space-y-1">
//             <Link
//               href="/shop"
//               className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               Shop
//             </Link>
//             <Link
//               href="/about"
//               className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               Contact
//             </Link>

//             <div className="px-3 py-2">
//               <SearchBtn mobile />
//             </div>

//             <Link
//               href="/pocket"
//               className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               <Button variant={"secondary"} className="w-full">
//                 <WalletCardsIcon size={20} className="mr-2" />
//                 My Pocket
//               </Button>
//             </Link>

//             {session?.user ? (
//               <div className="px-3 py-2">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" className="w-full">
//                       <div className="flex items-center justify-between">
//                         <Image
//                           src={session?.user?.image || "/default-user.jpg"}
//                           alt={session?.user?.name || "user icon"}
//                           width={20}
//                           height={20}
//                           className="rounded-full mr-2"
//                         />
//                         <span>Account</span>
//                       </div>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56">
//                     {/* ... rest of your dropdown menu items ... */}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             ) : (
//               <Link
//                 href="/signin"
//                 className="block px-3 py-2"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <Button className="w-full group">
//                   Login Now{" "}
//                   <ArrowRight className="transition-all duration-300 ease-in-out group-hover:translate-x-1 ml-2" />
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };
const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reminder, setReminder] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkReminder = () => {
      const value = localStorage.getItem("cart-reminder") === "true";
      setReminder(value);
    };

    checkReminder(); // Check on first load

    // Listen to custom event
    window.addEventListener("cartReminderChanged", checkReminder);

    // Cleanup
    return () => {
      window.removeEventListener("cartReminderChanged", checkReminder);
    };
  }, []);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setIsOpen(false);
  //   };
  //   const handleRouteChangeStart = () => {
  //     setIsOpen(false);
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);
  useEffect(() => {
    // Close navbar whenever the route changes
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    }
    return () => {
      document.body.style.overflow = "unset"; // Allow scrolling when menu is closed
    };
  }, [isOpen]);

  return (
    <header
      className={` backdrop-blur-md dark:bg-black sticky  z-50 transition-all duration-300 h-fit   ${
        isScrolled
          ? "shadow-md py-2 top-0 bg-white/70"
          : pathname === "/"
          ? "shadow-sm py-4 top-10 rounded-t-3xl mx-4 sm:mx-6 bg-white/40"
          : "shadow-sm py-4 "
      }`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo and hamburger menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/">
              <div className="flex items-center gap-x-1">
                <Image
                  src={"/kosmo-icon.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority={true}
                />
                <h1 className="text-2xl font-bold">kosmo</h1>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X
                  size={24}
                  className="transform transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={24}
                  className="transform transition-transform duration-300"
                />
              )}
            </button>
          </div>

          {/* Desktop Navigation (unchanged) */}
          <div className="hidden md:flex items-center space-x-4">
            <div>
              <ul
                className={`flex space-x-4 items-center font-extrabold  ${
                  pathname === "/" && !isScrolled
                    ? "text-white/80"
                    : "text-primary/60"
                }`}
              >
                <li>
                  <Link href="/shop" className="text-sm">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Right Side Items (unchanged) */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBtn />
            <Link href="/pocket">
              <Button variant={"secondary"} className="rounded-full">
                {reminder && (
                  <Badge className="absolute p-0 w-2 h-2 bg-red-600 translate-x-3 -translate-y-4" />
                )}
                <WalletCardsIcon size={20} />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={session?.user?.image || "/default-user.png"}
                  alt={session?.user?.name || "user icon"}
                  width={30}
                  height={30}
                  className="rounded-full border-black w-full h-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/pocket">
                    <DropdownMenuItem>
                      Pocket
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem>
                      Orders
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/shop">
                    <DropdownMenuItem>
                      Shop
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {session?.user ? (
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ) : (
                  <Link href="/signin">
                    <DropdownMenuItem>
                      Log In
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation with Animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0.1 },
                  height: { duration: 0.2 },
                },
              }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-2 pb-4 space-y-1"
              >
                <Link href="/shop">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </motion.div>
                </Link>

                <Link href="/about">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </motion.div>
                </Link>

                <Link href="/contact">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </motion.div>
                </Link>

                <div className="px-3 py-2">
                  <SearchBtn mobile />
                </div>

                <Link
                  href="/pocket"
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant={"secondary"} className="w-full">
                    <WalletCardsIcon size={20} className="mr-2" />
                    My Pocket
                  </Button>
                </Link>

                {session?.user ? (
                  <div className="px-3 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <div className="flex items-center justify-between">
                            <Image
                              src={session?.user?.image || "/default-user.jpg"}
                              alt={session?.user?.name || "user icon"}
                              width={20}
                              height={20}
                              className="rounded-full mr-2"
                            />
                            <span>Account</span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {/* ... rest of your dropdown menu items ... */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link
                    href="/signin"
                    className="block px-3 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full group">
                      Login Now{" "}
                      <ArrowRight className="transition-all duration-300 ease-in-out group-hover:translate-x-1 ml-2" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Optional: Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-100 bg-black z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
