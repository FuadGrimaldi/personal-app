import ListProject from "@/components/Project/ListProject";
import React from "react";

export default function ListProjectPage() {
  return (
    <main>
      <div className="relative">
        <div className=" inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#254d70] via-[#254d70] to-orange-50">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#254d70]/20 via-purple-400/10 to-pink-[#254d70] animate-gradient-x"></div>

            <div className="absolute top-20 left-10 w-72 h-72 bg-[#254d70]/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-[#254d70]/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-40 right-20 w-72 h-72 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
          </div>
        </div>

        <div className="px-6 lg:px-[120px] pb-6 lg:pt-[30px] pt-[40px]">
          <ListProject />
        </div>
      </div>
    </main>
  );
}
