import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={"loading"}>
      {children}
    </Suspense>
  );
}
