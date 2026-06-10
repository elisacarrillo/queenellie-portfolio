import type { Viewport } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f0407a",
  colorScheme: "light",
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

     
      
    </>
  );
}
