import React from "react";
import SectionHeader from "../Common/SectionHeader";
import EducationSection from "./singleEducation";

const Education = () => {
  return (
    <>
      {/* ===== Education Section Start ===== */}
      <section
        id="Education"
        className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* Section Title */}
          <SectionHeader
            headerInfo={{
              title: "------",
              color: "text-[#131D4F]",
              subtitle: "Educational Background",
              description:
                "Discover education journey and continuing to learn and grow in the field of software development.",
            }}
          />
          <EducationSection />
        </div>
      </section>
      {/* ===== Education Section End ===== */}
    </>
  );
};

export default Education;
