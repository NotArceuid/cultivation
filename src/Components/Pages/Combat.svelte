<script lang='ts'>
	import { type IProgress, type IProgressInfo } from '../../Game/Action.svelte';
	import type { IDungeonInfo } from '../../Game/Combat/Combat.svelte';
	import { Player } from '../../Game/Player.svelte';
	import Progressbar from '../Common/Progressbar.svelte';

	let { data } : {data: IDungeonInfo} = $props()

	const playerData: IProgress = $state({
		progress: Player.MaxHealth,
		maxProgress: Player.MaxHealth,
		nextTick: () => {} // Returning nothing because hp regen already occurs in game loop
	})

	$effect(() => {
		playerData.progress = Player.Health;
		playerData.maxProgress = Player.MaxHealth;
	})
</script>

<div class="p-2">
	<div class="flex flex-row">
		<div class="w-5/12 border-2">
			<div class="p-2">
				<h1 class="ml-2 font-bold text-md">Player Name</h1>
				<Progressbar data={playerData} ops={{barProgressClass: 'bg-green-300'}}/> 
			</div>
		</div>
		<div class="w-5/12 border-2 ml-auto">
			{#each data.Enemies as enemies}
				<h1 class="ml-2 font-bold text-md">{enemies.Info.title}</h1>
				<Progressbar data={ enemies.Health} ops={{barProgressClass: 'bg-green-300'}}/> 
			{/each}
		</div>
	</div>
	<div class="w-full border-2">

	</div>
</div>