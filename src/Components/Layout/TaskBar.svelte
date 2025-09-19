<script lang="ts">
	import { mount, onMount } from "svelte";
	import { Log } from "../../Game/Logger";
	import LogMessage from "./LogMessage.svelte";
	import { _ } from "svelte-i18n";
	import { Player } from "../../Game/Player.svelte";
	import ActionBar from "./ActionBar.svelte";
	import Progressbar from "../Common/Progressbar.svelte";
	import { useProgressInfoTooltip } from "../Common/Tooltip.svelte";
	import type { IProgressInfo } from "../../Game/Action.svelte";

	let energyData: IProgressInfo = $state({
		progress: 0,
		maxProgress: 0,
		description: "stats.energy.description",
		title: "stats.energy.title",
		attribute: "stats.energy.attribute",
	});

	$effect(() => {
		energyData.progress = Player.Energy;
		energyData.maxProgress = Player.MaxEnergy;
	});
</script>

<div class="flex-col min-h-full border border-t-0" style="width: 12.5%;">
	<div class="p-2 flex flex-col h-5/6 relative">
		<div class="min-h-32 border border-t-0 border-l-0 border-r-0 p-2">
			<h6 class="text-center font-semibold pb-3">
				{$_("rightbar.label")} ({Player.Actions.length} / {Player.MaxAction})
			</h6>
			{#each Player.Actions as action}
				<ActionBar {action} />
			{/each}
		</div>
		<div class="relative" use:useProgressInfoTooltip={energyData}>
			<Progressbar
				data={energyData}
				ops={{ height: 10, barProgressClass: "bg-green-300" }}
			/>
		</div>
		<div class="p-2 border-b-2">
			<h6>{$_("stats.coins.title")}: {Player.Gold}</h6>
			<h6>{$_("stats.knowledge.title")}: {Player.Intelligence}</h6>
			<h6>{$_("stats.strength.title")}: {Player.Strength}</h6>
		</div>
		<h6 class="text-blue-600" style={"visibility: hidden"}>B: 1000</h6>
		<h6 class="text-red-600" style={"visibility: hidden"}>B: 1000</h6>
	</div>
</div>
