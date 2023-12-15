import gsap from "gsap";

export function onBeforeEnter(el: Element) {
	gsap.set(el, {
		scaleY: 0,
	});
}

export function onEnter(el: Element, done: gsap.Callback) {
	gsap.to(el, {
		duration: 0.5,
		scaleY: 1,
		ease: "power2.inOut",
		onComplete: done,
	});
}

export function onAfterEnter() {
	gsap.to(".navbar__link", {
		duration: 0.5,
		opacity: 1,
		ease: "power2.inOut",
		stagger: 0.1,
	});
}

export function onBeforeLeave() {
	gsap.to(".navbar__link", {
		duration: 0.5,
		opacity: 0,
		ease: "power2.inOut",
		stagger: 0.1,
	});
}
export function onLeave(el: Element, done: gsap.Callback) {
	gsap.to(el, {
		delay: el.querySelectorAll(".navbar__link").length * 0.1 + 0.5,
		scaleY: 0,
		onComplete: done,
	});
}
