import React from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

interface ProjectCardProps {
  title: string;
  desc: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, desc, imageUrl }) => {
  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };
  return (
    <div className="bg-[#EFE4D2] rounded-lg shadow-xl overflow-hidden max-w-lg w-full mx-auto box-shadow: -31px -16px 46px 0px rgba(255,80,80, 0.07), 36px 24px 90px 7px rgba(89,34,203, 0.18) border border-[#254D70]">
      <Image
        width={400}
        height={200}
        src={imageUrl}
        alt="Project"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#954C2E] mb-2">{title}</h2>
        <div className="text-gray-700 leading-tight mb-4">
          {parse(limitWords(desc, 20))}
        </div>
        <div className="flex justify-between items-center">
          <Link
            href="#"
            className="flex items-center border border-blue-500 rounded-lg px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 hover:shadow  transition-colors duration-200"
          >
            Klik This
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
