import React from "react";
import aboutData from "./aboutData";
import SectionHeader from "../Common/SectionHeader";
import Image from "next/image";
import { motion } from "framer-motion";
import SingleAbout from "./SingleAbout";

const About = () => {
  return (
    <>
      {/* ===== About Section Start ===== */}
      <section
        id="About"
        className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
      >
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* Section Title */}
          <SectionHeader
            headerInfo={{
              title: "------",
              colorTitle: "text-[#131D4F]",
              color: "text-[#131D4F]",
              subtitle: "About Me",
              description:
                "Discover my journey as a Software Enthusiast. With a passion for technology and a commitment to excellence.",
            }}
          />

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Image */}
            <motion.div
              className="w-full lg:w-[30%] bg-[#254D70] rounded-xl shadow-lg flex justify-center items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full aspect-square relative">
                <Image
                  src="/assets/profile.png"
                  alt="Profile Illustration"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Cards & Social */}
            <motion.div
              className="w-full lg:w-[70%] flex flex-col gap-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aboutData.map((feature, key) => (
                  <SingleAbout feature={feature} key={key} />
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start gap-6">
                <div className="text-base text-[#254D70]">follow me on :</div>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <div className="w-8 h-8 relative hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/assets/icon/mdi--instagram.svg"
                      alt="Instagram Icon"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="32px"
                    />
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <div className="w-8 h-8 relative hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/assets/icon/mdi--linkedin.svg"
                      alt="Linkedin Icon"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="32px"
                    />
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <div className="w-8 h-8 relative hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/assets/icon/mdi--github.svg"
                      alt="Github Icon"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="32px"
                    />
                  </div>
                </a>
                {/* Facebook */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <div className="w-8 h-8 relative hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/assets/icon/facebook.svg"
                      alt="Facebook Icon"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="32px"
                    />
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ===== About Section End ===== */}
    </>
  );
};

export default About;
