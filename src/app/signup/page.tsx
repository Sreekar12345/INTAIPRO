import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPageShell, AuthPageSkeleton } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account | Atelier OS",
  description: "Create your Atelier OS account.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageShell
        eyebrow="Begin the workflow"
        title="Create a secure workspace before the first floor plan."
        description="Set up access for projects, uploads, analysis, renders, and design documentation."
      >
        <SignupForm />
      </AuthPageShell>
    </Suspense>
  );
}

