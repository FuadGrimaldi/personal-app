"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API = process.env.BACKEND_URL;

export async function getUser() {
  try {
    const response = await axios.get(`${API}/api/v2/users`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const response = await axios.get(`${API}/api/v2/users/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response?.status ===
        "number" &&
      (error as { response: { status: number } }).response.status === 404
    ) {
      console.warn("user not found:", id);
      return null; // Return null jika 404
    }
    console.error("Error fetching user:", error);
    throw error; // selain 404 tetap lempar error
  }
}

export async function updateUsers(id: string, data: unknown) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await axios.put(`${API}/api/v2/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating users:", error);
    throw error;
  }
}
