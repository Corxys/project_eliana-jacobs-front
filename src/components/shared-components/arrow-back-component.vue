<template>
	<div
		class="back"
		:class="{ 'back--light': lightTheme }"
		@click="onClick"
	>
		<div class="back__arrow">
			<img :src="lightTheme ? arrowBlack : arrowWhite" />
		</div>
		<div class="back__text">Back</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import arrowBlack from "@/assets/icons/arrow-black.svg";
import arrowWhite from "@/assets/icons/arrow-white.svg";

interface Props {
	onClick: () => void;
}
defineProps<Props>();

// #region Hooks
const store = useStore();
// #endregion

// #region Computed
const lightTheme = computed<boolean>(() => store.getters.lightTheme);
// #endreigon
</script>

<style scoped lang="scss">
.back {
	position: relative;
	display: flex;
	align-items: center;
	gap: 15px;
	margin-bottom: 30px;
	cursor: pointer;

	&:hover {
		.back__arrow {
			padding-right: 5px;
			img {
				margin-left: -5px;
			}
		}
	}

	&__arrow,
	&__text {
		display: flex;
		align-items: center;
	}

	&__arrow {
		transition: all 0.2s ease-in-out;

		img {
			transition: all 0.2s ease-in-out;
			height: 13px;
		}
	}
}
</style>
