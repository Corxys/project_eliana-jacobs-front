interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "marked";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<NonNullable<unknown>, NonNullable<unknown>, {}>;
	export default component;
}
