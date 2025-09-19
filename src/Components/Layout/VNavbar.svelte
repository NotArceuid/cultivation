<script lang="ts">
	import { Player } from "../../Game/Player.svelte";
	import { CurrentPage, PagesEnum } from "../Pages/Pages";
	import { _ } from "svelte-i18n";
	import Progressbar from "../Common/Progressbar.svelte";
	import { useProgressInfoTooltip } from "../Common/Tooltip.svelte.ts";
	import type { IProgressInfo } from "../../Game/Action.svelte.ts";

	let energyData: IProgressInfo = $state({ progress: 0, maxProgress: 0, description: 'stats.energy.description', title: 'stats.energy.title', attribute: 'stats.energy.attribute'});

	$effect(() => {
		energyData.progress = Player.Energy;
		energyData.maxProgress = Player.MaxEnergy;
	});
</script>

<div
	class="flex flex-col w-2/6 max-w-48 min-h-full border-2 border-t-0"
	id="vnavbarBtn"
>
	<div id="energyStats" class="flex-col">
		<h6 class="text-center">Novice mage</h6>

		<div class="relative" use:useProgressInfoTooltip={energyData}>
			<Progressbar data={energyData} />
		</div>
		<div>
			<h6>{$_("stats.coins.title")}</h6>
			<h6>{$_("stats.knowledge.title")}</h6>
		</div>
		<h6 class="text-blue-600" style={"visibility: hidden"}>B: 1000</h6>
		<h6 class="text-red-600" style={"visibility: hidden"}>B: 1000</h6>
	</div>
	<div id="vnavbarBtn" class="flex flex-col">
		<button onclick={() => CurrentPage.set(PagesEnum.World)}>
			{$_("navigation.world")}
		</button>
		<button onclick={() => CurrentPage.set(PagesEnum.Inventory)}>
			{$_("navigation.inventory")}
		</button>
		<button onclick={() => CurrentPage.set(PagesEnum.Stats)}>
			{$_("navigation.stats")}
		</button>
		<button onclick={() => CurrentPage.set(PagesEnum.Settings)}>
			{$_("navigation.settings")}
		</button>
		<button onclick={() => CurrentPage.set(PagesEnum.Info)}>
			{$_("navigation.info")}
		</button>
	</div>
</div>

<style>
	#vnavbarBtn > button {
		width: auto;
		padding: 0.5rem 0.5rem;
		border: 0;
	}

	#energyStats {
		padding-top: 0.5rem;
	}

	#energyStats > h6 {
		text-align: center;
		font-size: medium;
	}

	button:hover {
		cursor: pointer;
	}
</style>
