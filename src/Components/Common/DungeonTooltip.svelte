<script lang="ts">
	import { _ } from "svelte-i18n";
	import type { Vector2 } from "../../Game/Shared/Vector.js";
	import type { IDungeonInfo } from "../../Game/Combat/Dungeon.svelte.js";

	let {
		data,
		position,
	}: {
		data: IDungeonInfo;
		position: Vector2;
	} = $props();

	let style = $state("");
	$effect(() => {
		style = `left: ${position.x + 50}px; top: ${position.y + 50}px; z-index: 1000;`;
	});
</script>

<div
	class="tooltip pointer-events-none absolute pt-2 pb-2 border min-w-sm max-w-sm shadow-lg bg-white"
	style="{style} "
>
	<div class="border-b-2 p-2 justify-between flex w-full h-full">
		<h1 class="text-xl font-semibold">{$_(data.title)}</h1>
		<h1 class="text-sm text-gray-500 mt-auto">{$_(data.attribute)}</h1>
	</div>
	<div class="p-2">
		<h6 class="mb-2">{$_(data.description)}</h6>

		{#if data.requirements && data.requirements.length > 0}
			<h6 class="font-bold mt-3">Requirements:</h6>
			{#each data.requirements as [requirement, isMet]}
				<h6 class={isMet() ? "text-green-300" : "text-red-500"}>
					{$_(requirement.subject)}
					{#each requirement.predicate as predicate}
						{$_(predicate)}
					{/each}
				</h6>
			{/each}
		{/if}

		{#if data.effects && data.effects.length > 0}
			<h6 class="font-bold mt-3">Effects:</h6>
			{#each data.effects as effect}
				<h6>
					{$_(effect.subject)}
					{#each effect.predicate as predicate}
						{$_(predicate)}
					{/each}
				</h6>
			{/each}
		{/if}

		{#if data.Rewards && data.Rewards.length > 0}
			<h6 class="font-bold mt-3">Rewards:</h6>
			{#each data.Rewards as effect}
				<h6>
					{$_(effect.subject)}
					{#each effect.predicate as predicate}
						{$_(predicate)}
					{/each}
				</h6>
			{/each}
		{/if}

		{#if data.CompletionRewards && data.CompletionRewards.length > 0}
			<h6 class="font-bold mt-3">First Time Completion:</h6>
			{#each data.CompletionRewards as effect}
				<h6>
					{$_(effect.subject)}
					{#each effect.predicate as predicate}
						{$_(predicate)}
					{/each}
				</h6>
			{/each}
		{/if}
	</div>
</div>

<style>
	* {
		pointer-events: none;
	}
</style>
