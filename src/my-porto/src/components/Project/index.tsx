"use client";

import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import parse from "html-react-parser";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getPortofolio } from "@/services/apiPortofolio";

interface Portfolio {
  id: number;
  title: string;
  featured: string;
  type: string;
  projectImage: string;
  description: string;
}
const Project = () => {
  const [data, setData] = useState<Portfolio[]>([]);
  const limit = 6;
  const page = 1;

  useEffect(() => {
    // console.log("Mounted Project component"); // Tambahkan ini
    async function fetchData() {
      const res = await getPortofolio(page.toString(), limit.toString());
      const newData =
        res?.data?.item.filter((item: Portfolio) => item.featured === "Y") ||
        [];
      setData(newData || []);
    }
    fetchData();
  }, []); // hanya sekali saat mount

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    return words.length <= maxWords
      ? text
      : words.slice(0, maxWords).join(" ") + "...";
  };

  if (data.length === 0) {
    return (
      <section
        id="project"
        className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "------",
              color: "text-[#131D4F]",
              colorTitle: "text-[#131D4F]",
              subtitle: "Portofolio",
              description:
                "Technical Projects that I have and continue to develop.",
            }}
          />
          <motion.div
            className="flex flex-col lg:flex-row gap-8 mt-8 mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white h-[200px] rounded-lg max-w-lg w-full mx-auto">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="bg-white h-[200px] rounded-lg max-w-lg w-full mx-auto">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="bg-white h-[200px] rounded-lg max-w-lg w-full mx-auto">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="project"
      className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
    >
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "------",
            color: "text-[#131D4F]",
            colorTitle: "text-[#131D4F]",
            subtitle: "Portofolio",
            description:
              "Technical Projects that I have and continue to develop.",
          }}
        />

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mT-8 mb-4"
        >
          {data.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="bg-[#EFE4D2] rounded-lg shadow-xl overflow-hidden max-w-lg w-full mx-auto border border-[#254D70]">
                <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                  <Image
                    fill
                    src={
                      project.projectImage || "/uploads/portofolio/default.jpg"
                    }
                    className="object-cover"
                    alt={project.title}
                    sizes="(max-width: 640px) 100vw, 50px"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded">
                    {project.type || "Project"}
                  </div>
                </div>

                <div className="p-6">
                  <Link
                    href={`/project/${project.id}`}
                    className="text-2xl font-bold text-[#954C2E] "
                  >
                    {project.title}
                  </Link>
                  <div className="text-gray-700 leading-tight my-4">
                    {parse(limitWords(project.description, 20))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative mx-auto w-42">
          <Link
            href={`/project`}
            className="bg-[#EFE4D2] text-center border border-blue-500 rounded-lg px-3 py-1.5 text-[#131D4F] text-sm hover:bg-gray-100 hover:shadow transition-colors duration-200"
          >
            Lihat Semua Project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Project;
