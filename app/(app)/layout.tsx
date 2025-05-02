import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { SessionProvider } from "next-auth/react";
import ClientSession from "@/hooks/ClientSession";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <ClientSession >
        <Navbar />
          {children}
        <Footer />
      </ClientSession>
    </div>
  );
}
