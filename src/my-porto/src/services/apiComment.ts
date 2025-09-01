"use server";
import axios from "axios";

const API = process.env.BACKEND_URL;

export async function getComments(page = 1, limit = 10) {
  try {
    const response = await axios.get(`${API}/api/v2/comment`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export async function createComment(data: {
  fullname: string;
  message: string;
  id_porto: string | number;
}) {
  try {
    const response = await axios.post(`${API}/api/v2/comment`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function getAllCommentsByPortofolioId(
  portofolioId: string,
  page = 1,
  limit = 2
) {
  try {
    const response = await axios.get(
      `${API}/api/v2/comment/portofolio/${portofolioId}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments by portofolio ID:", error);
    throw error;
  }
}
