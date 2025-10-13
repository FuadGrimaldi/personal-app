"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { login } from "@/services/api";
import { Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await login(data.email, data.password);

      if (!result.success) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: result.message || "Login Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "An error occurred during login",
        showConfirmButton: false,
        timer: 1500,
      });
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

            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 lg:text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 lg:text-base">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    placeholder="Masukkan password"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-sm bg-[#10375C] hover:text-[#F3C623] transition-all duration-500 py-3 px-5 font-medium lg:text-xl text-lg text-white"
              >
                Masuk
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signin;
