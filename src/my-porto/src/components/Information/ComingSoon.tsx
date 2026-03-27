import React from "react";
export default function ComingSoon() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="bg-white px-12 py-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#3a3a6c]">
          Coming Soon 🚧
        </h1>
        <p className="text-lg text-[#5a5a8c]">
          This feature is under development. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}
