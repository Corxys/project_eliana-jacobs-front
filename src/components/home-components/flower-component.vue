<template>
	<div class="flower">
		<!-- Tooltip -->
		<div class="flower__tooltip" />

		<!-- Flower SVG -->
		<svg
			class="flower__svg"
			x="0px"
			y="0px"
			:height="`${flowerHeight}px`"
			:width="`${flowerWidth}px`"
			viewBox="0 0 832.7 792.1"
		>
			<!-- Petal 1 -->
			<g
				id="Art performance"
				class="flower__petal flower__petal-01"
				@mouseenter="displayTooltip"
				@mouseleave="hideTooltip"
				@click.stop="getProjectsByCategory"
			>
				<defs>
					<path
						id="SVGID_1_"
						d="M193.3,293.3c-0.2,0.1-0.4,0.2-0.6,0.3c0,0-0.1,0-0.1,0.1c-1.8,0.9-3.6,1.8-5.3,2.7
            C51,365.5,0,375.6,0,375.6s34.8,18.3,155.7,138c0.2,0.2,0.3,0.3,0.5,0.5l0.1,0.1c0,0,0.1,0,0.1,0.1c23.1,
            22.7,54.2,39.1,89.9,44.9 c90,14.7,164.5-37.4,177.1-114.5s-30.7-148.4-131.5-164.8C256.6,274.1,222.3,279.5,193.3,293.3z"
					/>
				</defs>
				<clipPath id="SVGID_00000181770052971814633530000000290739838189137797_">
					<use
						xlink:href="#SVGID_1_"
						style="overflow: visible"
					/>
				</clipPath>
				<g
					transform="matrix(1 0 0 1 0 1.525879e-05)"
					style="clip-path: url(#SVGID_00000181770052971814633530000000290739838189137797_)"
				>
					<image
						class="flower__petal--image"
						style="overflow: visible"
						width="3857"
						height="3857"
						:href="categoriesImages[2]"
						transform="matrix(0.1093 0 0 0.1093 0 233.7414)"
					/>
				</g>
			</g>

			<!-- Petal 2 -->
			<g
				id="Circus"
				class="flower__petal flower__petal-02"
				@mouseenter="displayTooltip"
				@mouseleave="hideTooltip"
				@click="getProjectsByCategory"
			>
				<defs>
					<path
						id="SVGID_00000090266364474443077110000012638213831180463233_"
						d="M530,271.2c6.9-2.2,13.7-3.9,20.6-5.2
				c-1.3-33.2-11.9-63.7-29.1-88.4c-0.1-0.2-0.2-0.4-0.4-0.5L521,177c-1.1-1.6-2.3-3.2-3.5-4.8C427.4,48.7,409.2,0,409.2,0
				s-12.5,37.3-111.1,175.9c-0.1,0.2-0.3,0.4-0.4,0.6l-0.1,0.1c0,0,0,0.1-0.1,0.1c-18.7,26.5-29.8,59.8-29.8,96
				c0,91.2,63.4,156.3,141.5,156.3c3.1,0,6.1-0.1,9.2-0.3C410,361.9,452.5,295.7,530,271.2z"
					/>
				</defs>
				<clipPath id="SVGID_00000113339469024594871880000017756546414844136069_">
					<use
						xlink:href="#SVGID_00000090266364474443077110000012638213831180463233_"
						style="overflow: visible"
					/>
				</clipPath>
				<g style="clip-path: url(#SVGID_00000113339469024594871880000017756546414844136069_)">
					<image
						class="flower__petal--image"
						style="overflow: visible"
						width="4032"
						height="2688"
						:href="categoriesImages[0]"
						transform="matrix(0.1726 0 0 0.1596 65 0)"
					/>
				</g>
			</g>
			<!-- Petal 3 -->
			<g
				id="Visual art"
				class="flower__petal flower__petal-03"
				@mouseenter="displayTooltip"
				@mouseleave="hideTooltip"
				@click="getProjectsByCategory"
			>
				<defs>
					<path
						id="SVGID_00000043443998604319363350000004483554710250153368_"
						d="M631.4,270.9c-0.2-0.1-0.5-0.1-0.7-0.2
				c-0.1,0-0.1,0-0.2-0.1h-0.1c-30.9-9.8-66-10.3-100.5,0.6C443.5,298.6,400.6,377.9,423.3,452c61.9-47.4,151.7-34.4,207.2,37.8
				c8.6,11.1,15.5,22.9,20.9,35.1c18.2-10.8,33.7-24.7,45.9-40.5c0.1-0.2,0.3-0.3,0.4-0.5l0.1-0.1c1.2-1.6,2.4-3.2,3.5-4.8
				c90.3-123.2,131.3-155.3,131.3-155.3S793.3,323,631.4,270.9z"
					/>
				</defs>
				<clipPath id="SVGID_00000103985328193008530800000008135543856864860041_">
					<use
						xlink:href="#SVGID_00000043443998604319363350000004483554710250153368_"
						style="overflow: visible"
					/>
				</clipPath>
				<g style="clip-path: url(#SVGID_00000103985328193008530800000008135543856864860041_)">
					<image
						class="flower__petal--image"
						style="overflow: visible"
						width="750"
						height="741"
						:href="categoriesImages[1]"
						transform="matrix(0.5539 0 0 0.5539 417.289 173.8909)"
					/>
				</g>
			</g>
			<!-- Petal 4 -->
			<g
				id="Music"
				class="flower__petal flower__petal-04"
				@mouseenter="displayTooltip"
				@mouseleave="hideTooltip"
				@click="getProjectsByCategory"
			>
				<defs>
					<path
						id="SVGID_00000178922333451864009520000004111467456522529704_"
						d="M665.5,584.9c0-0.2,0-0.5,0-0.7c0-0.1,0-0.1,0-0.2v-0.1
				c-1.4-32.4-12.8-65.6-34.9-94.3C575,417.5,485.1,404.5,423.2,452c59,47.3,69.5,134.8,16.6,206.4c-5.7,7.7-11.8,14.7-18.4,21.1
				c19.2,19.1,42.1,32.7,66,40.3c0.2,0.1,0.4,0.1,0.6,0.2h0.1c1.9,0.6,3.8,1.1,5.7,1.7C640.5,764.5,684.6,792,684.6,792
				S671.8,754.9,665.5,584.9z"
					/>
				</defs>
				<clipPath id="SVGID_00000042697362760462214870000012711698149196813705_">
					<use
						xlink:href="#SVGID_00000178922333451864009520000004111467456522529704_"
						style="overflow: visible"
					/>
				</clipPath>
				<g
					transform="matrix(1 0 0 1 0 0)"
					style="clip-path: url(#SVGID_00000042697362760462214870000012711698149196813705_)"
				>
					<image
						class="flower__petal--image"
						style="overflow: visible"
						width="867"
						height="586"
						:href="categoriesImages[4]"
						transform="matrix(0.6308 0 0 0.6308 252.9261 422.3441)"
					/>
				</g>
			</g>
			<!-- Petal 5 -->
			<g
				id="Digital media"
				class="flower__petal flower__petal-05"
				@mouseenter="displayTooltip"
				@mouseleave="hideTooltip"
				@click="getProjectsByCategory"
			>
				<defs>
					<path
						id="path-petal-05"
						d="M422.2,451.2c-15.6,73.5-88.4,122.2-175.8,107.9
				c-21.6-3.5-41.5-10.9-59-21.2c-5.1,15.3-7.8,30.9-8.2,46.3c0,0.2,0,0.4,0,0.7v0.1c0,2-0.1,4,0,5.9c-0.7,152.8-15,202.8-15,202.8
				s32.2-22.6,193.8-75.5c0.2-0.1,0.5-0.1,0.7-0.2c0.1,0,0.1,0,0.2-0.1h0.1c30.8-10.2,59.5-30.4,81-59.5
				C493,586.4,482.1,498.3,422.2,451.2z"
					/>
				</defs>
				<clipPath id="clip-petal-05">
					<use
						xlink:href="#path-petal-05"
						style="overflow: visible"
					/>
				</clipPath>
				<g style="clip-path: url(#clip-petal-05)">
					<image
						class="flower__petal--image"
						style="overflow: visible"
						width="1201"
						height="659"
						:href="categoriesImages[3]"
						transform="matrix(0.5173 0 0 0.5173 3.6685 451.2)"
					/>
				</g>
			</g>
		</svg>
	</div>
</template>

<!--suppress CssUnknownTarget, HtmlUnknownAttribute -->
<script setup lang="ts">
import { computed, ref } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { slugifyString } from "@/utils/slugify";
import type { Category, Filter } from "@/common/types";

interface Props {
	flowerHeight: number;
	flowerWidth: number;
}
defineProps<Props>();

// #region Hooks
const store = useStore();
const router = useRouter();
// #endregion

// #region Data
let tooltipText = ref<string>("");
// #endregion

// #region Computed
const category = computed<Category>(() => store.state.selected.category);
const type = computed<Filter>(() => store.state.selected.filter);
const categories = computed<Category[]>(() => store.getters.categories);
const categoriesImages = computed<string[]>(() => {
	return categories.value.reduce((acc: string[], category) => {
		acc.push(category.placeholder ? category.placeholder : "/");

		return acc;
	}, []);
});
// #endregion

// #region Functions
function displayTooltip(event: Event): void {
	if (!event.target) {
		return;
	}

	const eventTarget = event.target as HTMLDivElement;
	const target: HTMLDivElement | null = document.querySelector(".flower__tooltip");
	const clipPath = eventTarget.querySelector("clipPath use");

	if (!clipPath || !target) {
		return;
	}

	const boundedImage = clipPath.getBoundingClientRect();

	target.style.display = "block";
	target.innerHTML = eventTarget.id;

	const boundedTooltip = target.getBoundingClientRect();

	target.style.top = boundedImage.top + boundedImage.height / 2 - boundedTooltip.height / 2 + "px";
	target.style.left = boundedImage.left + boundedImage.width / 2 - boundedTooltip.width / 2 + "px";
}

function hideTooltip(): void {
	const target: HTMLDivElement | null = document.querySelector(".flower__tooltip");

	if (!target) {
		return;
	}

	target.style.display = "none";
	tooltipText.value = "";
}

async function getProjectsByCategory(event: Event) {
	if (!event.target) {
		return;
	}

	const eventTarget = event.target as HTMLDivElement;
	const flower = eventTarget.closest(".flower__petal");

	if (!flower) {
		return;
	}

	await store.dispatch("setCategory", slugifyString(flower.id));
	await store.dispatch("setFilter", "All");

	await router.push(`/projects/${category.value}/filter/${type.value}`);
}
// #endregion
</script>

<style scoped lang="scss">
clipPath use {
	position: relative;
}

.flower {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 1.39% 92.63%, #110f10, transparent 30%), radial-gradient(circle at 51.11% 4.47%, #110f10, transparent 100%),
		radial-gradient(circle at 87.39% 82.76%, #110f10, transparent 100%), radial-gradient(circle at 32.5% 59.81%, #205251, transparent 100%),
		radial-gradient(circle at 74.72% 29.6%, #110f10, transparent 100%), radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);

	&__petal {
		&--image {
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover {
				filter: blur(40px);
			}
		}
	}

	&__svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 95%;
		height: 95%;
	}

	&__tooltip {
		cursor: pointer;
		white-space: nowrap;
		pointer-events: none;
		position: absolute;
		z-index: 10;
		display: none;
		background-color: var(--color-background-label);
		padding: 1.39vh 1.8vh 0.9vh 1.8vh;
		color: var(--color-text-label);
		font-family: var(--font-primary);
		font-size: 2vh;

		&--bold {
			font-weight: 700;
			margin-bottom: 5px;
		}

		&.active {
			display: block;
			flex-direction: column;
		}
	}
}
</style>
