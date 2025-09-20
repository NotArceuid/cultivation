import { mount, unmount, type Component, type ComponentProps } from "svelte";
import type {
	IAction,
	IInfo,
	IProgressAction,
	IProgressInfo,
} from "../../Game/Action.svelte";
import InfoTooltip from "./InfoTooltip.svelte";
import ProgressTooltip from "./ProgressTooltip.svelte";
import ActionTooltip from "./ActionTooltip.svelte";
import DungeonTooltip from "./DungeonTooltip.svelte";
import ProgressInfoTooltip from "./ProgressInfoTooltip.svelte";
import ProgressActionTooltip from "./ProgressTooltip.svelte";
import EnemyTooltip from "./EnemyTooltip.svelte";
import type { IDungeonInfo } from "../../Game/Combat/Dungeon.svelte";
import type { IEnemy } from "../../Game/Combat/Enemy.svelte";

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

export function useProgressActionTooltip(
	element: HTMLElement,
	data: IProgressAction,
) {
	return createTooltipHandlers(element, data, ProgressActionTooltip);
}

export function useProgressInfoTooltip(
	element: HTMLElement,
	data: IProgressInfo,
) {
	return createTooltipHandlers(element, data, ProgressInfoTooltip);
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

export function useEnemyTooltip(element: HTMLElement, data: IEnemy) {
	return createTooltipHandlers(element, data, EnemyTooltip);
}
