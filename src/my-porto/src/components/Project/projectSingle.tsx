import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  author: string;
  desc: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  desc,
  imageUrl,
}) => {
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
        <p className="text-gray-700 leading-tight mb-4">
          {limitWords(desc, 20)}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              width={32}
              height={32}
              src="/assets/user/user-01.png"
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-gray-800 font-semibold">{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
