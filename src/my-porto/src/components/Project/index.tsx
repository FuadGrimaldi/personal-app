"use client";

import React, { useEffect, useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import parse from "html-react-parser";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface Portfolio {
  id: number;
  title: string;
  projectImage: string;
  description: string;
}

const Project = () => {
  const [data, setData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!apiUrl) {
          console.error("❌ NEXT_PUBLIC_BACKEND_URL is not defined");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/v2/portofolio`);
        setData(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching portofolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    return words.length <= maxWords
      ? text
      : words.slice(0, maxWords).join(" ") + "...";
  };

  if (loading) {
    return (
      <section className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px] text-center">
        <p className="text-gray-500 animate-pulse">Loading portfolio...</p>
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
          className="my-8"
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
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#954C2E] mb-2">
                    {project.title}
                  </h2>
                  <div className="text-gray-700 leading-tight mb-4">
                    {parse(limitWords(project.description, 20))}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/project/${project.id}`}
                      className="flex items-center border border-blue-500 rounded-lg px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 hover:shadow transition-colors duration-200"
                    >
                      Klik This
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Project;
