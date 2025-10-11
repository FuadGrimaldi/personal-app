import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Education from "@/components/Education";
import Skill from "@/components/Skill";

export default function ProfilePage() {
  return (
    <main className="pb-6 lg:pt-[30px] pt-[40px]">
      <About />
      <FunFact />
      <Education />
      <Skill />
    </main>
  );
}
