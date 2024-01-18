import slugify from "slugify";

export function slugifyString<T>(stringToSlug: string): T {
	if (!stringToSlug) {
		return "" as T;
	}

	const forbiddenCharacters = ['"', "&", ".", "(", ")", "!", "?", ",", ", "];

	const slugedString = stringToSlug
		.replace("_", "-")
		.split("")
		.filter((character) => !forbiddenCharacters.includes(character))
		.join("");

	return slugify(slugedString, {
		lower: true,
	}) as T;
}
