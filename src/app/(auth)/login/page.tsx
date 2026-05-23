import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#080909] text-white">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1fr]">
        <section>
          <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
            <Layers3 className="size-5 text-cyan-100" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/58">
            Atelier OS
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Interior intelligence for serious design work.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
            Sign in to manage projects, floor plans, AI analysis, renders,
            documentation, and client approvals from one focused workspace.
          </p>
        </section>
        <section className="rounded-[1.5rem] border border-white/[0.08] bg-[#111212]/88 p-6 shadow-2xl shadow-black/20">
          <p className="text-lg font-medium">Sign in</p>
          <div className="mt-6 space-y-3">
            <Input className="h-11 rounded-xl border-white/[0.08] bg-black/20" placeholder="Email" />
            <Input className="h-11 rounded-xl border-white/[0.08] bg-black/20" placeholder="Password" type="password" />
          </div>
          <Button asChild className="mt-5 w-full rounded-xl bg-cyan-100 text-black hover:bg-cyan-50">
            <Link href="/projects">
              Continue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
