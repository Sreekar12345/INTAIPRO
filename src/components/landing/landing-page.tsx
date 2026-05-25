"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Compass,
  FileArchive,
  FileText,
  Home,
  Layers3,
  Maximize2,
  MessageSquareText,
  PenTool,
  Ruler,
  ScanLine,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareStack,
  SunMedium,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const workflow = [
  {
    title: "Upload Floor Plan",
    detail: "Import PDFs, CAD exports, sketches, or room scans into a measured workspace.",
    icon: FileArchive,
  },
  {
    title: "AI Spatial Analysis",
    detail: "Detect rooms, walls, openings, circulation, daylight, and plumbing zones.",
    icon: ScanLine,
  },
  {
    title: "Lifestyle Discovery",
    detail: "Capture household routines, storage behavior, style signals, and budget logic.",
    icon: MessageSquareText,
  },
  {
    title: "Layout Intelligence",
    detail: "Generate zoning, furniture plans, spacing validation, and ergonomic warnings.",
    icon: Ruler,
  },
  {
    title: "Moodboard Creation",
    detail: "Translate the brief into palettes, textures, lighting references, and material sets.",
    icon: Layers3,
  },
  {
    title: "AI Render Generation",
    detail: "Produce renders from validated layouts, selected materials, and lighting intent.",
    icon: Sparkles,
  },
  {
    title: "Execution Documentation",
    detail: "Export BOQ, drawings, dimensions, client decks, and contractor-ready packages.",
    icon: ClipboardCheck,
  },
];

const discovery = [
  "Household composition",
  "Daily routines",
  "Cooking and hosting habits",
  "Storage behavior",
  "Style dislikes",
  "Room-wise budget priorities",
];

const audiences = [
  {
    title: "Homeowners",
    detail: "Turn a raw plan into a guided design brief, understandable layout choices, and client-ready visual direction.",
    icon: Home,
  },
  {
    title: "Interior Designers",
    detail: "Compress intake, spatial analysis, moodboards, renders, and documentation into one professional workflow.",
    icon: PenTool,
  },
  {
    title: "Architecture Studios",
    detail: "Add interior intelligence to early planning, feasibility studies, presentations, and execution handoff.",
    icon: Building2,
  },
  {
    title: "Real Estate Teams",
    detail: "Show buyers and investors how a floor plate can become a livable, furnished, market-ready interior.",
    icon: Users,
  },
];

const caseStudy = [
  "Floor plan imported",
  "AI detected 7 zones",
  "Lifestyle profile completed",
  "Three layout branches compared",
  "Material palette approved",
  "Final render package exported",
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <main className="h-svh overflow-y-auto bg-[#070808] text-white">
      <HeroSection />
      <WorkflowSection />
      <WhySection />
      <AnalysisDemoSection />
      <DiscoverySection />
      <LayoutIntelligenceSection />
      <RenderStudioSection />
      <DocumentationSection />
      <AudienceSection />
      <CaseStudySection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}

function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-[88svh] overflow-hidden border-b border-white/[0.08]">
      <Image
        src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=2400&q=86"
        alt="Premium interior architecture studio workspace"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45 grayscale"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(to_bottom,rgba(7,8,8,0.3),#070808_92%)]" />
      <LandingNav />
      <div className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/24 px-3 py-1.5 text-xs text-white/62 backdrop-blur-xl">
            <CircleDot className="size-2.5 fill-cyan-100 text-cyan-100" />
            AI-assisted interior architecture workflow platform
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
            The Operating System For Modern Interior Design
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/66 sm:text-lg">
            Transform floor plans into intelligent, execution-ready interior concepts through spatial analysis,
            client discovery, layout intelligence, material systems, AI renders, and documentation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => router.push("/signup")}
              className="h-11 rounded-xl bg-white px-5 text-black hover:bg-cyan-50"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-white/[0.16] bg-white/[0.04] px-5 text-white/78 hover:bg-white/[0.08] hover:text-white"
            >
              <Link href="#workflow">Explore Workflow</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <HeroWorkspacePreview />
        </motion.div>
      </div>
    </section>
  );
}

function LandingNav() {
  const router = useRouter();

  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-xl">
            <Compass className="size-4 text-cyan-100" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight">Atelier OS</span>
            <span className="block text-[11px] text-white/42">Interior intelligence</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/52 md:flex">
          <a href="#workflow" className="transition-colors hover:text-white">Workflow</a>
          <a href="#analysis" className="transition-colors hover:text-white">Analysis</a>
          <a href="#discovery" className="transition-colors hover:text-white">Discovery</a>
          <a href="#exports" className="transition-colors hover:text-white">Outputs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/login")}
            className="hidden rounded-xl text-white/62 hover:bg-white/[0.06] hover:text-white sm:inline-flex"
          >
            Sign In
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/signup")}
            className="rounded-xl bg-white text-black hover:bg-cyan-50"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroWorkspacePreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-white/[0.12] bg-[#101111]/86 shadow-2xl shadow-black/45 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/22" />
          <span className="size-2.5 rounded-full bg-white/14" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/18 px-3 py-1 text-xs text-white/42">
          <Search className="size-3.5" />
          Hudson Loft spatial model
        </div>
      </div>
      <div className="grid min-h-[420px] lg:grid-cols-[230px_minmax(0,1fr)_280px]">
        <div className="hidden border-r border-white/[0.07] p-4 lg:block">
          {["Upload", "Analysis", "Discovery", "Layouts", "Renders", "Exports"].map((item, index) => (
            <div
              key={item}
              className={cn(
                "mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                index === 1 ? "bg-cyan-100/[0.08] text-cyan-50" : "text-white/46"
              )}
            >
              <span className="grid size-5 place-items-center rounded-full border border-white/[0.12] text-[10px]">
                {index + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
        <FloorPlanVisual className="min-h-[420px]" />
        <div className="hidden border-l border-white/[0.07] p-4 xl:block">
          <p className="text-sm font-medium">AI analysis</p>
          <div className="mt-4 space-y-3">
            <Metric label="Room confidence" value="94%" />
            <Metric label="Circulation score" value="81%" />
            <Metric label="Storage opportunity" value="+18%" />
          </div>
          <div className="mt-5 rounded-2xl border border-cyan-100/16 bg-cyan-100/[0.045] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/64">Reasoning</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Entry storage can absorb the dead zone while keeping the living path clear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowSection() {
  return (
    <Section id="workflow" eyebrow="Product workflow" title="A professional path from plan to execution">
      <div className="relative mt-12">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-white/[0.08] md:block" />
        <div className="grid gap-3">
          {workflow.map((step, index) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.035 }}
              className="group grid gap-4 rounded-[1.35rem] border border-white/[0.07] bg-white/[0.028] p-4 transition-colors hover:border-cyan-100/18 hover:bg-white/[0.045] md:grid-cols-[64px_1fr_280px]"
            >
              <div className="relative z-10 grid size-12 place-items-center rounded-2xl border border-white/[0.1] bg-[#111212]">
                <step.icon className="size-5 text-cyan-100/78" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/34">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">{step.detail}</p>
              </div>
              <WorkflowMiniPreview index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WorkflowMiniPreview({ index }: { index: number }) {
  return (
    <div className="hidden min-h-28 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/22 md:block">
      <div className="spatial-grid relative h-full">
        <div className="absolute inset-4 rounded-xl border border-white/14" />
        <div
          className="absolute rounded-lg border border-cyan-100/30 bg-cyan-100/[0.055]"
          style={{
            left: `${16 + (index % 3) * 8}%`,
            top: `${20 + (index % 2) * 14}%`,
            width: `${28 + (index % 4) * 4}%`,
            height: `${28 + (index % 3) * 6}%`,
          }}
        />
        <div className="scan-beam absolute inset-x-6 top-2 h-10 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/10 to-cyan-100/0" />
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <Section eyebrow="Why this exists" title="Interior AI should understand space before it imagines style">
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <ComparisonPanel
          title="Traditional AI interior tools"
          tone="muted"
          items={[
            "Pretty renders without space planning",
            "No household or lifestyle understanding",
            "Weak circulation and storage logic",
            "Little connection to execution",
          ]}
        />
        <ComparisonPanel
          title="Atelier OS"
          tone="active"
          items={[
            "Understands architectural constraints",
            "Builds a mandatory client discovery profile",
            "Optimizes layout, zoning, lighting, and materials",
            "Produces documentation teams can execute",
          ]}
        />
      </div>
    </Section>
  );
}

function AnalysisDemoSection() {
  return (
    <Section
      id="analysis"
      eyebrow="Interactive AI analysis"
      title="Spatial intelligence you can inspect, not just admire"
      description="The system reads a floor plan as a living constraint model: rooms, dimensions, circulation, daylight, storage opportunities, and technical warnings become editable layers."
    >
      <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101111]">
          <FloorPlanVisual className="min-h-[640px]" detailed />
        </div>
        <div className="space-y-3">
          <AnalysisCard icon={ScanLine} title="Room Detection" value="7 zones detected" detail="Kitchen, living, dining, primary suite, study, entry, utility." />
          <AnalysisCard icon={SunMedium} title="Sunlight Simulation" value="West glare risk" detail="Recommend low-reflectance fabrics and indirect evening lighting." />
          <AnalysisCard icon={SquareStack} title="Storage Opportunity" value="+18% capacity" detail="Entry and corridor dead zones can become concealed joinery." />
          <AnalysisCard icon={Compass} title="Circulation" value="2 conflicts found" detail="Dining chair clearance overlaps the current balcony path." />
        </div>
      </div>
    </Section>
  );
}

function DiscoverySection() {
  return (
    <Section
      id="discovery"
      eyebrow="Client discovery system"
      title="The AI learns the client before generating the concept"
      description="Generation stays locked until the design brief is complete, mirroring how elite interior designers qualify lifestyle, constraints, taste, and budget before proposing work."
    >
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.028] p-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Design Intelligence Profile</p>
              <p className="mt-1 text-xs text-white/38">Required before AI generation</p>
            </div>
            <span className="rounded-full bg-cyan-100/12 px-3 py-1 text-xs text-cyan-100">86% complete</span>
          </div>
          <div className="space-y-2">
            {discovery.map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/18 p-3">
                <span className="text-sm text-white/64">{item}</span>
                {index < 5 ? <Check className="size-4 text-cyan-100" /> : <CircleDot className="size-4 text-white/28" />}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/[0.08] bg-[#101111] p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-100/64">Adaptive question</p>
          <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight">
            When you host guests, which spaces should stay private?
          </h3>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Primary bedroom", "Kitchen prep zone", "Study", "Utility and storage"].map((choice, index) => (
              <button
                key={choice}
                type="button"
                className={cn(
                  "rounded-2xl border p-4 text-left text-sm transition-colors hover:bg-white/[0.055]",
                  index === 2 ? "border-cyan-100/28 bg-cyan-100/[0.06]" : "border-white/[0.07] bg-white/[0.025]"
                )}
              >
                <ShieldCheck className={cn("mb-8 size-4", index === 2 ? "text-cyan-100" : "text-white/38")} />
                {choice}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-100/14 bg-cyan-100/[0.045] p-4 text-sm leading-6 text-white/62">
            AI recommendation: preserve the study as a quiet zone and route guest circulation through living and dining.
          </div>
        </div>
      </div>
    </Section>
  );
}

function LayoutIntelligenceSection() {
  return (
    <Section eyebrow="Layout intelligence" title="Plan furniture, zoning, and movement with architectural discipline">
      <div className="mt-12 grid gap-4 xl:grid-cols-[330px_minmax(0,1fr)_330px]">
        <ToolPanel title="Furniture Library" items={["Modular sofa", "Dining 6-seater", "Study desk", "Storage wall", "Console unit"]} />
        <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101111]">
          <FloorPlanVisual className="min-h-[560px]" layout />
        </div>
        <ToolPanel title="Validation" items={["Clearance: 920 mm", "Dining pull-out: valid", "Entry path: improved", "TV distance: 2.8 m", "Storage depth: 600 mm"]} />
      </div>
    </Section>
  );
}

function RenderStudioSection() {
  return (
    <Section eyebrow="AI render studio" title="Renders arrive after the plan, brief, and materials are aligned">
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[560px] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101111]">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=84"
            alt="AI render studio interior preview"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover opacity-78 grayscale-[12%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/[0.1] bg-black/42 p-4 backdrop-blur-xl">
            <p className="text-sm font-medium">Warm minimal living concept</p>
            <p className="mt-1 text-xs leading-5 text-white/48">Generated from validated layout, smoked oak, travertine, linen wall finish, and west daylight control.</p>
          </div>
        </div>
        <div className="space-y-4">
          <RenderControl title="Camera angle" value="35 mm corner perspective" icon={Maximize2} />
          <RenderControl title="Lighting" value="Soft afternoon, low glare" icon={SunMedium} />
          <RenderControl title="Style intensity" value="62% restrained minimalism" icon={SlidersHorizontal} />
          <RenderControl title="Material fidelity" value="Approved palette only" icon={Box} />
          <div className="grid gap-3 sm:grid-cols-2">
            {["Concept A", "Concept B", "Concept C", "Lighting pass"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="text-sm font-medium">{item}</p>
                <p className="mt-6 text-xs text-white/38">Versioned render branch</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function DocumentationSection() {
  return (
    <Section
      id="exports"
      eyebrow="Execution and documentation"
      title="Move from beautiful concept to contractor-ready information"
      description="The platform treats delivery as part of design: quantities, drawings, presentations, and approval records stay connected to the spatial model."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["BOQ", "Room-wise quantities, finishes, furniture, and fixture schedules."],
          ["Technical drawings", "Plan annotations, dimensions, lighting, and joinery notes."],
          ["Client presentation", "Polished concept decks with rationale and approved versions."],
          ["Export package", "PDFs, renders, material boards, and execution documents."],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.028] p-5">
            <FileText className="mb-10 size-5 text-cyan-100/78" />
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/48">{detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AudienceSection() {
  return (
    <Section eyebrow="Who this is for" title="Built for the people who turn space into decisions">
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {audiences.map((audience) => (
          <div key={audience.title} className="group rounded-[1.5rem] border border-white/[0.08] bg-white/[0.028] p-5 transition-colors hover:border-cyan-100/18 hover:bg-white/[0.045]">
            <audience.icon className="mb-12 size-5 text-cyan-100/78" />
            <h3 className="text-2xl font-semibold tracking-tight">{audience.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/48">{audience.detail}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/54">
              View workflow <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CaseStudySection() {
  return (
    <Section eyebrow="Sample project" title="A complete project walkthrough, from raw plan to execution package">
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.028] p-5">
          <p className="text-sm font-medium">Hudson Loft renovation</p>
          <p className="mt-2 text-sm leading-6 text-white/48">1,420 sq ft residence, remote-working couple, frequent hosting, concealed storage priority.</p>
          <div className="mt-8 space-y-3">
            {caseStudy.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-full border border-cyan-100/20 bg-cyan-100/[0.055] text-xs text-cyan-100">
                  {index + 1}
                </span>
                <span className="text-sm text-white/62">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101111]">
          <div className="grid min-h-[520px] md:grid-cols-2">
            <FloorPlanVisual className="min-h-[260px]" layout />
            <div className="relative min-h-[260px]">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=84"
                alt="Final interior design render"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover opacity-82 grayscale-[12%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCtaSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] px-5 py-24 sm:px-8 lg:px-10">
      <div className="absolute inset-0 calm-grid opacity-60" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/64">Start with the plan</p>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Design smarter from concept to execution.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/54 sm:text-base">
          Build a project around spatial understanding, client discovery, layout intelligence, render generation, and documentation.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={() => router.push("/signup")}
            className="h-11 rounded-xl bg-white px-5 text-black hover:bg-cyan-50"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-xl border-white/[0.14] bg-white/[0.035] px-5 text-white/72 hover:bg-white/[0.07] hover:text-white"
          >
            <Link href="#workflow">Explore Workflow</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2 text-white/72">
          <Compass className="size-4 text-cyan-100/76" />
          Atelier OS
        </Link>
        <div className="flex flex-wrap gap-4">
          <a href="#workflow" className="transition-colors hover:text-white">Workflow</a>
          <a href="#analysis" className="transition-colors hover:text-white">Analysis</a>
          <a href="#discovery" className="transition-colors hover:text-white">Discovery</a>
          <a href="#exports" className="transition-colors hover:text-white">Outputs</a>
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-white/[0.08] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/64">{eyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          {description && <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52 sm:text-base">{description}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FloorPlanVisual({
  className,
  detailed,
  layout,
}: {
  className?: string;
  detailed?: boolean;
  layout?: boolean;
}) {
  return (
    <div className={cn("spatial-grid relative overflow-hidden bg-[#090a0a]", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(165,243,252,0.08),transparent_36%)]" />
      <div className="absolute left-[10%] right-[10%] top-[15%] bottom-[14%] rounded-2xl border border-white/28 bg-white/[0.018]" />
      <div className="absolute left-[15%] top-[21%] h-[36%] w-[37%] rounded-xl border border-cyan-100/34 bg-cyan-100/[0.045]" />
      <div className="absolute right-[16%] top-[21%] h-[24%] w-[25%] rounded-xl border border-white/24 bg-white/[0.025]" />
      <div className="absolute bottom-[20%] left-[15%] h-[22%] w-[68%] rounded-xl border border-white/24 bg-white/[0.018]" />
      <div className="absolute left-[52%] top-[44%] h-px w-[18%] bg-white/42" />
      <div className="absolute left-[32%] bottom-[42%] h-px w-[16%] bg-white/42" />
      <div className="absolute left-[22%] top-[35%] size-2 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(165,243,252,0.42)]" />
      <div className="absolute right-[24%] bottom-[30%] size-2 rounded-full bg-cyan-100/80" />
      <div className="scan-beam absolute inset-x-12 top-12 h-16 rounded-full bg-gradient-to-b from-cyan-100/0 via-cyan-100/12 to-cyan-100/0" />
      {detailed && (
        <>
          <OverlayLabel className="left-[18%] top-[18%]" title="Living" value="324 sq ft" />
          <OverlayLabel className="right-[14%] top-[18%]" title="Kitchen" value="Plumbing locked" />
          <OverlayLabel className="bottom-[18%] left-[38%]" title="Circulation" value="2 conflicts" />
          <div className="absolute bottom-[29%] left-[18%] right-[18%] h-16 rounded-full bg-cyan-100/[0.07] blur-xl" />
        </>
      )}
      {layout && (
        <>
          <div className="absolute left-[22%] top-[33%] h-[14%] w-[23%] rounded-xl border border-cyan-100/32 bg-cyan-100/[0.08]" />
          <div className="absolute left-[47%] top-[35%] h-[10%] w-[14%] rounded-full border border-white/24 bg-white/[0.045]" />
          <div className="absolute left-[31%] bottom-[27%] h-[7%] w-[27%] rounded-lg border border-white/24 bg-white/[0.04]" />
          <div className="absolute right-[23%] bottom-[25%] h-[11%] w-[14%] rounded-lg border border-cyan-100/22 bg-cyan-100/[0.04]" />
        </>
      )}
    </div>
  );
}

function OverlayLabel({ className, title, value }: { className: string; title: string; value: string }) {
  return (
    <div className={cn("absolute rounded-xl border border-white/[0.1] bg-black/42 px-3 py-2 backdrop-blur-xl", className)}>
      <p className="text-xs font-medium">{title}</p>
      <p className="mt-0.5 text-[11px] text-white/42">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/48">{label}</span>
        <span className="font-mono text-xs text-white/70">{value}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div className="h-full w-4/5 rounded-full bg-cyan-100/70" />
      </div>
    </div>
  );
}

function ComparisonPanel({ title, items, tone }: { title: string; items: string[]; tone: "muted" | "active" }) {
  return (
    <div className={cn("rounded-[1.5rem] border p-5", tone === "active" ? "border-cyan-100/18 bg-cyan-100/[0.045]" : "border-white/[0.07] bg-white/[0.025]")}>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/58">
            {tone === "active" ? <Check className="mt-1 size-4 shrink-0 text-cyan-100" /> : <CircleDot className="mt-1 size-4 shrink-0 text-white/26" />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisCard({ icon: Icon, title, value, detail }: { icon: LucideIcon; title: string; value: string; detail: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.028] p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-black/20">
          <Icon className="size-4 text-cyan-100/78" />
        </span>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
          <p className="mt-2 text-sm leading-6 text-white/44">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ToolPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.028] p-4">
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div key={item} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/18 p-3">
            <span className="text-sm text-white/58">{item}</span>
            <span className="font-mono text-[11px] text-white/30">{String(index + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderControl({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.028] p-4">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-cyan-100/78" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-sm text-white/44">{value}</p>
        </div>
      </div>
    </div>
  );
}
