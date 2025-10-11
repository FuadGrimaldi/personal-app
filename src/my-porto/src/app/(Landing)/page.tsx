import Landingpage from "@/components/Hero/landingpage";
import Contact from "@/components/Contact";
import Project from "@/components/Project";
import BlogComp from "@/components/Blog/Index";

export default function Home() {
  return (
    <main>
      <Landingpage />
      <BlogComp />
      <Project />
      <Contact />
    </main>
  );
}
