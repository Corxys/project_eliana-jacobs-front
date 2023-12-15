import slugify from "slugify";

export function slugifyString<T>(stringToSlug: string): T {
	if (!stringToSlug) {
		return "" as T;
	}

	const slugedString = stringToSlug
		.replace("_", "-")
		.replace("&", "")
		.replace(".", "")
		.replace("(", "")
		.replace(")", "")
		.replace("!", "")
		.replace("?", "")
		.replace(",", "")
		.replace(", ", "");

	return slugify(slugedString, {
		lower: true,
	}) as T;
}
