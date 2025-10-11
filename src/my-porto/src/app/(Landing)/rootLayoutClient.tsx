"use client";
import Navbar from "@/components/Navbar/navbar";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Lines />
      {children}
      <Footer />
    </>
  );
}
