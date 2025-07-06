"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
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
      className="animate_top mx-auto text-center"
    >
      <div className="mb-1 inline-block rounded-full px-4.5 py-1.5 border bg-[#131D4F]">
        <span className=" font-base text-[#EFE4D2]">{title}</span>
      </div>
      <h2 className="mx-auto mb-4 lg:text-5xl text-3xl font-bold text-[#131D4F] md:w-4/5 xl:w-1/2">
        {subtitle}
      </h2>
      <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%] text-[#131D4F] lg:text-xl text-lg mb-6">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
