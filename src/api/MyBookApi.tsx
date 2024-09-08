import { SearchState } from "@/pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCreatebook = async (bookFormData: FormData) => {
  const accToken = localStorage.getItem("accessToken");
  const logFormData = (bookFormData: FormData) => {
    for (let [key, value] of bookFormData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };
  logFormData(bookFormData);
  try {
    if (!accToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/book`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
      body: bookFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create book");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating book:", error);

    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/book`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/book/view/${id}`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useUpdatebook = async (id: string, bookFormData: FormData) => {
  const accToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/book/view/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
      body: bookFormData,
    });

    if (!response) {
      throw new Error("Failed to update book");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useSearchBooks = async (
  searchState: SearchState,
  title?: string
) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());

  // Conditionally add minPrice, maxPrice, and rating

  params.set("minPrice", searchState.minPrice.toString());

  params.set("maxPrice", searchState.maxPrice.toString());
  params.set("sortOption", searchState.sortOption);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/my/book/search/${title}?${params.toString()}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fetch Error:", errorText);
      throw new Error("Failed to get books");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAdminBooks = async () => {
  const accToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/book/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useAdminSearchBook = async (
  searchState: SearchState,
  title?: string
) => {
  const accToken = localStorage.getItem("accessToken");
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());

  // Conditionally add minPrice, maxPrice, and rating

  params.set("minPrice", searchState.minPrice.toString());

  params.set("maxPrice", searchState.maxPrice.toString());
  params.set("sortOption", searchState.sortOption);
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/my/book/admin/search/${title}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fetch Error:", errorText);
      throw new Error("Failed to get books");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
