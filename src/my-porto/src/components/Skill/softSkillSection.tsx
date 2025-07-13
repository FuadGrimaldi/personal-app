type SoftSkill = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

const softSkillData: SoftSkill[] = [
  {
    id: 1,
    icon: "🗣️",
    title: "Communication",
    description:
      "Ability to convey ideas clearly and listen actively in both written and verbal formats.",
  },
  {
    id: 2,
    icon: "⏱️",
    title: "Time Management",
    description:
      "Effectively prioritize tasks and manage deadlines to ensure timely completion of work.",
  },
  {
    id: 3,
    icon: "🧠",
    title: "Problem Solving",
    description:
      "Ability to analyze situations, identify issues, and develop effective solutions.",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Team Collaboration",
    description:
      "Work cooperatively with others across disciplines to achieve shared goals.",
  },
];

export default softSkillData;
