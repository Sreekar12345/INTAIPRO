"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    router.replace(`/login?registered=1&email=${encodeURIComponent(normalizedEmail)}`);
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/62">
          Create account
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Create Your Atelier Account
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/46">
          Start a secure workspace for projects, analysis, renders, and outputs.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-medium text-white/54">Name</span>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/34" />
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
              placeholder="Mira Studio"
              className="h-12 rounded-xl border-white/[0.1] bg-black/24 pl-10 text-white placeholder:text-white/28"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium text-white/54">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/34" />
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              autoComplete="email"
              placeholder="studio@atelier.com"
              className="h-12 rounded-xl border-white/[0.1] bg-black/24 pl-10 text-white placeholder:text-white/28"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium text-white/54">Password</span>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/34" />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="h-12 rounded-xl border-white/[0.1] bg-black/24 pl-10 text-white placeholder:text-white/28"
            />
          </div>
        </label>

        {error && (
          <div className="rounded-xl border border-red-300/20 bg-red-400/[0.08] px-3 py-2 text-sm text-red-100/86">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-white text-black hover:bg-cyan-50"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/46">
        Already have an account?{" "}
        <Link href="/login" className="text-cyan-100/84 transition-colors hover:text-cyan-50">
          Sign in
        </Link>
      </p>
    </>
  );
}
