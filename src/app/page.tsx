import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Atelier OS | AI Interior Architecture Workflow Platform",
  description:
    "An AI-assisted interior architecture workflow platform for floor plan analysis, client discovery, layout intelligence, moodboards, renders, and execution documentation.",
};

export default function HomePage() {
  return <LandingPage />;
}
