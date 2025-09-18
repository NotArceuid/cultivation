import { CreateEnemy, type IDungeonInfo } from "../../../Game/Combat/Combat.svelte";
import { Player } from "../../../Game/Player.svelte";
import { EnemyData } from './HometownEnemyData.svelte';

export const HometownDungeonData: IDungeonInfo[] = $state<IDungeonInfo[]>([
	{
		Enemies: [EnemyData[1], EnemyData[1], EnemyData[0], EnemyData[1], EnemyData[2]],
		Rewards: [{ subject: `+${10}`, predicate: ["stats.coins.title"] }],
		title: "locations.hometown.fightbullies.title",
		attribute: "locations.hometown.fightbullies.attribute",
		description: "locations.hometown.fightbullies.description",
		onSuccess: function (): void {
			throw new Error("Function not implemented.");
		},
		sum: 0,
		effects: [{ subject: `-${0.1}`, predicate: ["stats.energy.title", " /s"] }],
		requirements: [
			[
				{ subject: `>${5}`, predicate: ["stats.energy.title"] },
				() => Player.Energy >= 5,
			],
			[
				{ subject: `>${1}`, predicate: ["stats.knowledge.title"] },
				() => Player.Intelligence >= 1,
			],
		],
		CompletionRewards: [
			{ subject: ``, predicate: ["locations.hometown.fightbullies.rewards.0"] },
		],
	},
]);
