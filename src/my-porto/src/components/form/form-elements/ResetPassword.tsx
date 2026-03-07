"use client";
import React, { useState } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { resetPassword } from "@/services/apiUser";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface ResetPassword {
  id: number;
  password: string;
  confirmPassword: string;
}

export default function DefaultInputResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState<ResetPassword>({
    id: 0,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(password).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    await resetPassword(formData);

    router.push("/dashboard/profile");
  };

  return (
    <ComponentCard title="Reset Password">
      <form onSubmit={handlerSubmit} className="space-y-6">
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue={password.password || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            defaultValue={password.confirmPassword || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </ComponentCard>
  );
}
