<script lang="ts">
	import { _ } from "svelte-i18n";
	import type { Vector2 } from "../../Game/Shared/Vector.js";
	import type { IEnemy } from "../../Game/Combat/Enemy.svelte.js";

	let {
		data,
		position,
	}: {
		data: IEnemy;
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
		<h1 class="text-xl font-semibold">{$_(data.Info.title)}</h1>
		<h1 class="text-sm text-gray-500 mt-auto">{$_(data.Info.attribute)}</h1>
	</div>
	<div class="p-2">
		<h6 class="mb-2">{$_(data.Info.description)}</h6>
	</div>
</div>

<style>
	* {
		pointer-events: none;
	}
</style>
