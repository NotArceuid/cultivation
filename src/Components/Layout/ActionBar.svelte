<script lang="ts">
	import { ProgressAction, RemoveAction } from "../../Game/Action.svelte";
	import Progressbar from "../Common/Progressbar.svelte";
	import { _ } from "svelte-i18n";
	import { useProgressTooltip } from "../Common/Tooltip.svelte.ts";

	let { action }: { action: ProgressAction } = $props();
	function cancel(id: string): void {
		RemoveAction(id);
	}
</script>

<div class="flex flex-row" use:useProgressTooltip={action}>
	<button
		class="border border-black h-6 w-6 text-center align-middle bg-red-400"
		onclick={() => cancel(action.title)}>x</button
	>
	<div class="relative w-full">
		<h1 class="absolute left-2 z-1">{$_(action.title)}</h1>
		<Progressbar data={action} ops={{ wrapperClass: "w-full h-full" }} />
	</div>
</div>

<style>
</style>
