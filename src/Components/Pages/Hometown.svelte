<script>
	import {
		HometownInstantData,
		HometownProgressData,
	} from "./Hometown.svelte.ts";
	import HometownButtonProgress from "./ActionButtonProgress.svelte";
	import ActionButtonInstant from "./ActionButtonInstant.svelte";

	const gridStyle = "flex flex-col m-2 p-1 border-2 ";
	const gridLabel = "ml-2 text-lg";
</script>

<div class="absolute min-w-full min-h-full p-5">
	<div class="flex flex-row">
		<div class=" w-3/12 {gridStyle}">
			<h1 class={gridLabel}>Instant Actions:</h1>

			<ActionButtonInstant data={HometownInstantData[0]} />
		</div>
		<div class=" w-3/12 {gridStyle}">
			<h1 class={gridLabel}>Repeatable Actions:</h1>

			<HometownButtonProgress
				data={HometownProgressData[0]}
				opts={{ barBackgroundClass: "bg-gray-200" }}
			/>
			<HometownButtonProgress
				data={HometownProgressData[1]}
				opts={{
					barBackgroundClass: "bg-gray-200",
					barProgressClass: "bg-green-200",
				}}
			/>
		</div>
		<div class=" w-3/12 {gridStyle}">
			<h1 class="{gridLabel} ">Tasks:</h1>
			<button>Get hit by a truck</button>
		</div>
		<div class="w-1/6 {gridStyle}">
			<h1 class={gridLabel}>Combat:</h1>
			<button>Fight bullies</button>
		</div>
	</div>
</div>

<!-- 
ACT 1.1:
	Go to school -> unlocks rest -> unlocks buy books -> study
	buy books -> unlocks run errands 
	
	at 5 intelligence: unlocks fight bullies / workout
	at 15 strength: unlocks get hit by a truck
	get hit by a truck unlocks t0 rift

	rift unlocks mindscape. and also you are on the verge of death
	you wake up at hospital also -1000 gold because of medical fees (lol)
-->
