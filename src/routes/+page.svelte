<script lang="ts">
	import VNavbar from "../Components/Layout/VNavbar.svelte";
	import { ChangePage, CurrentPage } from "../Components/Pages/Pages";
	import TaskBar from "../Components/Layout/TaskBar.svelte";
	import { mount, onMount } from "svelte";
	import World from "../Components/Pages/World.svelte";
	import { isLoading } from "svelte-i18n";
	import { GameLoop } from "../Game/Game";

	onMount(() => {
		CurrentPage.subscribe((x) => {
			ChangePage(x, "page-content");
		});

		const gameloop = new GameLoop();
		gameloop.start();
	});
</script>

{#if $isLoading}
	<h1>Loading...</h1>
{:else}
	<div class="flex flex-row min-h-full ml-2 mr-2">
		<VNavbar />
		<div class="relative min-h-full w-9/12 flex flex-col" id="page-content">
			<div class="border-2 h-18 border-l-0 border-r-0 border-t-0"></div>
			<World />
		</div>

		<TaskBar />
	</div>
{/if}