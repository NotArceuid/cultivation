<script lang="ts">
	import { type IProgress, type IProgressInfo } from "../../Game/Action.svelte";
	import { _, number } from "svelte-i18n";
	import { Player } from "../../Game/Player.svelte";
	import Progressbar from "../Common/Progressbar.svelte";
	import { useEnemyTooltip } from "../Common/Tooltip.svelte";
	import {
		DungeonCompleted,
		type Dungeon,
	} from "../../Game/Combat/Dungeon.svelte";
	import { ElementTypes } from "../../Game/Content/Elements";
	import {
		GetOwnedAbilities,
		GetOwnedElements,
		type IAbilityInfo,
	} from "../../Game/Combat/Abilities.svelte";

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

	let skills = $state<IAbilityInfo[]>();
	function onClick(id: number) {
		skills = GetOwnedAbilities(id as ElementTypes);
	}
</script>

<div class="p-2 w-full h-full absolute">
	<div class="relative flex flex-col h-full">
		<div class="flex flex-row p-2 min-h-3/6">
			<div class="w-5/12 border p-2">
				<h1 class="ml-2 font-bold text-md">Player Name</h1>
				<Progressbar
					data={playerData}
					ops={{ barProgressClass: "bg-green-300" }}
				/>
			</div>
			<div class="w-5/12 border ml-auto p-2">
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
		<div class="w-full min-h-3/6 mt-auto flex flex-row p-2">
			<div
				class="border w-1/6 h-full flex flex-col"
			>
				<div class="p-1 text-center font-bold bg-orange-200">Skills</div>
				<div class="overflow-y-scroll">
					{#each GetOwnedElements() as key}
						<button
							class="p-1 border border-l-0 border-b-0 border-r-0 w-full hover:bg-gray-200 hover:cursor-pointer"
							onclick={() => onClick(Number(key))}
							>{ElementTypes[Number(key)]}
						</button>
					{/each}
				</div>
			</div>
			<div class="flex flex-col w-full h-full">
				<div class="w-full h-2/12 border-b-2">
					<h6 class="p-2 font-semibold ">Ability Queue:</h6>
				</div>
				<div class="h-5/6 w-full grid">
					{#if skills}
						{#each skills as skill}
							<div class=" border w-40 h-12 m-2 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200">
								{$_(skill.title)}
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
