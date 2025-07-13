type About = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

const aboutData: About[] = [
  {
    id: 1,
    icon: "/assets/icon/icon-1.svg",
    title: "Bio",
    description:
      "Hi! I'm Fuad, an Informatics student who is enthusiastic about technology and loves exploring various projects. I believe that learning is a lifelong process, and I am always eager to try new things, collaborate, and create meaningful solutions.",
  },
  {
    id: 2,
    icon: "/assets/icon/icon-2.svg",
    title: "Hobby",
    description: "code, read comics, sleep and repeat.",
  },
  {
    id: 3,
    icon: "/assets/icon/mdi--contacts.svg",
    title: "Contact",
    description:
      "I live in Sumedang, West Java, and can be contacted by telephone number 087801758245 or email fuadgrimaldi123@gmail.com.",
  },
  {
    id: 4,
    icon: "/assets/icon/mdi--education-outline.svg",
    title: "Summery Education",
    description:
      "Currently studying at the Bandung National Institute of Technology, Faculty of Industrial Technology – Informatics (2022 – present).   Temporary GPA: 3.84",
  },
];

export default aboutData;
