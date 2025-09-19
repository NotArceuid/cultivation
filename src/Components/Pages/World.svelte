<script lang="ts">
	import { onMount } from "svelte";
	import Mindscape from "./Mindscape.svelte";
	import { ChangePage, CurrentLocation, LocationEnum } from "./Pages";
	import { _, date } from "svelte-i18n";
	import { useInfoTooltip } from "../Common/Tooltip.svelte.ts";
	import { MindscapeInfo } from "./Mindscape.svelte.ts";
	import Hometown from "./Hometown/Hometown.svelte";
	import { HometownInfo } from "./Hometown/Hometown.svelte.ts";
	import Combat from "./Combat.svelte";
	import {
		currentDungeon,
		Dungeon,
		isInCombat,
		type IDungeonInfo,
	} from "../../Game/Combat/Combat.svelte.ts";

	let previousLocation: LocationEnum = LocationEnum.Hometown;

	onMount((): void => {
		CurrentLocation.subscribe((x) => {
			ChangePage(x, "locations");
		});
		isInCombat.subscribe((inCombat) => {
			console.log(inCombat);

			if (inCombat) {
				ChangePage(LocationEnum.Combat, "locations");
				previousLocation = $CurrentLocation;
			} else {
				console.log("1", previousLocation);
				ChangePage(previousLocation, "locations");
			}
		});

		ChangePage(LocationEnum.Hometown, "locations");
	});

	let dungeonInfo = $state<Dungeon | undefined>();
	currentDungeon.subscribe((x) => {
		dungeonInfo = x;
	});
</script>

<div class="flex flex-row w-full h-full">
	<div class="w-2/6 max-w-32 min-h-full border border-t-0 border-l-0">
		<div id="locations-nav" class="flex flex-col mt-4">
			<h6 class="text-center pb-4 mb-4 border-b-2">Locations</h6>
			<button
				onclick={() => CurrentLocation.set(LocationEnum.Hometown)}
				use:useInfoTooltip={HometownInfo}
				>{$_("locations.hometown.title")}</button
			>

			<button
				onclick={() => CurrentLocation.set(LocationEnum.Mindscape)}
				use:useInfoTooltip={MindscapeInfo}
				>{$_("locations.mindscape.title")}</button
			>
		</div>
	</div>
	<div id="locations" class="relative w-full">
		{#if dungeonInfo}
			<Combat data={dungeonInfo} />
		{/if}
		<Hometown />
		<Mindscape />
	</div>
</div>

<style>
	#locations-nav button {
		height: 3rem;
	}

	button:hover {
		cursor: pointer;
	}
</style>
