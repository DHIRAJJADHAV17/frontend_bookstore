import { UserData } from "@/pages/Login";
import { UserFormData } from "@/pages/Signup";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateuser = async (userFormData: UserFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });
    if (!response.ok) {
      throw new Error("failed to get user");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const useGetUser = async (userFormData: UserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to create User");
    }

    const data = await response.json(); // Read JSON response

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("isadmin", data.user.role);
      localStorage.setItem("email", data.user.email);
    } else {
      console.error("Access token not found in response");
    }

    return data; // Return the data object
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
