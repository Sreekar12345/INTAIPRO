"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LockedGenerateButton } from "@/components/domain/discovery-gate";
import { workspaceRoutes } from "@/lib/product-data";
import { useProjectQuery } from "@/lib/queries";
import { useDesignWorkspaceStore } from "@/stores/design-workspace-store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const activeProjectId = useDesignWorkspaceStore((state) => state.activeProjectId);
  const { data: project } = useProjectQuery(activeProjectId);
  const userEmail = "atelier@studio.com";
  const initials = "AO";

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#080909] text-white">
      <div className="pointer-events-none absolute inset-0 calm-grid opacity-60" />
      <motion.aside
        animate={{ width: open ? 236 : 72 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 hidden h-screen shrink-0 border-r border-white/[0.07] bg-[#080909]/94 p-3 backdrop-blur-xl md:block"
      >
        <div className="flex h-full flex-col">
          <Link href="/projects" className="flex h-11 items-center gap-3 px-1">
            <div className="grid size-9 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.045]">
              <Sparkles className="size-4 text-cyan-100" />
            </div>
            {open && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Atelier OS</p>
                <p className="truncate text-xs text-white/38">Interior intelligence</p>
              </div>
            )}
          </Link>

          <Separator className="my-4 bg-white/[0.07]" />

          <nav className="space-y-1">
            {workspaceRoutes.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/projects" && pathname.startsWith(item.href));

              return (
                <Tooltip key={`${item.href}-${item.label}`}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex h-9 items-center gap-3 rounded-xl px-3 text-sm text-white/50 transition-colors hover:bg-white/[0.055] hover:text-white/86",
                        active && "bg-white/[0.075] text-white shadow-[inset_0_0_0_1px_rgba(165,243,252,0.08)]"
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active && "text-cyan-100")} />
                      {open && <span className="truncate">{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!open && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="px-3 pt-3 sm:px-5">
          <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#121313]/88 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden rounded-xl text-white/48 hover:bg-white/[0.06] hover:text-white md:inline-flex"
                  onClick={() => setOpen((value) => !value)}
                  aria-label="Toggle sidebar"
                >
                  {open ? <PanelLeftClose /> : <PanelLeftOpen />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{open ? "Collapse sidebar" : "Expand sidebar"}</TooltipContent>
            </Tooltip>

            <div className="min-w-0">
              <p className="text-xs text-white/38">Active project</p>
              <h1 className="truncate text-sm font-medium sm:text-base">
                {project?.name ?? "Project workspace"}
              </h1>
            </div>

            <button
              type="button"
              className="ml-auto hidden h-9 min-w-[360px] items-center gap-2 rounded-xl border border-white/[0.08] bg-black/18 px-3 text-left text-sm text-white/38 transition-colors hover:bg-white/[0.045] hover:text-white/58 lg:flex"
            >
              <Search className="size-4" />
              <span className="flex-1">Search rooms, materials, layouts, comments...</span>
              <span className="font-mono text-[11px] text-white/28">Cmd K</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-white/48 hover:bg-white/[0.06] hover:text-white"
              aria-label="Notifications"
            >
              <Bell />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-0 hover:bg-white/[0.06]"
                  aria-label="Account menu"
                >
                  <Avatar className="size-8 border border-white/[0.08]">
                    <AvatarFallback className="bg-white/[0.07] text-xs text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 border border-white/[0.1] bg-[#111212]/96 p-2 text-white shadow-2xl shadow-black/30 backdrop-blur-xl"
              >
                <DropdownMenuLabel className="px-2 py-2">
                  <span className="flex items-center gap-2 text-sm text-white">
                    <UserRound className="size-4 text-cyan-100/78" />
                    Atelier account
                  </span>
                  <span className="mt-1 block truncate text-xs font-normal text-white/42">
                    {userEmail}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.08]" />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    router.push("/");
                  }}
                  className="cursor-pointer rounded-lg px-2 py-2 text-white/66 focus:bg-white/[0.07] focus:text-white"
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <LockedGenerateButton>Generate</LockedGenerateButton>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-hidden px-3 pb-3 pt-3 sm:px-5">
          {children}
        </main>
      </div>
    </div>
  );
}
