<script lang="ts">
	import type { ProgressAction } from "../../Game/Action.svelte";
	import type { ProgressBarOptions } from "./Progressbar.svelte.ts";

	let {
		data,
		ops,
	}: {
		data: ProgressAction;
		ops?: ProgressBarOptions;
	} = $props();

	let amount = $derived(((data.progress / data.maxProgress) * 100).toFixed(2));
	if (ops == null || ops.barProgressClass == null) {
		ops = { barProgressClass: "bg-blue-300" };
	}
</script>

<div class="flex relative min-h-6 {ops?.wrapperClass}">
	<div
		class="absolute {ops?.barProgressClass} h-full"
		style="width: {amount}%"
	></div>
	<div class="border w-full h-full absolute {ops?.barBackgroundClass}"></div>
</div>
