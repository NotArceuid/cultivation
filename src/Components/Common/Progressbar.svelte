<script lang="ts">
	import type { IProgress } from "../../Game/Action.svelte";
	import type { ProgressBarOptions } from "./Progressbar.svelte.ts";

	let {
		data,
		ops,
	}: {
		data: IProgress;
		ops?: ProgressBarOptions;
	} = $props();

	let amount = $derived(((data.progress / data.maxProgress) * 100).toFixed(2));
	if (!ops) {
		ops = {
			barBackgroundClass: "",
			wrapperClass: "",
			barProgressClass: "bg-blue-300",
			height: 6,
		};
	} else {
		ops = {
			barBackgroundClass: ops.barBackgroundClass || "",
			wrapperClass: ops.wrapperClass || "",
			barProgressClass: ops.barProgressClass || "bg-blue-300",
			height: typeof ops.height === "number" ? ops.height : 6,
		};
	}

	console.log(ops.height);
</script>

<div class="flex relative min-w-full min-h-{ops.height} {ops?.wrapperClass}">
	<div class="absolute inset-0/12 font-semibold flex items-center z-1">
		<h6 class="text-sm px-2">
			{data.progress} / {data.maxProgress}
		</h6>
	</div>

	<div
		class="absolute {ops?.barProgressClass} h-full"
		style="width: {amount}%"
	></div>

	<div class="border w-full h-full absolute {ops?.barBackgroundClass}"></div>
</div>
