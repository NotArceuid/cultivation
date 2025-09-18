import { mount, unmount, type Component, type ComponentProps } from "svelte";
import type { IAction, IInfo, ProgressAction } from "../../Game/Action.svelte";
import InfoTooltip from "./InfoTooltip.svelte";
import ProgressTooltip from "./ProgressTooltip.svelte";
import ActionTooltip from "./ActionTooltip.svelte";
import type { IDungeonInfo } from "../../Game/Combat/Combat.svelte";
import DungeonTooltip from "./DungeonTooltip.svelte";

type TooltipComponent =
	| ProgressTooltip
	| InfoTooltip
	| ActionTooltip
	| DungeonTooltip
	| null;

type Position = { x: number; y: number };

let tooltipComponent: TooltipComponent = null;

interface TooltipProps<T> {
	data: T;
	position: Position;
}

function createTooltipHandlers<T>(
	element: HTMLElement,
	data: T,
	TooltipComponent: any,
) {
	const props: TooltipProps<T> = $state({
		data,
		position: { x: 0, y: 0 },
	});

	function mouseOver(event: MouseEvent) {
		if (tooltipComponent) {
			unmount(tooltipComponent);
			tooltipComponent = null;
		}

		props.position = { x: event.pageX, y: event.pageY };

		tooltipComponent = mount(TooltipComponent, {
			target: document.body,
			props,
		});
	}

	function mouseMove(event: MouseEvent) {
		props.position = { x: event.pageX, y: event.pageY };
	}

	function mouseLeave() {
		if (tooltipComponent) {
			unmount(tooltipComponent);
		}
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

			if (tooltipComponent) {
				unmount(tooltipComponent);
				tooltipComponent = null;
			}
		},
	};
}

export function useProgressTooltip(element: HTMLElement, data: ProgressAction) {
	return createTooltipHandlers(element, data, ProgressTooltip);
}

export function useInfoTooltip(element: HTMLElement, data: IInfo) {
	return createTooltipHandlers(element, data, InfoTooltip);
}

export function useActionTooltip(element: HTMLElement, data: IAction) {
	return createTooltipHandlers(element, data, ActionTooltip);
}

export function useDungeonTooltip(element: HTMLElement, data: IDungeonInfo) {
	return createTooltipHandlers(element, data, DungeonTooltip);
}
