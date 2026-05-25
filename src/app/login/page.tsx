import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPageShell, AuthPageSkeleton } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Atelier OS",
  description: "Log in to your Atelier OS dashboard.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageShell
        eyebrow="Secure access"
        title="A private studio for intelligent interior work."
        description="Return to projects, spatial analysis, client discovery, renders, and execution-ready outputs."
      >
        <LoginForm />
      </AuthPageShell>
    </Suspense>
  );
}

