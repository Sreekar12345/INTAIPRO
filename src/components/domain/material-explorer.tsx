"use client";

import { Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  SearchBar,
  Surface,
} from "@/components/workspace/workspace-primitives";
import { useMaterialsQuery } from "@/lib/queries";

export function MaterialExplorer() {
  const { data: items = [] } = useMaterialsQuery();

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-4">
        <Surface className="p-5">
          <PageHeader
            eyebrow="Material explorer"
            title="Specify finishes, fixtures, fabrics, and palettes"
            description="A high-density catalog for flooring, wall finishes, laminates, marble, fabrics, and lighting fixtures with compare and room-application preview."
            action={<Button variant="outline" className="rounded-xl border-white/[0.09] bg-transparent text-white/58 hover:bg-white/[0.055] hover:text-white"><SlidersHorizontal className="size-4" />Filters</Button>}
          />
        </Surface>
        <Surface className="p-4">
          <div className="mb-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
            <SearchBar placeholder="Search materials, finishes, vendors" />
            <Button className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">Compare mode</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                <div className="h-36 border-b border-white/[0.07]" style={{ background: `linear-gradient(135deg, ${item.tone}, color-mix(in oklab, ${item.tone} 60%, white))` }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="mt-1 text-xs text-white/40">{item.category} / {item.finish}</p>
                    </div>
                    <Heart className={item.favorite ? "size-4 fill-cyan-100 text-cyan-100" : "size-4 text-white/34"} />
                  </div>
                  <p className="mt-4 font-mono text-xs text-white/40">{item.priceBand}</p>
                </div>
              </article>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}
