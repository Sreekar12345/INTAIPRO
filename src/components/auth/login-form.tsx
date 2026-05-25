"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      setNotice("Account created. Sign in to continue.");
    }
  }, [searchParams]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    router.replace("/dashboard");
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/62">
          Secure access
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-sm leading-6 text-white/46">
          Sign in to continue to your Atelier OS dashboard.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              placeholder="Your password"
              className="h-12 rounded-xl border-white/[0.1] bg-black/24 pl-10 text-white placeholder:text-white/28"
            />
          </div>
        </label>

        {error && (
          <div className="rounded-xl border border-red-300/20 bg-red-400/[0.08] px-3 py-2 text-sm text-red-100/86">
            {error}
          </div>
        )}

        {notice && (
          <div className="rounded-xl border border-cyan-100/18 bg-cyan-100/[0.07] px-3 py-2 text-sm text-cyan-50/86">
            {notice}
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
              Sign In
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/46">
        New to Atelier OS?{" "}
        <Link href="/signup" className="text-cyan-100/84 transition-colors hover:text-cyan-50">
          Create an account
        </Link>
      </p>
    </>
  );
}
