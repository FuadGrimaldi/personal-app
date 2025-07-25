import React from "react";
export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-700">
      <div className="bg-white px-12 py-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#3a3a6c]">
          Coming Soon 🚧
        </h1>
        <p className="text-lg text-[#5a5a8c]">
          Fitur ini sedang dalam pengembangan.
          <br />
          Nantikan update terbaru dari Sayah!
        </p>
      </div>
    </div>
  );
}
