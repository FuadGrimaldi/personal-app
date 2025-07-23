"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API = process.env.BACKEND_URL;

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  try {
    const response = await axios.post(`${API}/register`, data);

    if (!response.data.status) {
      throw new Error("Registration failed");
    }

    const token = response.data.data.token;

    if (!token) {
      throw new Error("No token received from server");
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API}/api/v1/auth/signin/`, {
      email,
      password,
    });

    if (!response.data || !response.data.data || !response.data.data.token) {
      throw new Error("Invalid response from server");
    }

    const token = response.data.data.token;

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5, // 7 days
      sameSite: "strict",
    });

    console.log("Token set successfully");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();

    // Hapus cookie token
    cookieStore.delete("token");

    // Return success response
    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Logout error:", error);
    // Bahkan jika ada error, tetap return success karena cookie sudah dihapus
    return { success: true, message: "Logout completed" };
  }
}
