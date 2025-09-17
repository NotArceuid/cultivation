import { mount, unmount } from "svelte";
import type { IAction, IInfo, ProgressAction } from "../../Game/Action.svelte";
import InfoTooltip from "./InfoTooltip.svelte";
import ProgressTooltip from "./ProgressTooltip.svelte";
import ActionTooltip from "./ActionTooltip.svelte";

let tooltipComponent: ProgressTooltip | InfoTooltip | null;

export function useProgressTooltip(element: HTMLElement, data: ProgressAction) {
	let props = $state({
		data: data,
		position: { x: 0, y: 0 },
	});

	function mouseOver(event: MouseEvent) {
		if (tooltipComponent) {
			unmount(tooltipComponent);
			tooltipComponent = null;
		}

		props.position = event;

		tooltipComponent = mount(ProgressTooltip, {
			target: document.body,
			props: props,
		});
	}

	function mouseMove(event: MouseEvent) {
		props.position = { x: event.pageX, y: event.pageY };
	}

	function mouseLeave() {
		if (tooltipComponent) unmount(tooltipComponent);
		tooltipComponent = null;
	}

	element.addEventListener("mouseover", mouseOver);
	element.addEventListener("mouseleave", mouseLeave);
	element.addEventListener("mousemove", mouseMove);

	return {
		destroy() {
			element.removeEventListener("mouseover", mouseOver);
			element.removeEventListener("mouseleave", mouseLeave);
			element.removeEventListener("mousemove", mouseMove);
		},
	};
}

export function useInfoTooltip(element: HTMLElement, data: IInfo) {
	let props = $state({
		data: data,
		position: { x: 0, y: 0 },
	});

	function mouseOver(event: MouseEvent) {
		if (tooltipComponent) {
			unmount(tooltipComponent);
			tooltipComponent = null;
		}

		props.position = event;

		tooltipComponent = mount(InfoTooltip, {
			target: document.body,
			props: props,
		});
	}

	function mouseMove(event: MouseEvent) {
		props.position = { x: event.pageX, y: event.pageY };
	}

	function mouseLeave() {
		if (tooltipComponent) unmount(tooltipComponent);
		tooltipComponent = null;
	}

	element.addEventListener("mouseover", mouseOver);
	element.addEventListener("mouseleave", mouseLeave);
	element.addEventListener("mousemove", mouseMove);

	return {
		destroy() {
			element.removeEventListener("mouseover", mouseOver);
			element.removeEventListener("mouseleave", mouseLeave);
			element.removeEventListener("mousemove", mouseMove);
		},
	};
}

export function useActionTooltip(element: HTMLElement, data: IAction) {
	let props = $state({
		data: data,
		position: { x: 0, y: 0 },
	});

	function mouseOver(event: MouseEvent) {
		if (tooltipComponent) {
			unmount(tooltipComponent);
			tooltipComponent = null;
		}

		props.position = event;

		tooltipComponent = mount(ActionTooltip, {
			target: document.body,
			props: props,
		});
	}

	function mouseMove(event: MouseEvent) {
		props.position = { x: event.pageX, y: event.pageY };
	}

	function mouseLeave() {
		if (tooltipComponent) unmount(tooltipComponent);
		tooltipComponent = null;
	}

	element.addEventListener("mouseover", mouseOver);
	element.addEventListener("mouseleave", mouseLeave);
	element.addEventListener("mousemove", mouseMove);

	return {
		destroy() {
			element.removeEventListener("mouseover", mouseOver);
			element.removeEventListener("mouseleave", mouseLeave);
			element.removeEventListener("mousemove", mouseMove);
		},
	};
}
