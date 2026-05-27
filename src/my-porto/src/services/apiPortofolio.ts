"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API = process.env.BACKEND_URL;

export async function getPortofolio(
  page: string,
  limit: string,
  filter: { type: string; featured: string },
) {
  try {
    const response = await axios.get(`${API}/api/v2/portofolio`, {
      params: {
        page,
        limit,
        type: filter.type,
        featured: filter.featured,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching portofolio:", error);
    throw error;
  }
}

export async function getPortofolioById(id: string) {
  try {
    const response = await axios.get(`${API}/api/v2/portofolio/${id}`);
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
      console.warn("Portofolio not found:", id);
      return null; // Return null jika 404
    }
    console.error("Error fetching portofolio:", error);
    throw error; // selain 404 tetap lempar error
  }
}

export async function updatePortofolio(id: string, data: unknown) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await axios.put(`${API}/api/v2/portofolio/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating portofolio:", error);
    throw error;
  }
}

export async function deletePortofolio(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await axios.delete(`${API}/api/v2/portofolio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting portofolio:", error);
    throw error;
  }
}

export async function createPortofolio(data: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.post(`${API}/api/v2/portofolio`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Error creating portofolio:", error);
    throw error;
  }
}
