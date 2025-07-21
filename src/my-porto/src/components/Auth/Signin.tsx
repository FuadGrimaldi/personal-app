"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api, setAuthToken } from "../../../services/api"; // Adjust the path as needed
import { setCookie, hasCookie } from "cookies-next";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (hasCookie("Authorization")) {
      router.push("/user/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/v1/auth/signin", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.data.token;
      if (token) {
        // Set auth token for future requests
        setAuthToken(token);
        setCookie("Authorization", token);
        // setCookie("email", response.data.data.user.email);

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/user/dashboard");
      } else {
        setError("Login failed, token not received");
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Login failed, token not received",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err: unknown) {
      let errorMessage = "Login failed, please try again";

      if (err instanceof AxiosError) {
        const axiosMessage = err.response?.data?.message;
        if (typeof axiosMessage === "string") {
          errorMessage = axiosMessage;
        }
      }
      setError(errorMessage);
      Swal.fire({
        position: "top",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className="flex justify-center items-center min-h-screen px-4"
        id="loginPage"
      >
        <div className="relative px-6 pb-7.5 pt-10 lg:px-10 lg:pt-15 xl:px-20 xl:pt-20 lg:mt-[100px] mt-0 z-3">
          <div className="absolute left-0 top-0 z-0 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] pointer-events-none"></div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white z-[10] px-6 pt-7.5 shadow-solid-8 xl:px-[200px] xl:py-[43px] py-6 xl:pt-15"
          >
            <h2 className="mb-6 text-center lg:text-4xl text-lg font-semibold text-black">
              Login to Your Account
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="mb-2 block text-base text-black lg:text-xl">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="w-full rounded border bg-[#f8f8f8] border-stroke py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input text-base"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-base text-black lg:text-xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="************"
                  className="w-full rounded border border-stroke bg-[#f8f8f8] py-3 px-5 text-black outline-none transition-all focus:border-primary focus:bg-white focus:shadow-input"
                  required
                />
              </div>

              <div className="mb-5">
                <button
                  aria-label="Sign In"
                  className="w-full rounded-sm bg-[#10375C] hover:text-[#F3C623] transition-all duration-500 py-3 px-5 font-medium lg:text-xl text-lg text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login Now"}
                </button>
              </div>
            </form>

            <p className="text-center lg:text-lg text-base font-medium text-black">
              Dont have an account?
              <Link
                href="/register"
                className="ml-2 font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signin;
