import React from "react";
import ToolsCard from "./card";
import { FaGithub, FaGitAlt, FaDocker, FaFigma } from "react-icons/fa";
import {
  SiPostman,
  SiCanva,
  SiAmazonwebservices,
  SiStartpage,
} from "react-icons/si";

const ToolsSection = () => {
  const developmentTools = [
    { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Visual Studio Code", icon: <SiStartpage /> },
  ];

  const designTools = [
    { name: "Figma", icon: <FaFigma /> },
    { name: "Canva", icon: <SiCanva /> },
  ];

  const testingTools = [
    { name: "VPS", icon: <SiStartpage /> },
    { name: "AWS", icon: <SiAmazonwebservices /> },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-6 py-10">
      <ToolsCard
        title="Development Tools"
        color="gray"
        tools={developmentTools}
      />
      <ToolsCard title="Design Tools" color="gray" tools={designTools} />
      <ToolsCard
        title="Testing & Deployment"
        color="gray"
        tools={testingTools}
      />
    </section>
  );
};

export default ToolsSection;
