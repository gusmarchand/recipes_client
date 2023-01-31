export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatString = (str: string) => {
  return str.replace(/_/g, " ");
};

export const normalize = (value: string) => {
  const s =
    value
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase() || "";
  return s;
};
