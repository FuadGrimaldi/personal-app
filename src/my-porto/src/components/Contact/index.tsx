"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { sendMail } from "@/services/apiMail";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Contact = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill all required fields");
      return;
    }
    if (!agreed) {
      alert("Please agree to the terms first");
      return;
    }

    try {
      setLoading(true);

      await sendMail({
        name,
        email,
        phone,
        subject,
        message,
      });

      Swal.fire({
        title: "Success",
        text: "Message sent successfully!",
        icon: "success",
      });

      setName("");
      setEmail("");
      setSubject("");
      setPhone("");
      setMessage("");

      router.push("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to send message. Please try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="text-white text-lg font-medium">Sending Message...</p>
          </div>
        </div>
      )}

      <section id="support" className="px-4 lg:px-[120px]">
        <div className="relative mx-auto px-4 py-10 lg:px-15 lg:py-15 xl:px-20 xl:py-20 z-3">
          <div className="absolute -z-1 h-2/3 w-full rounded-lg mt-[130px] lg:mt-[110px]"></div>

          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="/assets/shape/shape-dotted-light.svg"
              alt="Dotted"
              fill
            />
          </div>

          <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between xl:gap-20">
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
              className="w-full rounded-lg bg-white p-5 md:p-[50px] shadow-solid-8 lg:w-3/4 border border-[#254D70]"
            >
              <h2 className="mb-10 lg:mb-[80px] lg:text-5xl text-3xl font-bold text-black">
                Send a message
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none lg:w-1/2 text-black"
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none lg:w-1/2 text-black"
                  />
                </div>

                <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none lg:w-1/2 text-black"
                  />

                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none lg:w-1/2 text-black"
                  />
                </div>

                <div className="mb-5">
                  <textarea
                    placeholder="Message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus-visible:outline-none text-black"
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between z-3">
                  <div className="mb-4 flex md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded bg-white text-blue-600 peer-checked:bg-primary peer-checked:border-primary mt-1"
                    />

                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5 text-md text-black"
                    >
                      By clicking Checkbox, you agree to use our “Form” terms
                      And consent cookie usage in browser.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-black/80 focus:outline-none focus:ring-4 focus:ring-black/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </motion.div>

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
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-2/5 lg:w-[26%] py-5 md:py-[50px]"
            >
              <h2 className="lg:mb-10 mb-1 lg:text-5xl text-3xl font-bold text-black">
                Find Me
              </h2>

              <div className="lg:mb-7 mb-2">
                <h3 className="mb-2 text-lg font-medium text-black">
                  Location
                </h3>
                <p className="text-gray-700">Bandung, Jawa Barat, Indonesia</p>
              </div>

              <div className="lg:mb-7 mb-2">
                <h3 className="mb-2 text-lg font-medium text-black">
                  Email Address
                </h3>
                <p className="text-gray-700">faudgrimaldi123@gmail.com</p>
              </div>

              <div className="lg:mb-7 mb-2">
                <h3 className="mb-2 text-lg font-medium text-black">
                  Phone Number
                </h3>
                <p className="text-gray-700">+878-0175-8245</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
