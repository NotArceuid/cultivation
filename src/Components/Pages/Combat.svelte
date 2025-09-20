<script lang="ts">
	import { type IProgress, type IProgressInfo } from "../../Game/Action.svelte";
	import { _ } from "svelte-i18n";
	import { Player } from "../../Game/Player.svelte";
	import Progressbar from "../Common/Progressbar.svelte";
	import { useEnemyTooltip } from "../Common/Tooltip.svelte";
	import { DungeonCompleted, type Dungeon } from '../../Game/Combat/Dungeon.svelte';

	let { data }: { data: Dungeon } = $props();

	const playerData: IProgress = $state({
		progress: Player.MaxHealth,
		maxProgress: Player.MaxHealth,
		nextTick: () => {}, // Returning nothing because hp regen already occurs in game loop
	});

	let currentEnemies = $state(data.Waves[data.sum]);
	$effect(() => {
		playerData.progress = Player.Health;
		playerData.maxProgress = Player.MaxHealth;

		if (!data?.Waves?.length) return;

		if (
			currentEnemies.every((x) => x?.Health?.progress <= 0) &&
			currentEnemies.length != 0
		) {
			data.sum++;
		}

		if (data.sum >= data.Waves.length) {
			DungeonCompleted(data);
		}
	});
</script>

<div class="p-2 absolute w-full min-h-full">
	<div class="flex flex-row">
		<div class="w-5/12 border">
			<div class="p-2">
				<h1 class="ml-2 font-bold text-md">Player Name</h1>
				<Progressbar
					data={playerData}
					ops={{ barProgressClass: "bg-green-300" }}
				/>
			</div>
		</div>
		<div class="w-5/12 border ml-auto">
			{#each data.Waves[data.sum] as enemy}
				<div use:useEnemyTooltip={enemy}>
					<h1 class="ml-2 font-bold text-md">{$_(enemy.Info.title)}</h1>
					<Progressbar
						data={enemy.Health}
						ops={{ barProgressClass: "bg-green-300" }}
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full border"></div>
</div>
