
import AuthTabs from "@/components/intractive/AuthTabs";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-zinc-300 to-white p-4">
      <Suspense fallback={"loading"}>
        <AuthTabs />
      </Suspense>
    </div>
  );
}

export default page;
