import { REACT_APP_API_URL } from "@env";
const API_URL = REACT_APP_API_URL;
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/gusappprecipes/image";
const GETBRING_API = "https://api.getbring.com/rest/bringrecipes/deeplink";

export const getBookInfo = async (isbn: string) => {
  const res = await fetch(`${GOOGLE_BOOKS_API}?q=isbn:${isbn}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error fetching book info from Google Books");
  }
  const book = await res.json();

  const bookInfo = await fetch(`${GOOGLE_BOOKS_API}/${book?.items[0].id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!bookInfo.ok) {
    throw new Error("Error fetching book info from Google Books");
  }
  const bookInfoData = await bookInfo.json();
  return bookInfoData;
};

export const uploadImgToCloudinary = async (imgUrl: any) => {
  const formData = new FormData();
  formData.append("file", imgUrl);
  formData.append("upload_preset", "qnktrbpo");

  const res = await fetch(`${CLOUDINARY_API}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Error fetching image to Cloudinary");
  }
  const img = await res.json();
  return img;
};

export const uploadJsonToCloudinary = async (json: any) => {
  const formData = new FormData();
  formData.append("file", json);
  formData.append("upload_preset", "qnktrbpo");

  const res = await fetch(`${CLOUDINARY_API}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Error fetching json to Cloudinary");
  }
  const jsonFile = await res.json();
  return jsonFile;
};

export const getBringsLink = async (id: string) => {
  const _body = {
    url: `${API_URL}/recipe/${id}/ingredients`,
    baseQuantity: 4,
    requestedQuantity: 4,
    source: "app",
    // sha1GoogleAdId: "{sha1 hashed Google AdId}",
    // sha1AppleIdfa: "{sha1 hashed Apple IDFA}",
  };

  const res = await fetch(GETBRING_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_body),
  });
  if (!res.ok) {
    throw new Error("Error fetching ingredients link from GetBring");
  }
  const ingredientsToBringLink = await res.json();
  return ingredientsToBringLink?.deeplink;
};
