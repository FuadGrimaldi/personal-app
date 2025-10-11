"use client";
import React, { useState } from "react";
import ToolsSection from "./ToolsSection";
import HardSkillSection from "./hardSkillSection";
import softSkillData from "./softSkillSection";
import { motion } from "framer-motion";

const SkillCard = () => {
  const [activeTab, setActiveTab] = useState<
    "technical" | "softSkill" | "tools"
  >("technical");

  return (
    <section>
      {/* Switch Button */}
      <motion.div
        className="relative z-3 flex justify-center mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <button
          onClick={() => setActiveTab("technical")}
          className={`px-4 py-2 rounded-l-full border ${
            activeTab === "technical"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Technical
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 border ${
            activeTab === "tools"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Tools
        </button>
        <button
          onClick={() => setActiveTab("softSkill")}
          className={`px-4 py-2 rounded-r-full border ${
            activeTab === "softSkill"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Soft Skill
        </button>
      </motion.div>

      {/* Content */}
      {activeTab === "technical" ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HardSkillSection />
        </motion.div>
      ) : activeTab === "softSkill" ? (
        <motion.div
          className="grid md:grid-cols-4 grid-cols gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {softSkillData.map((skill) => (
            <div
              key={skill.id}
              className="border border-gray-200 rounded-lg shadow-md p-6 bg-white text-center"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700">
                {skill.title}
              </h3>
              <p className="text-sm text-gray-700 mt-2">{skill.description}</p>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ToolsSection />
        </motion.div>
      )}
    </section>
  );
};

export default SkillCard;
