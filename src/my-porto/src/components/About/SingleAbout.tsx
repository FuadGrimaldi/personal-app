import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type About = {
  icon: string;
  title: string;
  description: string;
};

const SingleAbout = ({ feature }: { feature: About }) => {
  const { icon, title, description } = feature;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="z-12 rounded-lg bg-[#EFE4D2] shadow-solid-3 transition-all border-strokedark hover:bg-hoverdark p-6 mx-2 mb-4 text-left hover:shadow-xl hover:shadow-[#B6B09F]/40 duration-300"
    >
      {/* Icon dan Title: horizontal */}
      <div className="flex items-center gap-4 mb-3 text-[#254D70]">
        <div className="w-10 h-10 relative text-[#254D70]">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain text-white"
          />
        </div>
        <h3 className="text-xl font-semibold text-[#254D70]">{title}</h3>
      </div>

      {/* Deskripsi: di bawahnya */}
      <p className="text-base text-[#254D70]">{description}</p>
    </motion.div>
  );
};

export default SingleAbout;
