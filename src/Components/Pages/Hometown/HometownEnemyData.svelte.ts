import { type IEnemy } from '../../../Game/Combat/Combat.svelte';

export const EnemyData : IEnemy[] = [
	{
		Health: {
			progress: 35, maxProgress: 35, 
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: 'locations.hometown.fatbully.title',
			attribute: 'locations.hometown.fatbully.attribute',
			description: 'locations.hometown.fatbully.description'
		}
	},
	{
		Health: {
			progress: 25, maxProgress: 25
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: 'locations.hometown.bully.title',
			attribute: 'locations.hometown.bully.attribute',
			description: 'locations.hometown.bully.description'
		}
	},
	{
		Health: {
			progress: 50, maxProgress: 50
		},
		HealthRegen: 0,
		AttackSpeed: 1,
		Abilities: [],
		Info: {
			title: 'locations.hometown.topbully.title',
			attribute: 'locations.hometown.topbully.attribute',
			description: 'locations.hometown.topbully.description'
		}
	}
] 