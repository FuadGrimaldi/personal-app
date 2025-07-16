import React from "react";
import SectionHeader from "../Common/SectionHeader";
import ProjectCard from "./projectSingle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const projects = [
  {
    id: 1,
    title: "FIKA Bangsa",
    author: "Fuad Grimaldi",
    desc: "FIKA BANGSA (Film Karya Anak Bangsa) is a web-based, subscription-driven movie streaming platform developed as a final group project for Web Programming and Human-Computer Interaction courses. Designed to support local independent filmmakers in Indonesia, the platform addresses film distribution challenges by providing accessible, user-friendly features for both members and administrators.",
    imageUrl: "/assets/porto/Portofolio.png",
  },
  {
    id: 2,
    title: "inCube – Smart IoT Monitoring",
    author: "Fuad Grimaldi",
    desc: "inCube is a smart IoT egg incubator platform that enables real-time monitoring and control of temperature and humidity through a web dashboard. Users can switch between manual and automatic modes, receive live alerts, and view incubation data visually to ensure optimal hatching conditions. The project received funding from both the PKM Pengabdian Masyarakat and PKM Kewirausahaan programs, supporting its development.",
    imageUrl: "/assets/porto/Portofolio (1).png",
  },
  {
    id: 3,
    title: "Kawan Bayar",
    author: "Fuad Grimaldi",
    desc: "Kawan Bayar is a web-based payment application that offers an all-in-one solution for managing daily financial transactions such as bank transfers, Kawan-Wallet top-ups, peer-to-peer transfers between Kawan-Wallet users, and various bill payments. Built with Next.js for the frontend and Laravel for the backend, the platform uses MySQL as its primary database and integrates Midtrans for secure and reliable payment processing.",
    imageUrl: "/assets/porto/Portofolio (2).png",
  },
  {
    id: 4,
    title: "inCube – Mobile Version",
    author: "Fuad Grimaldi",
    desc: "inCube Mobile is the mobile version of the inCube smart egg incubator platform, built with FlutterFlow and fully integrated with IoT devices through RESTful APIs. It leverages Firebase for real-time data synchronization, user authentication, and cloud functions, enabling seamless interaction between the mobile app and hardware components.",
    imageUrl: "/assets/porto/Portofolio (3).png",
  },
];

const Project = () => {
  return (
    <>
      {/* ===== Project Section Start ===== */}
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
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  title={project.title}
                  author={project.author}
                  imageUrl={project.imageUrl}
                  desc={project.desc}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* ===== Project Section End ===== */}
    </>
  );
};

export default Project;
