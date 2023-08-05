import {REACT_APP_API_URL} from "@env";

const API_URL = REACT_APP_API_URL;

export const getBooks = async () => {
  const res = await fetch(`${API_URL}/book`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching books");
  }
  const books = await res.json();
  return books;
};

export const getBook = async (id: string) => {
  const res = await fetch(`${API_URL}/book/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching book");
  }
  const book = await res.json();
  return book;
};

export const createBook = async (book: any) => {
  const res = await fetch(`${API_URL}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    throw new Error("Error creating book");
  }
  const newBook = await res.json();
  return newBook;
};

export const deleteBook = async (id: string) => {
  const res = await fetch(`${API_URL}/book/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error deleting book");
  }
  return await res.json();
};

const getRecipesInBook = async (id: string) => {
  const res = await fetch(`${API_URL}/book/${id}/recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching recipes in book");
  }
  return await res.json();
};
