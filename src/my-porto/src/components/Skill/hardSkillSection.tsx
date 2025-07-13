import React from "react";
import ToolsCard from "./card";
import {
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiLaravel,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiFlask,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiAmazonwebservices,
} from "react-icons/si";

const HardSkillSection = () => {
  const frontendDev = [
    { name: "Next Js", icon: <SiNextdotjs /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "React", icon: <SiReact /> },
    { name: "Javascript", icon: <SiJavascript /> },
  ];

  const backendDev = [
    { name: "PHP", icon: <SiPhp /> },
    { name: "Python", icon: <SiPython /> },
    { name: "Express Js", icon: <SiExpress /> },
    { name: "Node Js", icon: <SiNodedotjs /> },
    { name: "Laravel API", icon: <SiLaravel /> },
    { name: "Flask", icon: <SiFlask /> },
  ];

  const DatabaseCloud = [
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Postgress", icon: <SiPostgresql /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "AWS", icon: <SiAmazonwebservices /> },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-6 py-10">
      <ToolsCard
        title="Frontend Development"
        color="gray"
        tools={frontendDev}
      />
      <ToolsCard title="Backend Development" color="gray" tools={backendDev} />
      <ToolsCard title="Database & Cloud" color="gray" tools={DatabaseCloud} />
    </section>
  );
};

export default HardSkillSection;
