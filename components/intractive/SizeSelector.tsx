"use client"
import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Size } from "@/types"

export default function SizeSelector({
  setSelectedSizes,
  sizes,
  selectedSizes
}:{
  sizes: Size[],
  setSelectedSizes:(sizes: Size) => void;
  selectedSizes:Size | undefined
}) {
  const id = useId()

  return (
    <fieldset className="space-y-4">
      <div className="flex gap-1.5 mt-5">
        {sizes.map((size) => (
          <label
            key={`${id}-${size}`}
            className="border-input has-data-[state=checked]:border-primary bg-zinc-200 has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border text-center px-5 py-4 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
          >
            <Checkbox
              id={`${id}-${size}`}
              // value={size}
              checked={selectedSizes === size}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedSizes(size);
                }
              }}
              className="sr-only after:absolute after:inset-0"
            />
            {/* {availableSizes.map((availableSize)=> size !== availableSize ).length === 0 && availableSizes} */}
            <span aria-hidden="true" className="text-sm font-medium">
              {size}
            </span>
            {/* <span className="sr-only">{item.label}</span> */}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
