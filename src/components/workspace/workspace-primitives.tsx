"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  CircleDot,
  FileUp,
  Grid2X2,
  Layers3,
  Lock,
  Maximize2,
  MousePointer2,
  Ruler,
  Search,
  Sparkles,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/58">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function Surface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[1.35rem] border border-white/[0.08] bg-[#111212]/88 shadow-2xl shadow-black/20",
        className
      )}
    >
      {children}
    </section>
  );
}

export function WorkspaceFrame({
  left,
  center,
  right,
  bottom,
}: {
  left?: React.ReactNode;
  center: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[680px] gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
      {left && <Surface className="hidden min-h-0 p-4 xl:block">{left}</Surface>}
      <Surface className="min-h-0 overflow-hidden">{center}</Surface>
      {right && <Surface className="hidden min-h-0 p-4 xl:block">{right}</Surface>}
      {bottom && <div className="xl:col-span-3">{bottom}</div>}
    </div>
  );
}

export function FloatingToolBar() {
  const tools = [
    { icon: MousePointer2, label: "Select" },
    { icon: ZoomOut, label: "Zoom out" },
    { icon: ZoomIn, label: "Zoom in" },
    { icon: Grid2X2, label: "Grid" },
    { icon: Ruler, label: "Measure" },
    { icon: Layers3, label: "Layers" },
    { icon: Maximize2, label: "Fullscreen" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/28 p-1 backdrop-blur-xl">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.label}
            variant="ghost"
            size="icon-sm"
            className="rounded-xl text-white/46 hover:bg-white/[0.06] hover:text-white"
            aria-label={tool.label}
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </div>
  );
}

export function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "cyan" | "warning" | "locked";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs",
        tone === "neutral" && "bg-white/[0.055] text-white/52",
        tone === "cyan" && "bg-cyan-100/12 text-cyan-100",
        tone === "warning" && "bg-white/[0.08] text-white/76",
        tone === "locked" && "bg-white/[0.04] text-white/34"
      )}
    >
      <CircleDot className="size-2 fill-current" />
      {label}
    </span>
  );
}

export function MetricRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-white/48">{label}</span>
        <span className="font-mono text-xs text-white/60">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5 bg-white/[0.07]" />
      {detail && <p className="mt-1 text-xs text-white/36">{detail}</p>}
    </div>
  );
}

export function InspectorPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-white/38">{subtitle}</p>
        </div>
        <Sparkles className="size-4 text-cyan-100" />
      </div>
      <Separator className="my-4 bg-white/[0.07]" />
      <div className="min-h-0 flex-1 space-y-4">{children}</div>
    </div>
  );
}

export function UploadDropzone({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-dashed border-cyan-100/20 bg-[#090a0a]">
      <div className="absolute inset-0 spatial-grid opacity-65" />
      <div className="scan-beam absolute left-12 right-12 top-12 h-20 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/12 to-cyan-100/0" />
      <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-7 grid size-20 place-items-center rounded-2xl border border-cyan-100/16 bg-white/[0.045]"
        >
          <FileUp className="size-8 text-cyan-100" />
        </motion.div>
        <h2 className="text-3xl font-semibold tracking-tight">Upload floor plan</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/48">
          Drag a plan, sketch, DWG export, or room image. The parser will validate
          scale, detect rooms, and prepare editable overlays.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            className="h-11 rounded-xl bg-cyan-100 px-5 text-black hover:bg-cyan-50"
            onClick={onUpload}
          >
            <FileUp className="size-4" />
            Upload floor plan
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-white/[0.1] bg-white/[0.025] text-white/68 hover:bg-white/[0.06] hover:text-white"
            onClick={onUpload}
          >
            Use sample plan
          </Button>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs text-white/38">
          {["PDF", "DWG", "DXF", "PNG", "JPG", "HEIC"].map((format) => (
            <span
              key={format}
              className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlanCanvas({
  mode = "analysis",
  overlay = true,
}: {
  mode?: "analysis" | "layout" | "render";
  overlay?: boolean;
}) {
  return (
    <div className="relative min-h-[560px] overflow-hidden bg-[#090a0a]">
      <div className="absolute inset-0 spatial-grid opacity-55" />
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#111212]/86 px-3 py-2 backdrop-blur-xl">
        <div>
          <p className="text-xs text-white/38">Hudson Loft / Level 01</p>
          <p className="text-sm font-medium">
            {mode === "layout" ? "Layout editor" : mode === "render" ? "Render staging" : "AI analysis canvas"}
          </p>
        </div>
        <FloatingToolBar />
      </div>
      <div className="relative flex min-h-[560px] items-center justify-center px-6 pt-20">
        <div className="relative aspect-[4/3] w-full max-w-3xl rounded-2xl border border-white/12 bg-white/[0.025] p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-8 rounded-xl border border-white/32" />
          <div className="absolute left-[13%] top-[18%] h-[47%] w-[42%] rounded-lg border border-cyan-100/42 bg-cyan-100/[0.035]" />
          <div className="absolute right-[17%] top-[18%] h-[31%] w-[23%] rounded-lg border border-white/28 bg-white/[0.025]" />
          <div className="absolute bottom-[16%] left-[13%] h-[22%] w-[70%] rounded-lg border border-white/28 bg-white/[0.018]" />
          <div className="absolute left-[55%] top-[47%] h-px w-[18%] bg-white/42" />
          <div className="absolute left-[30%] bottom-[38%] h-px w-[18%] bg-white/42" />
          {overlay && (
            <>
              <div className="absolute left-[25%] top-[31%] size-2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(165,243,252,0.32)]" />
              <div className="absolute right-[27%] bottom-[27%] size-2 rounded-full bg-cyan-100/80" />
              <div className="absolute bottom-[34%] left-[23%] right-[22%] h-20 rounded-full bg-cyan-100/[0.055] blur-xl" />
            </>
          )}
          {mode === "layout" && <FurnitureOverlay />}
          {mode === "render" && <RenderPreview />}
          <div className="scan-beam absolute inset-x-10 top-10 h-16 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/10 to-cyan-100/0" />
        </div>
      </div>
    </div>
  );
}

function FurnitureOverlay() {
  return (
    <>
      <div className="absolute left-[20%] top-[32%] h-[18%] w-[25%] rounded-xl border border-cyan-100/34 bg-cyan-100/[0.08]" />
      <div className="absolute left-[48%] top-[34%] h-[11%] w-[16%] rounded-full border border-white/28 bg-white/[0.045]" />
      <div className="absolute left-[28%] bottom-[24%] h-[8%] w-[26%] rounded-lg border border-white/24 bg-white/[0.035]" />
    </>
  );
}

function RenderPreview() {
  return (
    <div className="absolute inset-8 overflow-hidden rounded-xl">
      <Image
        src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1100&q=80"
        alt="AI render staging preview"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-78"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/18 px-3 text-white/42">
      <Search className="size-4" />
      <Input
        className="h-9 border-0 bg-transparent px-0 shadow-none placeholder:text-white/32 focus-visible:ring-0"
        placeholder={placeholder}
      />
    </div>
  );
}

export function SelectionCard({
  title,
  detail,
  active,
  icon: Icon = Check,
}: {
  title: string;
  detail?: string;
  active?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-24 flex-col items-start justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-colors hover:bg-white/[0.045]",
        active && "border-cyan-100/24 bg-cyan-100/[0.045]"
      )}
    >
      <Icon className={cn("size-4", active ? "text-cyan-100" : "text-white/44")} />
      <span>
        <span className="block text-sm font-medium text-white">{title}</span>
        {detail && <span className="mt-1 block text-xs leading-5 text-white/42">{detail}</span>}
      </span>
    </button>
  );
}

export function LockedRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
      <span className="text-sm text-white/48">{label}</span>
      <Lock className="size-3.5 text-white/30" />
    </div>
  );
}

export function MiniStageRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="grid gap-2 md:grid-cols-6">
      {["Upload", "Analyze", "Brief", "Layouts", "Renders", "Export"].map(
        (step, index) => (
          <div
            key={step}
            className={cn(
              "rounded-xl border border-white/[0.06] bg-white/[0.025] p-3",
              index === activeIndex && "border-cyan-100/24 bg-cyan-100/[0.045]"
            )}
          >
            <span
              className={cn(
                "mb-4 grid size-6 place-items-center rounded-full border text-[11px]",
                index < activeIndex && "border-cyan-100 bg-cyan-100 text-black",
                index === activeIndex && "border-cyan-100/28 text-cyan-100",
                index > activeIndex && "border-white/[0.1] text-white/36"
              )}
            >
              {index < activeIndex ? <Check className="size-3.5" /> : index + 1}
            </span>
            <p className="text-sm font-medium">{step}</p>
          </div>
        )
      )}
    </div>
  );
}

export function ProjectThumbnail({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-white/[0.04]", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover opacity-82 grayscale-[18%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
