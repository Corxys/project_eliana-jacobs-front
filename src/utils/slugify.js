import slugify from "slugify";

const slugifyString = (title) => {
  if (!title) {
    return;
  }
  
  const replacedTitle = title
    .replace("_", "-")
    .replace("&", "")
    .replace(".", "")
    .replace("(", "")
    .replace(")", "")
    .replace("!", "")
    .replace("?", "")
    .replace(",", "")
    .replace(", ", "");
  
  return (slugify(replacedTitle, {
    lower: true
  }));
};

export {slugifyString};