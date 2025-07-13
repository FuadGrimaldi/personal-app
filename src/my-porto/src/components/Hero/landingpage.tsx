import React from "react";
import { motion } from "framer-motion";

const Landingpage = () => {
  return (
    <motion.div
      className="relative lg:max-w-screen pt-[400px] lg:py-[250px] lg:px-[110px] px-[80px]"
      id="LandingPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 hidden md:block">
        <motion.img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <section className="relative mt-[-300px] lg:mt-0">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:items-center">
            {/* LEFT - TEXT */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <motion.h1
                  className="text-4xl font-bold leading-tight text-[#EFE4D2] sm:text-5xl sm:leading-tight lg:text-7xl lg:leading-tight font-pj"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Fuad <span className="text-[#954C2E]">Grimaldi</span>
                </motion.h1>

                <motion.p
                  className="text-lg lg:text-2xl text-[#EFE4D2] font-pj"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Backend Developer, Cloud, DevOps, and Software Enthusiast
                </motion.p>
                <motion.p
                  className="mt-5 text-sm lg:text-lg text-[#EFE4D2] font-pj"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Hi, im a Informatics student at Institut Teknologi Nasional
                  Bandung with a passion for software and web development. My
                  academic journey has equipped me with a strong foundation in
                  computer science, allowing me to explore and excel in various
                  aspects of technology. Beyond my coursework, I am deeply
                  interested in creating innovative software solutions and
                  developing dynamic web applications. My curiosity and
                  dedication drive me to continuously learn and stay updated
                  with the latest advancements in the tech industry.
                </motion.p>

                <motion.div
                  className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-4 mt-4 text-lg transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj rounded-xl hover:bg-[#EFE4D2] hover:text-black text-[#EFE4D2]"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    Download My Resume
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT - IMAGE */}
            <motion.div
              className="flex justify-center lg:justify-end bg-[#EFE4D2] rounded-xl shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src="assets/profile.png"
                alt="Landing Page Illustration"
                className="w-full max-w-md m-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landingpage;
