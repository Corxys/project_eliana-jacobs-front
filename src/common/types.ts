import { CategoryNameSlug, FilterNameFull, ThemeName, CategoryNameFull, FilterNameSlug, Layout } from "./enums";

// General
export interface ObjectById<T> {
	[key: string]: T;
}
export interface Link {
	id: number;
	src: string;
	name: string;
}

// Store
export interface State {
	app: {
		colorTheme: ThemeName;
		errorMessage: string;
		focusedImageIndex: number;
		hasImageOnPreview: boolean;
		isLoading: boolean;
		isMenuOpen: boolean;
	};
	categories: ObjectById<Category> | null;
	cv: string;
	filters: ObjectById<Filter> | null;
	news: any;
	practices: any;
	projects: ObjectById<Project> | null;
	selected: {
		article: string;
		category: CategoryNameSlug;
		filter: FilterNameFull;
		project: string;
	};
}
export interface Getters {
	// General
	lightTheme: boolean;
	themeMustBeLight: boolean;
	// Categories/category
	categories: Category[] | null;
	categoriesIncludesTheAllFilter: boolean;
	// Types/type
	types: Filter[];
	filtersByCategory: Filter[] | null;
}

// Categories/category
export interface Category {
	id: string;
	index: number;
	name: CategoryNameFull;
	placeholder: string;
	types: FilterNameFull[];
}

// Types/type
export interface Filter {
	categories: CategoryNameSlug[];
	id: string;
	image: string;
	name: FilterNameFull;
	layout: Layout;
	index: number;
}

// Projects/project
export interface Project {
	categories: CategoryNameSlug[];
	date: string;
	id: string;
	index: number;
	link: string;
	medias: Media[];
	name: string;
	text: string;
	type: string;
}
export interface Formats {
	large: Format;
	medium: Format;
	small: Format;
	thumbnail: Format;
}
export interface Format {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path: string;
	provider_metadata: {
		public_id: string;
		resource_type: string;
	};
	size: number;
	url: string;
	width: number;
}
export interface Media {
	type?: FilterNameSlug;
	alternativeText: string;
	copyright: string;
	formats: Formats;
	link: string;
	mime: string;
	url: string;
}

// News
export interface Article {
	address: {
		name: string;
		street: string;
		cp: string;
		city: string;
	};
	date: {
		date: string;
		start: string;
		end: string;
	};
	email: string;
	id: string;
	title: string;
	publishedAt: string;
	image: {
		url: string;
		alternativeText: string;
		mime: string;
		copyright: string;
		link: string;
	};
	register: {
		email: string;
	};
	text: string;
	website: string;
}

// #About
export interface Practice {
	id: string;
	title: string;
	text: string;
	image: {
		url: string;
		alternativeText: string;
		mime: string;
		copyright: string;
		link: string;
	};
}
