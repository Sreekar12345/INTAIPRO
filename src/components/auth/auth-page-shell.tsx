"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-svh overflow-y-auto overflow-x-hidden bg-[#070808] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 calm-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_34%),linear-gradient(140deg,rgba(148,163,184,0.1),transparent_38%),linear-gradient(to_bottom,#070808_0%,#101111_48%,#070808_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-48px)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <BrandMark />
          <p className="mt-16 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/60">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl text-balance text-6xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/54">
            {description}
          </p>
          <div className="mt-10 grid max-w-lg gap-3">
            {[
              "Project intake workspace",
              "AI workflow preview",
              "Design dashboard UI",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white/62 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8 flex justify-center lg:hidden">
            <BrandMark />
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#111212]/82 p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            {children}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export function AuthPageSkeleton() {
  return (
    <main className="grid h-svh place-items-center overflow-y-auto bg-[#070808] px-4 text-white">
      <div className="w-full max-w-md rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-6">
        <div className="h-4 w-28 rounded-full bg-white/[0.08]" />
        <div className="mt-5 h-8 w-3/4 rounded-full bg-white/[0.08]" />
        <div className="mt-8 h-12 rounded-xl bg-white/[0.06]" />
        <div className="mt-4 h-12 rounded-xl bg-white/[0.06]" />
        <div className="mt-5 h-12 rounded-xl bg-white/[0.1]" />
      </div>
    </main>
  );
}

function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-xl">
        <Compass className="size-5 text-cyan-100" />
      </span>
      <span>
        <span className="block text-sm font-semibold tracking-tight">Atelier OS</span>
        <span className="block text-[11px] text-white/42">Interior intelligence</span>
      </span>
    </Link>
  );
}
