<script lang="ts">
	import { IsRequirementsMet, UseAction } from "../../Game/Action.svelte.ts";

	import { _ } from "svelte-i18n";
	import { useDungeonTooltip } from "../Common/Tooltip.svelte.ts";
	import {
		currentDungeon,
		EnterCombat,
		isInCombat,
	} from "../../Game/Combat/Combat.svelte.ts";
	import {
		ExitDungeon,
		type IDungeonInfo,
	} from "../../Game/Combat/Dungeon.svelte.ts";
	let { data }: { data: IDungeonInfo } = $props();

	let isDisabled = $state(false);
	$effect(() => {
		isDisabled = !IsRequirementsMet(data);
	});

	function enterCombat() {
		UseAction(data);
		EnterCombat(data);
	}
</script>

<div class=""></div>

<button
	class="h-12 border p-2 m-2 {isDisabled
		? 'bg-gray-200 cursor-default'
		: 'cursor-pointer'} "
	disabled={isDisabled}
	use:useDungeonTooltip={data}
	onclick={() => {
		if (isInCombat) {
			if ($currentDungeon.CancelAction) $currentDungeon.CancelAction();

			ExitDungeon($currentDungeon);
			enterCombat();
		}
	}}
>
	<h1 class="mb-3 font-semibold">{$_(data.title)}</h1>
</button>
