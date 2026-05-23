"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  CircleDot,
  Download,
  FileUp,
  FolderKanban,
  Home,
  ImageIcon,
  Layers3,
  Library,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sparkles,
  Upload,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavId =
  | "dashboard"
  | "projects"
  | "workspace"
  | "materials"
  | "renders"
  | "settings";

type NavItem = {
  id: NavId;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "workspace", label: "AI Workspace", icon: WandSparkles },
  { id: "materials", label: "Materials", icon: Library },
  { id: "renders", label: "Renders", icon: ImageIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

const workflowSteps = [
  "Upload",
  "Analyze",
  "Detect rooms",
  "Generate layouts",
  "Apply style",
  "Final render",
];

const detectedRooms = [
  { name: "Living", size: "28.4 m2", confidence: 98 },
  { name: "Kitchen", size: "10.1 m2", confidence: 93 },
  { name: "Dining", size: "14.8 m2", confidence: 91 },
  { name: "Entry", size: "6.2 m2", confidence: 88 },
];

const analysisMetrics = [
  { label: "Room confidence", value: 94 },
  { label: "Wall detection", value: 91 },
  { label: "Window mapping", value: 87 },
];

const activity = [
  "Ready to process floor plan files.",
  "Spatial model v2.8 loaded.",
  "Default output: 3 layout options.",
  "Export presets available after render.",
];

const recentProjects = [
  {
    title: "Hudson Loft",
    area: "Living / Dining",
    progress: 78,
    modified: "Today",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Noe Valley Residence",
    area: "Primary suite",
    progress: 64,
    modified: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Aoyama Studio",
    area: "Micro apartment",
    progress: 92,
    modified: "May 21",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
];

export function InteriorDesignOS() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState<NavId>("workspace");
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#080909] text-foreground">
      <div className="pointer-events-none absolute inset-0 calm-grid opacity-55" />
      <Sidebar
        activeNav={activeNav}
        open={sidebarOpen}
        onNavigate={setActiveNav}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <TopToolbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
        />

        <main className="min-h-0 flex-1 px-3 pb-3 pt-2 sm:px-5">
          <div
            className={cn(
              "grid h-full min-h-0 gap-4",
              uploaded ? "xl:grid-cols-1" : "xl:grid-cols-[minmax(0,1fr)_320px]"
            )}
          >
            <ScrollArea className="min-h-0 rounded-[1.25rem]">
              <div className="space-y-4 pr-1">
                <WorkspaceHero uploaded={uploaded} setUploaded={setUploaded} />
                <WorkflowPipeline uploaded={uploaded} />
                <RecentProjects />
              </div>
            </ScrollArea>

            {!uploaded && <ActivityPanel uploaded={uploaded} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  activeNav,
  open,
  onNavigate,
}: {
  activeNav: NavId;
  open: boolean;
  onNavigate: (id: NavId) => void;
}) {
  return (
    <motion.aside
      animate={{ width: open ? 224 : 72 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 hidden h-screen shrink-0 border-r border-white/[0.07] bg-[#080909]/92 p-3 backdrop-blur-xl md:block"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-11 items-center gap-3 px-1">
          <div className="grid size-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
            <Layers3 className="size-4 text-cyan-200" />
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="min-w-0"
              >
                <p className="truncate text-sm font-medium">Atelier</p>
                <p className="truncate text-xs text-white/42">Spatial workspace</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator className="my-4 bg-white/[0.07]" />

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeNav;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "group flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm text-white/52 transition-colors hover:bg-white/[0.055] hover:text-white/86",
                      active && "bg-white/[0.075] text-white"
                    )}
                    aria-label={item.label}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        active && "text-cyan-200"
                      )}
                    />
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </TooltipTrigger>
                {!open && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
          <div className="flex items-center gap-2">
            <CircleDot className="size-3 fill-cyan-200 text-cyan-200" />
            {open && (
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white/82">
                  AI engine ready
                </p>
                <p className="truncate text-[11px] text-white/38">Spatial v2.8</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function TopToolbar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="px-3 pt-3 sm:px-5">
      <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#121313]/88 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-xl text-white/48 hover:bg-white/[0.06] hover:text-white md:inline-flex"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}</TooltipContent>
        </Tooltip>

        <div className="min-w-0">
          <p className="text-xs text-white/42">Project</p>
          <h1 className="truncate text-sm font-medium sm:text-base">Hudson Loft</h1>
        </div>

        <div className="ml-auto hidden h-9 min-w-[280px] items-center gap-2 rounded-xl border border-white/[0.07] bg-black/18 px-3 text-white/44 lg:flex">
          <Search className="size-4" />
          <Input
            className="h-8 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-white/34 focus-visible:ring-0"
            placeholder="Search projects, rooms, materials"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-white/48 hover:bg-white/[0.06] hover:text-white"
          aria-label="Notifications"
        >
          <Bell />
        </Button>
        <Avatar className="size-8 border border-white/10">
          <AvatarFallback className="bg-white/[0.07] text-xs text-white">
            MS
          </AvatarFallback>
        </Avatar>
        <Button className="rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">
          <Sparkles className="size-4" />
          Generate
        </Button>
      </div>
    </header>
  );
}

function WorkspaceHero({
  uploaded,
  setUploaded,
}: {
  uploaded: boolean;
  setUploaded: (value: boolean) => void;
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/[0.08] bg-[#111212]/90 p-3 shadow-2xl shadow-black/24 sm:p-4">
      <AnimatePresence mode="wait" initial={false}>
        {!uploaded ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="grid min-h-[520px] gap-4 lg:grid-cols-[minmax(0,1fr)_300px]"
          >
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0b0c0c]">
              <div className="absolute inset-0 spatial-grid opacity-70" />
              <div className="absolute inset-x-12 top-0 h-40 bg-cyan-200/[0.045] blur-3xl" />
              <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center px-6 py-12 text-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-8 grid size-20 place-items-center rounded-[1.25rem] border border-cyan-100/15 bg-white/[0.045]"
                >
                  <Upload className="size-8 text-cyan-100" />
                </motion.div>

                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/70">
                  Primary action
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Upload Floor Plan
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/52">
                  Drop a plan, sketch, or room photo. Atelier will read the
                  spatial structure before generating layout options.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-11 rounded-xl bg-cyan-100 px-5 text-black hover:bg-cyan-50"
                    onClick={() => setUploaded(true)}
                  >
                    <FileUp className="size-4" />
                    Upload Floor Plan
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-xl border-white/[0.09] bg-white/[0.025] text-white/76 hover:bg-white/[0.06] hover:text-white"
                    onClick={() => setUploaded(true)}
                  >
                    View sample analysis
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-white/42">
                  {["PDF", "DWG", "PNG", "JPG", "Sketch"].map((format) => (
                    <span
                      key={format}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                <div className="scan-beam pointer-events-none absolute left-10 right-10 top-16 h-20 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/10 to-cyan-100/0" />
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.025] p-5">
              <p className="text-sm font-medium">What happens next</p>
              <div className="mt-5 space-y-4">
                {[
                  ["Analyze", "Walls, openings, room boundaries"],
                  ["Generate", "Layout options with clear circulation"],
                  ["Refine", "Style, budget, materials, lighting"],
                  ["Export", "Render pack and specification notes"],
                ].map(([title, detail], index) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-cyan-100/18 bg-cyan-100/[0.06] text-[11px] text-cyan-100">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm text-white/86">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-white/42">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <AnalyzedWorkspace key="analysis" onReset={() => setUploaded(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function AnalyzedWorkspace({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24 }}
      className="grid min-h-[560px] gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]"
    >
      <aside className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.025] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Detected rooms</p>
            <p className="mt-1 text-xs text-white/40">Floor structure</p>
          </div>
          <Badge className="rounded-full bg-cyan-100/12 text-cyan-100 hover:bg-cyan-100/12">
            4 zones
          </Badge>
        </div>
        <div className="mt-5 space-y-2">
          {detectedRooms.map((room, index) => (
            <button
              key={room.name}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition-colors hover:bg-white/[0.045]",
                index === 0 && "border-cyan-100/18 bg-cyan-100/[0.045]"
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[0.045] text-white/60">
                <Layers3 className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{room.name}</span>
                <span className="block text-xs text-white/40">{room.size}</span>
              </span>
              <span className="font-mono text-[11px] text-white/42">
                {room.confidence}%
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="relative min-h-[480px] overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#090a0a]">
        <div className="absolute inset-0 spatial-grid opacity-70" />
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#111212]/80 px-3 py-2 backdrop-blur-xl">
          <div>
            <p className="text-xs text-white/40">Floor plan canvas</p>
            <p className="text-sm font-medium">Hudson Loft / Level 01</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-cyan-100/12 text-cyan-100 hover:bg-cyan-100/12">
              Analyzing
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-white/52 hover:bg-white/[0.055] hover:text-white"
              onClick={onReset}
            >
              Replace
            </Button>
          </div>
        </div>

        <div className="relative flex h-full min-h-[540px] items-center justify-center p-8 pt-20">
          <FloorPlanCanvas />
        </div>
      </div>

      <aside className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.025] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">AI analysis</p>
            <p className="mt-1 text-xs text-white/40">Spatial intelligence</p>
          </div>
          <Sparkles className="size-4 text-cyan-100" />
        </div>

        <div className="mt-5 space-y-4">
          {analysisMetrics.map((metric) => (
            <div key={metric.label}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-white/46">{metric.label}</span>
                <span className="font-mono text-white/58">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-1.5 bg-white/[0.07]" />
            </div>
          ))}
        </div>

        <Separator className="my-5 bg-white/[0.07]" />

        <div className="space-y-3">
          {[
            "Primary daylight from west elevation.",
            "Main circulation clear at 920 mm.",
            "Living and dining zones can merge.",
            "Two layout directions recommended.",
          ].map((note) => (
            <div key={note} className="flex gap-2 text-sm leading-5 text-white/58">
              <Check className="mt-0.5 size-4 shrink-0 text-cyan-100" />
              <span>{note}</span>
            </div>
          ))}
        </div>

        <Button className="mt-6 w-full rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">
          Generate layouts
          <ChevronRight className="size-4" />
        </Button>
      </aside>
    </motion.div>
  );
}

function FloorPlanCanvas() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-3xl rounded-2xl border border-white/12 bg-white/[0.025] p-8 shadow-2xl shadow-black/30">
      <div className="absolute inset-8 rounded-xl border border-white/34" />
      <div className="absolute left-[13%] top-[18%] h-[47%] w-[42%] rounded-lg border border-cyan-100/42 bg-cyan-100/[0.035]" />
      <div className="absolute right-[17%] top-[18%] h-[31%] w-[23%] rounded-lg border border-white/28 bg-white/[0.025]" />
      <div className="absolute bottom-[16%] left-[13%] h-[22%] w-[70%] rounded-lg border border-white/28 bg-white/[0.018]" />
      <div className="absolute left-[55%] top-[47%] h-px w-[18%] bg-white/42" />
      <div className="absolute left-[30%] bottom-[38%] h-px w-[18%] bg-white/42" />
      <div className="absolute left-[25%] top-[31%] size-2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(165,243,252,0.32)]" />
      <div className="absolute right-[27%] bottom-[27%] size-2 rounded-full bg-cyan-100/80" />
      <div className="scan-beam absolute inset-x-10 top-10 h-16 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/12 to-cyan-100/0" />
      <div className="absolute bottom-5 left-5 rounded-full border border-white/[0.07] bg-black/24 px-3 py-1 text-xs text-white/48">
        walls / windows / zones detected
      </div>
    </div>
  );
}

function WorkflowPipeline({ uploaded }: { uploaded: boolean }) {
  const activeIndex = uploaded ? 2 : 0;

  return (
    <section className="rounded-[1.25rem] border border-white/[0.08] bg-[#111212]/86 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Generation pipeline</p>
          <p className="mt-1 text-xs text-white/40">
            Upload → Analyze → Generate → Refine → Export
          </p>
        </div>
        <Badge className="rounded-full bg-white/[0.055] text-white/56 hover:bg-white/[0.055]">
          {uploaded ? "Analysis running" : "Waiting for upload"}
        </Badge>
      </div>

      <div className="grid gap-2 md:grid-cols-6">
        {workflowSteps.map((step, index) => {
          const complete = index < activeIndex;
          const active = index === activeIndex;

          return (
            <div
              key={step}
              className={cn(
                "rounded-xl border border-white/[0.06] bg-white/[0.025] p-3",
                active && "border-cyan-100/24 bg-cyan-100/[0.045]"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full border text-[11px]",
                    complete && "border-cyan-100 bg-cyan-100 text-black",
                    active && "border-cyan-100/28 text-cyan-100",
                    !complete && !active && "border-white/[0.1] text-white/36"
                  )}
                >
                  {complete ? <Check className="size-3.5" /> : index + 1}
                </span>
                {active && (
                  <motion.span
                    className="size-1.5 rounded-full bg-cyan-100"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
              </div>
              <p className="text-sm font-medium">{step}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RecentProjects() {
  return (
    <section className="rounded-[1.25rem] border border-white/[0.08] bg-[#111212]/86 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Recent projects</p>
          <p className="mt-1 text-xs text-white/40">Continue where the work left off.</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl text-white/50 hover:bg-white/[0.055] hover:text-white"
        >
          View all
        </Button>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {recentProjects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -2 }}
            className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
          >
            <div className="relative h-32">
              <Image
                src={project.image}
                alt={`${project.title} interior project thumbnail`}
                fill
                sizes="(min-width: 1024px) 24vw, 100vw"
                className="object-cover opacity-82 grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{project.title}</p>
                  <p className="mt-1 text-xs text-white/40">{project.area}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-white/38">
                  {project.modified}
                </span>
              </div>
              <Progress value={project.progress} className="mt-4 h-1.5 bg-white/[0.07]" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel({ uploaded }: { uploaded: boolean }) {
  return (
    <aside className="hidden min-h-0 rounded-[1.25rem] border border-white/[0.08] bg-[#111212]/86 p-4 shadow-2xl shadow-black/20 xl:block">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">AI activity</p>
          <p className="mt-1 text-xs text-white/40">Context for the current step.</p>
        </div>
        <div className="grid size-8 place-items-center rounded-xl border border-cyan-100/16 bg-cyan-100/[0.055]">
          <Sparkles className="size-4 text-cyan-100" />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/16 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-white/34">
          Current task
        </p>
        <p className="mt-2 text-lg font-medium tracking-tight">
          {uploaded ? "Analyze floor structure" : "Upload floor plan"}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/48">
          {uploaded
            ? "Atelier is extracting walls, openings, room boundaries, and circulation zones before layout generation."
            : "Start with a plan. The workspace will stay quiet until there is spatial information to work with."}
        </p>
      </div>

      <Separator className="my-5 bg-white/[0.07]" />

      <div className="space-y-3">
        {(uploaded
          ? [
              "Floor plan uploaded.",
              "Wall graph extraction in progress.",
              "Four candidate rooms detected.",
              "Layout generation will unlock next.",
            ]
          : activity
        ).map((item, index) => (
          <div key={item} className="flex gap-3">
            <span
              className={cn(
                "mt-1 size-1.5 shrink-0 rounded-full",
                index === 0 ? "bg-cyan-100" : "bg-white/22"
              )}
            />
            <p className="text-sm leading-5 text-white/52">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
        <p className="text-sm font-medium">Export readiness</p>
        <div className="mt-4 space-y-3">
          {[
            ["Layouts", uploaded],
            ["Style pass", false],
            ["Render pack", false],
          ].map(([label, ready]) => (
            <div key={String(label)} className="flex items-center justify-between">
              <span className="text-sm text-white/52">{label}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px]",
                  ready
                    ? "bg-cyan-100/12 text-cyan-100"
                    : "bg-white/[0.045] text-white/34"
                )}
              >
                {ready ? "ready" : "locked"}
              </span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-4 w-full rounded-xl border-white/[0.09] bg-transparent text-white/56 hover:bg-white/[0.055] hover:text-white"
        >
          <Download className="size-4" />
          Export
        </Button>
      </div>
    </aside>
  );
}
