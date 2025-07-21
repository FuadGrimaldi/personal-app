"use client";
import axios from "axios";
import BASE_URL from "../config/config";
import { hasCookie } from "cookies-next";

const api = axios.create({
  baseURL: `${BASE_URL}`,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Initialize auth token on app start if it exists
const initializeAuth = () => {
  const token = hasCookie("Authorization") ? getCookie("Authorization") : null;
  if (token) {
    setAuthToken(token);
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/v1/auth/", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Export the api instance and initialize auth
export { api, initializeAuth };
