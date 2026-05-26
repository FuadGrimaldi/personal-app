"use server";

import axios from "axios";

export interface MailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const API = process.env.BACKEND_URL;

export async function sendMail(data: MailData) {
  try {
    const response = await axios.post(`${API}/api/v2/mail`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
}

export async function getMails(page = 1, limit = 10) {
  try {
    const response = await axios.get(`${API}/api/v2/mail`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mails:", error);
    throw error;
  }
}
