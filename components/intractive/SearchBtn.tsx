"use client";

import * as React from "react";
import { ArrowRight, SearchIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export default function SearchBtn({ mobile }: { mobile?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [searchQry, setSearchQry] = React.useState("");
  const router = useRouter();
  const openRef = React.useRef(open); // Use ref to track the latest 'open' state

  // Update the ref whenever the 'open' state changes
  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Toggle 'open' on Cmd/Ctrl + K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }

      // Close the modal on Escape key press
      if (openRef.current && e.key === "Escape") {
        e.preventDefault();
        setOpen(false); // Close the modal
      }

      // Trigger the submit on Enter key press
      if (openRef.current && e.key === "Enter") {
        e.preventDefault();
        if (!searchQry) return; // Don't submit if search query is empty
        onSubmit(); // Call the submit function
        setOpen(false); // Close the modal
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", down);

    // Cleanup event listener on component unmount
    return () => document.removeEventListener("keydown", down);
  }, [onSubmit]); // Include onSubmit as a dependency to ensure it's stable
  function onSubmit() {
    const params = new URLSearchParams(window.location.search);

    if (searchQry) {
      params.set("search", searchQry);
      params.delete("category");
    } else {
      params.delete("search");
    }
    setOpen(false);
    router.push(`/shop?${params.toString()}`);
  }
  return (
    <>
      <button
        className={
          (mobile ? "w-full" : "w-fit") +
          "border-input bg-background/50 text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9  rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        }
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
        <kbd className="bg-background/60 text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.525rem] font-medium">
          <span className="flex mr-1">Ctrl</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Products </DialogTitle>
            <DialogDescription className="text-xs ">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="relative flex rounded-md shadow-xs">
            <Input
              className="peer ps-9 -me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
              placeholder="Type to search..."
              type="email"
              value={searchQry}
              onChange={(e) => setSearchQry(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} aria-hidden="true" />
            </div>
            <button
              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-9 items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Submit"
              id="Submit"
              disabled={!searchQry}
              onClick={onSubmit}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
