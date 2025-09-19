<script lang="ts">
	import VNavbar from "../Components/Layout/VNavbar.svelte";
	import { ChangePage, CurrentPage } from "../Components/Pages/Pages";
	import TaskBar from "../Components/Layout/TaskBar.svelte";
	import { mount, onMount } from "svelte";
	import World from "../Components/Pages/World.svelte";
	import { isLoading } from "svelte-i18n";
	import { GameLoop } from "../Game/Game";
	import { Log } from "../Game/Logger";
	import LogMessage from "../Components/Layout/LogMessage.svelte";
	import { writable } from "svelte/store";

	onMount(() => {
		CurrentPage.subscribe((x) => {
			ChangePage(x, "page-content");
		});

		const gameloop = new GameLoop();
		gameloop.start();
	});

	let pageLoaded = $state(false);
	$effect(() => {
		if (!pageLoaded) return;

		Log.add((msg) => {
			console.log(document.getElementById("log") as HTMLElement);

			mount(LogMessage, {
				target: document.getElementById("log") as HTMLElement,
				props: { message: msg },
			});
		});

		Log.invoke("Game loaded. Welcome");
	});
</script>

{#if $isLoading}
	<h1>Loading...</h1>
{:else}
	<div class="flex flex-row min-h-full ml-2 justify-center align-middle">
		<VNavbar />
		<div class="flex-col flex min-h-full w-full">
			<div class="relative min-h-8/12 flex flex-col">
				<World />
			</div>
			<div class="border min-h-4/12 border-l-0 border-r-0 p-2">
				<h6 class="p-2 text-lg font-semibold">Logs</h6>
				<div
					id="log"
					class="overflow-y-scroll h-full w-11/12 scroll-m-2 p-2 text-lg"
				></div>
			</div>
		</div>

		<TaskBar />
	</div>
	{(pageLoaded = true)}
{/if}
