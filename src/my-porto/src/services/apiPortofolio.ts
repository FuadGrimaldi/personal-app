"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API = process.env.BACKEND_URL;

interface PortofolioData {
  title: string;
  description: string;
  projectImage?: File;
  category?: string;
  id_user?: number;
}

export async function getPortofolio() {
  try {
    const response = await axios.get(`${API}/api/v2/portofolio`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching portofolio:", error);
    throw error;
  }
}

export async function getPortofolioById(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await axios.get(`${API}/api/v2/portofolio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching portofolio:", error);
    throw error;
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

export async function createPortofolio(data: PortofolioData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Decode token untuk dapatkan id_user
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  if (payload?.id) {
    data.id_user = payload.id;
  } else {
    throw new Error("Invalid token payload");
  }

  try {
    const formData = new FormData();
    for (const key in data) {
      // Untuk file, cek tipe
      if (key === "projectImage" && data.projectImage instanceof File) {
        formData.append(key, data.projectImage);
      } else if (data[key as keyof PortofolioData] !== undefined) {
        formData.append(key, String(data[key as keyof PortofolioData]));
      }
    }

    const response = await axios.post(`${API}/api/v2/portofolio`, formData, {
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
