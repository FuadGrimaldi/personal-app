"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

declare global {
  interface Window {
    particlesJS: {
      load: (tagId: string, path: string, callback?: () => void) => void;
    };
  }
}

const Landingpage = () => {
  useEffect(() => {
    // Cegah duplikasi
    if (document.getElementById("particles-js")) return;

    // Tambahkan elemen container
    const container = document.createElement("div");
    container.id = "particles-js";
    container.className = "fixed top-0 left-0 w-full h-full";
    document.body.prepend(container);

    // Tambahkan script jika belum ada
    const existingScript = document.querySelector(
      "script[src='/particles.js']"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/particles.js";
      script.async = true;
      script.onload = () => {
        if (window.particlesJS) {
          window.particlesJS.load("particles-js", "/particles.json", () => {});
        }
      };
      document.body.appendChild(script);
    } else {
      // Script sudah ada, langsung load config
      if (window.particlesJS) {
        window.particlesJS.load("particles-js", "/particles.json", () => {});
      }
    }

    // Clean-up saat unmount layout
    return () => {
      const el = document.getElementById("particles-js");
      if (el) el.remove();
    };
  }, []);
  return (
    <motion.div
      className="relative lg:max-w-screen lg:pt-[200px] pt-[500px] lg:py-[250px] py-[100px] lg:px-[110px] px-[60px]"
      id="LandingPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className=" inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#254d70] via-[#254d70] to-orange-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#254d70]/20 via-purple-400/10 to-pink-[#254d70] animate-gradient-x"></div>

          {/* <div className="absolute top-20 left-10 w-72 h-72 bg-[#254d70]/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div> */}
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#254d70]/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
        </div>
      </div>
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
              className="text-center lg:text-left px-4"
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
                  Backend Developer, Cloud Engineer, and Software Enthusiast
                </motion.p>
                <motion.p
                  className="mt-5 text-sm lg:text-lg text-[#EFE4D2] font-pj"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Hi, Im an Informatics student at Institut Teknologi Nasional
                  Bandung with a strong interest in software and web
                  development. I enjoy building innovative solutions and
                  continuously learning new technologies to stay ahead in the
                  tech industry.
                </motion.p>

                <div className="flex lg:flex-row flex-col lg:space-x-4">
                  <motion.div
                    className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <a
                      href="https://drive.google.com/file/d/1-fyLej9qtb2tyP6RuLGC86zvHfJrFsNu/view?usp=sharing"
                      className="inline-flex items-center px-4 py-4 mt-4 text-base transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj rounded-xl hover:bg-[#EFE4D2] hover:text-black text-[#EFE4D2] border-[#EFE4D2] shadow-lg"
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

                  <motion.div
                    className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <a
                      href="/profile"
                      className="inline-flex items-center px-4 py-4 mt-4 text-base transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj rounded-xl hover:bg-[#EFE4D2] hover:text-black text-[#EFE4D2] border-[#EFE4D2] shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      About Me
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - IMAGE */}
            <motion.div
              className="flex justify-center lg:justify-end bg-[#EFE4D2] rounded-xl shadow-lg hidden lg:block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative mx-auto">
                <Image
                  src="/assets/profile.png"
                  alt="Profile Illustration"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landingpage;
