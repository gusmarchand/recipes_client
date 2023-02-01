const OPENLIBRARY_API = "https://covers.openlibrary.org/b/";

export const getBookCoverUrl = (isbn: string, size: string) => {
  return `${OPENLIBRARY_API}isbn/${isbn}-${size}.jpg`;
};
