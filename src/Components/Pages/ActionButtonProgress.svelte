<script lang="ts">
	import {
		ActionExists,
		AddAction,
		IsRequirementsMet,
		RemoveAction,
		type ProgressAction,
	} from "../../Game/Action.svelte.ts";
	import Progressbar from "../Common/Progressbar.svelte";
	import type { ProgressBarOptions } from "../Common/Progressbar.svelte.ts";
	import { useProgressTooltip } from "../Common/Tooltip.svelte.ts";
	import { _ } from "svelte-i18n";
	let {
		data,
		buttonClass,
		opts,
	}: {
		data: ProgressAction;
		disabledStyle?: string;
		buttonClass?: string;
		opts?: ProgressBarOptions;
	} = $props();

	const isDisabled = !IsRequirementsMet(data); // just like my mind
	console.log(isDisabled + data.title);

	function addAction() {
		if (ActionExists(data)) {
			RemoveAction(data.title);
		} else {
			AddAction(data);
		}
	}
</script>

<button
	class="h-24 border-2 p-2 m-2 {buttonClass} {isDisabled
		? 'bg-gray-200 cursor-default'
		: 'cursor-pointer'} "
	disabled={isDisabled}
	use:useProgressTooltip={data}
	onclick={() => addAction()}
>
	<h1 class="mb-3 {opts?.labelClass} font-semibold">{$_(data.title)}</h1>
	<Progressbar {data} ops={opts} />
</button>
