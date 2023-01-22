<!--suppress CssUnknownTarget, HtmlUnknownAttribute -->
<script setup>
// General
defineProps({
	"flowerHeight": {
		"type": Number,
		"required": true,
	},
	"flowerWidth": {
		"type": Number,
		"required": true,
	},
});

// Images
import music from "@/assets/images/petal_music.jpg";
import performanceArt from "@/assets/images/petal_performance-art.jpg";
import visualArt from "@/assets/images/petal_visual-art.jpg";
import circus from "@/assets/images/petal_circus.jpg";
import digitalMedia from "@/assets/images/petal_digital-media.jpg";

// Ref
// let showTooltip = ref(false);

// Methods
// const moveTooltip = (event) => {
// 	const tooltipId = event.target.classList[0].split("-")[1];
// 	const target = document.querySelector(`.flower__tooltip--${tooltipId}`);
// 	const offset = target.parentElement.querySelector(`#clip-petal-${tooltipId}`).getBoundingClientRect();
// 	const tipDist = 15;
// 	target.style.top = (event.clientY - offset.top + tipDist) + "px";
// 	target.style.left = (event.clientX - offset.left + tipDist) + "px";
// };
</script>

<template>
  <div>
    <svg
      class="flower"
      x="0px"
      y="0px"
			:height="`${flowerHeight - 15}px`"
			:width="`${flowerWidth - 30}px`"
      viewBox="0 0 832.7 792.1"
      style="pointer-events: fill"
    >
      <g>
        <defs>
          <path
            id="SVGID_1_"
            d="M193.3,293.3c-0.2,0.1-0.4,0.2-0.6,0.3c0,0-0.1,0-0.1,0.1c-1.8,0.9-3.6,1.8-5.3,2.7
				C51,365.5,0,375.6,0,375.6s34.8,18.3,155.7,138c0.2,0.2,0.3,0.3,0.5,0.5l0.1,0.1c0,0,0.1,0,0.1,0.1c23.1,22.7,54.2,39.1,89.9,44.9
				c90,14.7,164.5-37.4,177.1-114.5s-30.7-148.4-131.5-164.8C256.6,274.1,222.3,279.5,193.3,293.3z"
          />
        </defs>
        <clipPath id="SVGID_00000181770052971814633530000000290739838189137797_">
          <use xlink:href="#SVGID_1_" style="overflow:visible;" />
        </clipPath>

        <g class="petal-05" transform="matrix(1 0 0 1 0 1.525879e-05)" style="clip-path:url(#SVGID_00000181770052971814633530000000290739838189137797_);">

          <image
            class="petal-01"
            style="overflow:visible;"
            width="3857"
            height="3857"
            :href="performanceArt"
            transform="matrix(0.1093 0 0 0.1093 0 233.7414)"
          />
        </g>
      </g>
      <g>
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
          <use xlink:href="#SVGID_00000090266364474443077110000012638213831180463233_" style="overflow:visible;" />
        </clipPath>
        <g style="clip-path:url(#SVGID_00000113339469024594871880000017756546414844136069_);">

          <image
            class="petal-02"
            style="overflow:visible;"
            width="4032"
            height="2688"
            :href="circus"
            transform="matrix(0.1726 0 0 0.1596 65 0)"
          />
        </g>
      </g>
      <g>
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
          <use xlink:href="#SVGID_00000043443998604319363350000004483554710250153368_" style="overflow:visible;" />
        </clipPath>
        <g style="clip-path:url(#SVGID_00000103985328193008530800000008135543856864860041_);">

          <image
            class="petal-03"
            style="overflow:visible;"
            width="750"
            height="741"
            :href="visualArt"
            transform="matrix(0.5539 0 0 0.5539 417.289 173.8909)"
          />
        </g>
      </g>
      <g>
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
          <use xlink:href="#SVGID_00000178922333451864009520000004111467456522529704_" style="overflow:visible;" />
        </clipPath>
        <g transform="matrix(1 0 0 1 0 0)" style="clip-path:url(#SVGID_00000042697362760462214870000012711698149196813705_);">

          <image
            class="petal-04"
            style="overflow:visible;"
            width="867"
            height="586"
            :href="music"
            transform="matrix(0.6308 0 0 0.6308 252.9261 422.3441)"
          />
        </g>
      </g>

      <!-- Petal 5 -->
      <g class="group-petal-05">
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
          <use xlink:href="#path-petal-05" style="overflow:visible" />
        </clipPath>
        <g style="clip-path:url(#clip-petal-05);">

          <image
            class="petal-05"
            style="overflow:visible;"
            width="1201"
            height="659"
            :href="digitalMedia"
            transform="matrix(0.5173 0 0 0.5173 3.6685 451.2)"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.flower {
	position: relative;
	//width: 900px;
	//height: 900px;
	&__tooltip {
		position: absolute;
		z-index: 10;
		display: none;
		background-color: var(--epj-c-main);
		padding: 10px;
		min-width: 150px;
		color: var(--epj-c-white);
		white-space: nowrap;
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
