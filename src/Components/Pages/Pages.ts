import { writable } from "svelte/store";

export enum PagesEnum {
	World,
	Inventory,
	Stats,
	Settings,
	Info,
}
export enum LocationEnum {
	Combat,
	Hometown,
	Mindscape,
}

export let CurrentPage = writable<PagesEnum>(PagesEnum.World);
export let CurrentLocation = writable<LocationEnum>(LocationEnum.Hometown);

export function ChangePage(
	inputEnum: PagesEnum | LocationEnum,
	pageId: string,
): void {
	const element = document.getElementById(pageId);
	if (element == null) return;

	let Pages = element.children;
	for (let i = 0; i < Pages!.length; i++) {
		if (i == inputEnum) (Pages![i] as HTMLElement).style.visibility = "visible";
		else (Pages![i] as HTMLElement).style.visibility = "hidden";
	}
}

export * as Pages from "./Pages";
