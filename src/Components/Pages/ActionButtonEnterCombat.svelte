<script lang="ts">
	import { IsRequirementsMet, UseAction } from "../../Game/Action.svelte.ts";

	import { _ } from "svelte-i18n";
	import type { IDungeonInfo } from "../../Game/Combat/Combat.svelte.ts";
	import { useDungeonTooltip } from "../Common/Tooltip.svelte.ts";
	let { data }: { data: IDungeonInfo } = $props();

	let isDisabled = $state(false);
	$effect(() => {
		isDisabled = !IsRequirementsMet(data);
	});
</script>

<div class=""></div>

<button
	class="h-12 border-2 p-2 m-2 {isDisabled
		? 'bg-gray-200 cursor-default'
		: 'cursor-pointer'} "
	disabled={isDisabled}
	use:useDungeonTooltip={data}
	onclick={() => UseAction(data)}
>
	<h1 class="mb-3 font-semibold">{$_(data.title)}</h1>
</button>
