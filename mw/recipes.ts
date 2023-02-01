const API_URL = "http://192.168.86.247:3001";

export const getRecipes = async () => {
  const res = await fetch(`${API_URL}/recipe`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching recipes");
  }
  const recipes = await res.json();
  return recipes;
};

export const getRecipe = async (id: string) => {
  const res = await fetch(`${API_URL}/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching recipe");
  }
  const recipe = await res.json();
  return recipe;
};

export const createRecipe = async (recipe: any) => {
  const res = await fetch(`${API_URL}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) {
    throw new Error("Error creating recipe");
  }
  const newRecipe = await res.json();
  return newRecipe;
};

export const deleteRecipe = async (id: string) => {
  const res = await fetch(`${API_URL}/recipe/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error deleting recipe");
  }
  const deletedRecipe = await res.json();
  return deletedRecipe;
};
