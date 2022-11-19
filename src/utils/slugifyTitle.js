import slugify from "slugify";

const slugifyTitle = (title) => {
  const modifiedTitle = title.replace("_", "-").replace("&", "").replace(".", "");
  return (slugify(modifiedTitle, {
    lower: true
  }));
};

export {slugifyTitle};
