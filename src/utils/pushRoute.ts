import { CategoryNameSlug, FilterNameSlug } from "@/common/enums";

export async function defineRouteToPush(categoryName: CategoryNameSlug, filterName: FilterNameSlug) {
	if (filterName === FilterNameSlug.NONE) {
		return `/projects/${categoryName}`;
	}

	if (filterName === FilterNameSlug.EMPTY) {
		return `/projects/${categoryName}/transition`;
	} else {
		return `/projects/${categoryName}/filter/${filterName}`;
	}
}
