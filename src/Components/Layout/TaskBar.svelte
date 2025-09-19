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

<div class="flex-col min-h-full border border-t-0" style="width: 20%;">
	<div class="p-2 flex flex-col h-5/6 relative">
		<div class="min-h-32 border border-t-0 border-l-0 border-r-0 p-2">
		<h6 class="text-center font-semibold pb-3">{$_("rightbar.label")} ({Player.Actions.length} / {Player.MaxAction})</h6>
		{#each Player.Actions as action}
			<ActionBar {action} />
		{/each}
	</div>
		<h6 class="text-center text-lg font-semibold">Logs</h6>
		<div
			id="log"
			class="overflow-y-scroll h-full w-11/12 scroll-m-2"
		></div>
	</div>
</div>
