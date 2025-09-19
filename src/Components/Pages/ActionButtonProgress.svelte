<script lang="ts">
	import {
		ActionExists,
		AddAction,
		IsRequirementsMet,
		RemoveAction,
		type IProgressAction,
	} from "../../Game/Action.svelte.ts";
	import Progressbar from "../Common/Progressbar.svelte";
	import type { ProgressBarOptions } from "../Common/Progressbar.svelte.ts";
	import {
		useActionTooltip,
		useProgressActionTooltip,
	} from "../Common/Tooltip.svelte.ts";
	import { _ } from "svelte-i18n";
	let {
		data,
		buttonClass,
		opts,
	}: {
		data: IProgressAction;
		buttonClass?: string;
		opts?: ProgressBarOptions;
	} = $props();

	let isDisabled = $state(!IsRequirementsMet(data)); // just like my mind

	$effect(() => {
		isDisabled = !IsRequirementsMet(data);
	});

	function addAction() {
		if (ActionExists(data)) {
			RemoveAction(data.title);
		} else {
			AddAction(data);
		}
	}
</script>

<button
	class="h-24 border p-2 m-2 {buttonClass} {isDisabled
		? 'bg-gray-200 cursor-default'
		: 'cursor-pointer'} "
	disabled={isDisabled}
	use:useActionTooltip={data}
	onclick={() => addAction()}
>
	<h1 class="mb-3 {opts?.labelClass} font-semibold">{$_(data.title)}</h1>
	<Progressbar {data} ops={opts} />
</button>
