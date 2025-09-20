import type { IEnemy } from "../../../Game/Combat/Enemy.svelte";

export const EnemyData: IEnemy[] = [
	{
		Health: {
			progress: 35,
			maxProgress: 35,
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: "locations.hometown.enemies.fatbully.title",
			attribute: "locations.hometown.enemies.fatbully.attribute",
			description: "locations.hometown.enemies.fatbully.description",
		},
	},
	{
		Health: {
			progress: 25,
			maxProgress: 25,
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: "locations.hometown.enemies.bully.title",
			attribute: "locations.hometown.enemies.bully.attribute",
			description: "locations.hometown.enemies.bully.description",
		},
	},
	{
		Health: {
			progress: 50,
			maxProgress: 50,
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: "locations.hometown.enemies.bigbully.title",
			attribute: "locations.hometown.enemies.bigbully.attribute",
			description: "locations.hometown.enemies.bigbully.description",
		},
	},
];
