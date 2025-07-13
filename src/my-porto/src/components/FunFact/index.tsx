"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FunFact = () => {
  return (
    <>
      {/* <!-- ===== Funfact Start ===== --> */}
      <section
        id="Funfact"
        className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]"
      >
        <div className="relative z-1 max-w-c-1315 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#254D70] py-[60px] mx-6 lg:mx-0">
          <Image
            width={335}
            height={384}
            src="/assets/shape/shape-06.png"
            alt="Man"
            className="absolute -left-15 -top-25 -z-1 lg:left-0 hidden md:block"
          />
          <Image
            width={132}
            height={132}
            src="/assets/shape/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1"
          />

          <Image
            fill
            src="/assets/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1"
          />

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-6 px-4 text-center md:w-4/5 md:px-0 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-[40px] font-bold text-[#EFE4D2] lg:text-5xl text-3xl">
              Funfact About <span className="text-[#954C2E]">Me</span>
            </h2>
            <p className="mb-[50px] mx-auto lg:w-11/12 lg:text-xl text-base text-[#EFE4D2]">
              I started to be interested in the world of informatics after
              watching the Korean drama Start-Up. Besides, I have a beautiful
              and cute girlfriend who always encourages me.
            </p>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== --> */}
    </>
  );
};

export default FunFact;
