<script lang="ts">
	import { mount, onMount } from "svelte";
	import { Log } from "../../Game/Logger";
	import LogMessage from "./LogMessage.svelte";
	import { _ } from "svelte-i18n";
	import { Player } from "../../Game/Player.svelte";
	import ActionBar from "./ActionBar.svelte";

	onMount(() => {
		const logContainer = document.getElementById("log") as HTMLElement;
		Log.add((msg) => {
			mount(LogMessage, {
				target: logContainer,
				props: { message: msg },
			});
		});
	});
</script>

<div class="flex-col w-1/6 min-h-full border-2 border-t-0">
	<div class="border-2 border-t-0 border-l-0 border-r-0 p-2">
		<h6 class="text-center">{$_("rightbar.label")}</h6>
		{#each Player.Actions as action}
			<ActionBar {action} />
		{/each}
		<!-- <ActionBar /> -->
	</div>
	<div class="p-2 flex flex-col h-5/6 relative">
		<h6 class="text-center">Logs</h6>
		<div
			id="log"
			class="overflow-y-scroll top-8 h-full absolute w-11/12 scroll-m-2"
		></div>
	</div>
</div>
