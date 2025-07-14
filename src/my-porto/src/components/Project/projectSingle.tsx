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
    <div className="bg-[#EFE4D2] rounded-lg shadow-lg overflow-hidden max-w-lg w-full mx-auto">
      <Image
        width={300}
        height={200}
        src={imageUrl}
        alt="Project"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
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
