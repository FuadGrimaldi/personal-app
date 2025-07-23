"use client";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Landingpage from "@/components/Hero/landingpage";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Skill from "@/components/Skill";
import Project from "@/components/Project";

export default function Home() {
  return (
    <main>
      <Landingpage />
      <About />
      <FunFact />
      <Education />
      <Skill />
      <Project />
      <Contact />
    </main>
  );
}
