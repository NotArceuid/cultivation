<script lang="ts">
	import { Player } from "../../Game/Player.svelte";
	import { CurrentPage, PagesEnum } from "../Pages/Pages";
	import { _ } from "svelte-i18n";
	import Progressbar from "../Common/Progressbar.svelte";
	import { useProgressInfoTooltip } from "../Common/Tooltip.svelte.ts";
	import type { IProgressInfo } from "../../Game/Action.svelte.ts";
</script>

<div
	class="flex flex-col w-2/6 max-w-48 min-h-full border border-t-0"
	id="vnavbarBtn"
>
	<div id="energyStats" class="flex-col pt-2">
		<h6 class="text-center text-lg m-2">Novice mage</h6>
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

	button:hover {
		cursor: pointer;
	}
</style>
