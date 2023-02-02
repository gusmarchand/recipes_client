const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/gusappprecipes/image";

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
