<script lang="ts">
	import { RemoveAction, type IProgressAction } from "../../Game/Action.svelte";
	import Progressbar from "../Common/Progressbar.svelte";
	import { _ } from "svelte-i18n";
	import { useProgressActionTooltip } from "../Common/Tooltip.svelte.ts";

	let { action }: { action: IProgressAction } = $props();
	function cancel(id: string): void {
		if (action.CancelAction) action.CancelAction();
		console.log("cance");

		RemoveAction(id);
	}
</script>

<div class="flex flex-row" use:useProgressActionTooltip={action}>
	<div class="relative w-full">
		<div class="flex font-bold">
			<button
				class="border h-6 w-7 text-center text-sm"
				onclick={() => cancel(action.title)}>x</button
			>
			<h1 class="ml-2 z-1">{$_(action.title)}</h1>
		</div>

		<Progressbar data={action} ops={{ height: 4 }} />
	</div>
</div>

<style>
</style>
