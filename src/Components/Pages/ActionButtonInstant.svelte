<script lang="ts">
	import {
		IsRequirementsMet,
		UseAction,
		type IAction,
	} from "../../Game/Action.svelte.ts";
	import {
		useActionTooltip,
		useInfoTooltip,
	} from "../Common/Tooltip.svelte.ts";
	import { _ } from "svelte-i18n";
	let { data }: { data: IAction } = $props();

	let isDisabled = $state(false);
	$effect(() => {
		isDisabled = !IsRequirementsMet(data);
	});
</script>

<div class=""></div>

<button
	class="h-12 border p-2 m-2 {isDisabled
		? 'bg-gray-200 cursor-default'
		: 'cursor-pointer hover:bg-gray-100'} "
	disabled={isDisabled}
	use:useActionTooltip={data}
	onclick={() => UseAction(data)}
>
	<h1 class="mb-3 font-semibold">{$_(data.title)}</h1>
</button>
