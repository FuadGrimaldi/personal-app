"use client";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Landingpage from "@/components/Hero/landingpage";
import Contact from "@/components/Contact";
import Education from "@/components/Education";

export default function Home() {
  return (
    <main>
      <Landingpage />
      <About />
      <FunFact />
      <Education />
      <Contact />
    </main>
  );
}
