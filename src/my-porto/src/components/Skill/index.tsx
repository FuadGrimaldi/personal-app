import React from "react";
import SectionHeader from "../Common/SectionHeader";
import SkillCard from "./singleSkill";
const Skill = () => {
  return (
    <>
      {/* ===== Skill Section Start ===== */}
      <section
        id="Skill"
        className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* Section Title */}
          <SectionHeader
            headerInfo={{
              title: "------",
              color: "text-[#131D4F]",
              colorTitle: "text-[#954C2E]",
              subtitle: "Skills",
              description:
                "Technical skills that I have and continue to develop.",
            }}
          />
          <SkillCard />
        </div>
      </section>
      {/* ===== Skill Section End ===== */}
    </>
  );
};

export default Skill;
