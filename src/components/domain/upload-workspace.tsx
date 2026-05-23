"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleDot,
  Compass,
  FileUp,
  Grid2X2,
  HelpCircle,
  Layers3,
  Lock,
  Maximize2,
  Ruler,
  ScanLine,
  ShieldCheck,
  Sparkles,
  SquareStack,
  Upload,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRoomsQuery } from "@/lib/queries";
import { useDesignWorkspaceStore, type UploadPhase } from "@/stores/design-workspace-store";
import { cn } from "@/lib/utils";

const acceptedFormats = ["PDF", "DWG", "DXF", "PNG", "JPG", "HEIC"];

const guidanceCards = [
  {
    title: "High Resolution Plans",
    detail: "Clear plans improve spatial detection accuracy.",
    icon: ScanLine,
  },
  {
    title: "Include Dimensions",
    detail: "Dimension annotations improve layout precision.",
    icon: Ruler,
  },
  {
    title: "Show Structural Layers",
    detail: "Walls, windows, and fixtures improve AI understanding.",
    icon: Layers3,
  },
  {
    title: "Correct Orientation",
    detail: "Ensure north orientation and room labels are visible.",
    icon: Compass,
  },
];

const inspectorSignals = [
  {
    label: "Room detection",
    detail: "Living, dining, kitchen, entry, utility",
    value: 94,
    icon: SquareStack,
  },
  {
    label: "Circulation analysis",
    detail: "Primary route width validated",
    value: 82,
    icon: Waypoints,
  },
  {
    label: "Structural validation",
    detail: "Load-bearing walls marked for review",
    value: 78,
    icon: Building2,
  },
  {
    label: "Window identification",
    detail: "West-facing daylight source detected",
    value: 87,
    icon: Maximize2,
  },
  {
    label: "Plumbing zones",
    detail: "Kitchen chase and wet wall localized",
    value: 74,
    icon: Grid2X2,
  },
  {
    label: "Scale verification",
    detail: "Reference wall matched at 4200 mm",
    value: 96,
    icon: Ruler,
  },
];

const phaseCopy: Record<UploadPhase, { label: string; progress: number; tone: string }> = {
  empty: { label: "Waiting for upload", progress: 0, tone: "text-white/42" },
  uploading: { label: "Uploading encrypted plan", progress: 32, tone: "text-white/68" },
  parsing: { label: "AI parsing architectural layers", progress: 68, tone: "text-cyan-100" },
  detected: { label: "Spatial model ready", progress: 100, tone: "text-cyan-100" },
};

export function UploadWorkspace() {
  const uploadPhase = useDesignWorkspaceStore((state) => state.uploadPhase);
  const setUploadPhase = useDesignWorkspaceStore((state) => state.setUploadPhase);
  const { data: rooms = [] } = useRoomsQuery();
  const [dragActive, setDragActive] = useState(false);
  const timeoutRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const hasPlan = uploadPhase !== "empty";
  const completedSignals = uploadPhase === "detected" ? inspectorSignals.length : uploadPhase === "parsing" ? 3 : 0;

  const startUpload = () => {
    timeoutRef.current.forEach(clearTimeout);
    setUploadPhase("uploading");
    timeoutRef.current = [
      setTimeout(() => setUploadPhase("parsing"), 760),
      setTimeout(() => setUploadPhase("detected"), 1900),
    ];
  };

  useEffect(() => {
    const timers = timeoutRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const headerStatus = useMemo(() => {
    if (uploadPhase === "detected") return "Plan analyzed";
    if (uploadPhase === "parsing") return "AI analyzing";
    if (uploadPhase === "uploading") return "Secure upload";
    return "Step 02 / Intake";
  }, [uploadPhase]);

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="relative min-h-full overflow-hidden rounded-[1.65rem] border border-white/[0.08] bg-[#0a0b0b] shadow-2xl shadow-black/30">
        <div className="pointer-events-none absolute inset-0 calm-grid opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(165,243,252,0.095),transparent_32%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.055),transparent_24%),linear-gradient(to_bottom,transparent,#0a0b0b_88%)]" />

        <div className="relative space-y-4 p-4 sm:p-5">
          <WorkspaceHeader
            status={headerStatus}
            hasPlan={hasPlan}
            onReset={() => setUploadPhase("empty")}
          />

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <main className="min-w-0 space-y-4">
              <ArchitecturalDropzone
                phase={uploadPhase}
                dragActive={dragActive}
                onDragActive={setDragActive}
                onUpload={startUpload}
              />
              <SecurityStrip />
              <GuidelinesPanel />
            </main>

            <PlanInspector
              phase={uploadPhase}
              completedSignals={completedSignals}
              onUseSample={startUpload}
            />
          </div>

          {uploadPhase === "detected" && (
            <DetectedPlanWorkspace rooms={rooms} />
          )}
        </div>
      </div>
    </div>
  );
}

function WorkspaceHeader({
  status,
  hasPlan,
  onReset,
}: {
  status: string;
  hasPlan: boolean;
  onReset: () => void;
}) {
  return (
    <section className="rounded-[1.35rem] border border-white/[0.08] bg-[#111212]/82 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs text-white/48">
            <CircleDot className="size-2 fill-cyan-100 text-cyan-100" />
            {status}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Upload Floor Plan
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
            Upload architectural plans, sketches, or room layouts to begin spatial intelligence analysis.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-white/[0.1] bg-white/[0.025] text-white/62 hover:bg-white/[0.06] hover:text-white"
          >
            <HelpCircle className="size-4" />
            How it works
          </Button>
          {hasPlan && (
            <Button
              variant="outline"
              className="h-10 rounded-xl border-white/[0.1] bg-transparent text-white/58 hover:bg-white/[0.06] hover:text-white"
              onClick={onReset}
            >
              Reset upload
            </Button>
          )}
          <WorkflowIndicator />
        </div>
      </div>
    </section>
  );
}

function WorkflowIndicator() {
  const steps = ["Project", "Upload", "Analyze", "Discovery", "Generate"];

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/20 p-1">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            "flex h-8 items-center gap-2 rounded-xl px-2.5 text-xs",
            index === 1
              ? "bg-cyan-100/12 text-cyan-100"
              : index < 1
                ? "text-white/58"
                : "text-white/28"
          )}
        >
          <span
            className={cn(
              "grid size-4 place-items-center rounded-full border text-[10px]",
              index <= 1 ? "border-cyan-100/30" : "border-white/[0.08]"
            )}
          >
            {index < 1 ? <Check className="size-2.5" /> : index + 1}
          </span>
          <span className="hidden xl:inline">{step}</span>
        </div>
      ))}
    </div>
  );
}

function ArchitecturalDropzone({
  phase,
  dragActive,
  onDragActive,
  onUpload,
}: {
  phase: UploadPhase;
  dragActive: boolean;
  onDragActive: (value: boolean) => void;
  onUpload: () => void;
}) {
  const phaseState = phaseCopy[phase];
  const processing = phase === "uploading" || phase === "parsing";

  return (
    <section
      className={cn(
        "group relative min-h-[520px] overflow-hidden rounded-[1.65rem] border border-dashed bg-[#080909] transition-all duration-300",
        dragActive
          ? "border-cyan-100/46 shadow-[0_0_70px_rgba(165,243,252,0.12)]"
          : "border-white/[0.14] hover:border-cyan-100/30 hover:shadow-[0_0_58px_rgba(165,243,252,0.08)]"
      )}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragActive(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        onDragActive(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        onDragActive(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDragActive(false);
        onUpload();
      }}
    >
      <div className="absolute inset-0 spatial-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(165,243,252,0.1),transparent_32%)]" />
      <div className="scan-beam absolute left-10 right-10 top-10 h-24 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/12 to-cyan-100/0" />

      <div className="relative flex min-h-[520px] flex-col items-center justify-center px-5 py-12 text-center">
        <motion.div
          animate={processing ? { opacity: [0.72, 1, 0.72] } : { opacity: 1 }}
          transition={{ duration: 2.4, repeat: processing ? Infinity : 0, ease: "easeInOut" }}
          className="relative mb-8 grid size-24 place-items-center rounded-[1.35rem] border border-cyan-100/18 bg-white/[0.045] shadow-2xl shadow-cyan-950/20"
        >
          <div className="absolute inset-3 rounded-2xl border border-white/[0.06]" />
          {phase === "detected" ? (
            <BadgeCheck className="size-9 text-cyan-100" />
          ) : processing ? (
            <ScanLine className="size-9 text-cyan-100" />
          ) : (
            <FileUp className="size-9 text-cyan-100" />
          )}
        </motion.div>

        <p className={cn("mb-3 text-xs font-medium uppercase tracking-[0.2em]", phaseState.tone)}>
          {phaseState.label}
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Drag and drop your floor plan here
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/46">
          Or browse files from your device
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            className="h-11 rounded-xl bg-cyan-100 px-5 text-black hover:bg-cyan-50"
            onClick={onUpload}
          >
            <Upload className="size-4" />
            Browse files
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-xl border-white/[0.1] bg-white/[0.025] px-5 text-white/62 hover:bg-white/[0.06] hover:text-white"
            onClick={onUpload}
          >
            Use sample plan
          </Button>
        </div>

        <div className="mt-8 flex max-w-xl flex-wrap justify-center gap-2">
          {acceptedFormats.map((format) => (
            <FormatPill key={format} label={format} />
          ))}
        </div>

        {processing && (
          <div className="mt-9 w-full max-w-md">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-white/42">Encrypted spatial intake</span>
              <span className="font-mono text-white/48">{phaseState.progress}%</span>
            </div>
            <Progress value={phaseState.progress} className="h-1.5 bg-white/[0.07]" />
          </div>
        )}
      </div>
    </section>
  );
}

function FormatPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/[0.09] bg-white/[0.028] px-3 py-1.5 font-mono text-[11px] text-white/42 transition-colors hover:border-cyan-100/22 hover:bg-cyan-100/[0.04] hover:text-cyan-100/80">
      {label}
    </span>
  );
}

function SecurityStrip() {
  return (
    <div className="flex flex-col gap-3 rounded-[1.1rem] border border-white/[0.07] bg-white/[0.025] p-4 text-sm text-white/46 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-black/18">
          <Lock className="size-4 text-cyan-100/80" />
        </span>
        <p>Your files are encrypted and securely processed.</p>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
        Private project storage
      </span>
    </div>
  );
}

function GuidelinesPanel() {
  return (
    <section className="rounded-[1.35rem] border border-white/[0.08] bg-[#111212]/82 p-4 shadow-2xl shadow-black/20">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">Best Practices For Accurate Analysis</p>
          <p className="mt-1 text-xs text-white/38">
            Better plan input produces cleaner room detection, scale validation, and design constraints.
          </p>
        </div>
        <span className="text-xs text-white/32">Architectural intake guide</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {guidanceCards.map((card) => (
          <GuidanceCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

function GuidanceCard({
  title,
  detail,
  icon: Icon,
}: {
  title: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group min-h-36 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-cyan-100/16 hover:bg-white/[0.045]">
      <Icon className="mb-8 size-4 text-cyan-100/72 transition-colors group-hover:text-cyan-100" />
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="mt-2 text-xs leading-5 text-white/42">{detail}</p>
    </div>
  );
}

function PlanInspector({
  phase,
  completedSignals,
  onUseSample,
}: {
  phase: UploadPhase;
  completedSignals: number;
  onUseSample: () => void;
}) {
  const phaseState = phaseCopy[phase];
  const isEmpty = phase === "empty";

  return (
    <aside className="rounded-[1.35rem] border border-white/[0.08] bg-[#111212]/86 p-4 shadow-2xl shadow-black/24 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">AI Plan Inspector</p>
          <p className="mt-1 text-xs text-white/38">{phaseState.label}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-black/20">
          <Sparkles className="size-4 text-cyan-100" />
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090a0a]">
        <InspectorPlanPreview active={!isEmpty} />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/42">Analysis readiness</span>
          <span className="font-mono text-white/48">{phaseState.progress}%</span>
        </div>
        <Progress value={phaseState.progress} className="h-1.5 bg-white/[0.07]" />
      </div>

      {isEmpty ? (
        <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-sm font-medium text-white">Waiting for upload</p>
          <p className="mt-2 text-sm leading-6 text-white/44">
            Once a plan is uploaded, the inspector will validate scale, detect rooms,
            identify openings, and surface structural warnings.
          </p>
          <Button
            className="mt-5 h-10 w-full rounded-xl bg-cyan-100 text-black hover:bg-cyan-50"
            onClick={onUseSample}
          >
            Try sample analysis
            <ArrowRight className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {inspectorSignals.map((signal, index) => (
            <InspectorSignal
              key={signal.label}
              {...signal}
              active={index < completedSignals || phase === "parsing"}
              complete={index < completedSignals}
            />
          ))}
          {phase === "detected" && (
            <IntelligentWarning />
          )}
        </div>
      )}
    </aside>
  );
}

function InspectorPlanPreview({ active }: { active: boolean }) {
  return (
    <div className="spatial-grid relative h-52 overflow-hidden">
      <div className="absolute inset-6 rounded-xl border border-white/20" />
      <div className={cn("absolute left-[18%] top-[22%] h-[36%] w-[38%] rounded-lg border", active ? "border-cyan-100/34 bg-cyan-100/[0.055]" : "border-white/14 bg-white/[0.018]")} />
      <div className="absolute right-[17%] top-[22%] h-[25%] w-[24%] rounded-lg border border-white/18 bg-white/[0.018]" />
      <div className="absolute bottom-[21%] left-[18%] h-[22%] w-[64%] rounded-lg border border-white/18 bg-white/[0.018]" />
      {active && (
        <>
          <div className="absolute left-[26%] top-[36%] size-2 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(165,243,252,0.35)]" />
          <div className="absolute bottom-[31%] left-[25%] right-[22%] h-12 rounded-full bg-cyan-100/[0.06] blur-xl" />
          <div className="scan-beam absolute inset-x-8 top-6 h-12 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/10 to-cyan-100/0" />
        </>
      )}
    </div>
  );
}

function InspectorSignal({
  label,
  detail,
  value,
  icon: Icon,
  active,
  complete,
}: {
  label: string;
  detail: string;
  value: number;
  icon: LucideIcon;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className={cn("rounded-xl border p-3 transition-colors", active ? "border-white/[0.08] bg-white/[0.03]" : "border-white/[0.05] bg-white/[0.018] opacity-55")}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-black/16">
          {complete ? <Check className="size-3.5 text-cyan-100" /> : <Icon className="size-3.5 text-white/42" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-medium text-white">{label}</p>
            <span className="font-mono text-[11px] text-white/38">{value}%</span>
          </div>
          <p className="mt-1 text-xs leading-5 text-white/40">{detail}</p>
          <Progress value={complete ? value : active ? 45 : 0} className="mt-2 h-1 bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
}

function IntelligentWarning() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.028] p-3">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-cyan-100/82" />
        <div>
          <p className="text-sm font-medium text-white">Kitchen chase needs review</p>
          <p className="mt-1 text-xs leading-5 text-white/42">
            Plumbing wall appears fixed. Confirm renovation limits before layout generation.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetectedPlanWorkspace({ rooms }: { rooms: Array<{ id: string; name: string; area: number; confidence: number }> }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
      <div className="rounded-[1.35rem] border border-white/[0.08] bg-[#111212]/86 p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Detected floor structure</p>
            <p className="mt-1 text-xs text-white/38">Editable room inventory</p>
          </div>
          <ShieldCheck className="size-4 text-cyan-100/76" />
        </div>
        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition-colors hover:bg-white/[0.045]"
            >
              <Layers3 className="size-4 text-cyan-100/74" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{room.name}</span>
                <span className="text-xs text-white/38">{room.area} m2</span>
              </span>
              <span className="font-mono text-[11px] text-white/38">{room.confidence}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#090a0a]">
        <div className="absolute inset-0 spatial-grid opacity-60" />
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#111212]/86 px-3 py-2 backdrop-blur-xl">
          <div>
            <p className="text-xs text-white/38">Hudson Loft / Level 01</p>
            <p className="text-sm font-medium">AI analysis canvas</p>
          </div>
          <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/22 p-1 sm:flex">
            {[Ruler, Grid2X2, Layers3, Maximize2].map((Icon, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon-sm"
                className="rounded-xl text-white/46 hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>
        <div className="relative flex min-h-[420px] items-center justify-center px-6 pt-20">
          <div className="relative aspect-[4/3] w-full max-w-3xl rounded-2xl border border-white/12 bg-white/[0.025] p-8 shadow-2xl shadow-black/30">
            <div className="absolute inset-8 rounded-xl border border-white/32" />
            <div className="absolute left-[13%] top-[18%] h-[47%] w-[42%] rounded-lg border border-cyan-100/42 bg-cyan-100/[0.04]" />
            <div className="absolute right-[17%] top-[18%] h-[31%] w-[23%] rounded-lg border border-white/28 bg-white/[0.025]" />
            <div className="absolute bottom-[16%] left-[13%] h-[22%] w-[70%] rounded-lg border border-white/28 bg-white/[0.018]" />
            <div className="absolute left-[55%] top-[47%] h-px w-[18%] bg-white/42" />
            <div className="absolute left-[30%] bottom-[38%] h-px w-[18%] bg-white/42" />
            <div className="absolute left-[25%] top-[31%] size-2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(165,243,252,0.32)]" />
            <div className="absolute right-[27%] bottom-[27%] size-2 rounded-full bg-cyan-100/80" />
            <div className="absolute bottom-[34%] left-[23%] right-[22%] h-20 rounded-full bg-cyan-100/[0.055] blur-xl" />
            <div className="scan-beam absolute inset-x-10 top-10 h-16 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/10 to-cyan-100/0" />
          </div>
        </div>
      </div>
    </section>
  );
}
