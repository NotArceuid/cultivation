import type { IInfo, IProgress } from '../Action.svelte';
import type { Abilities } from './Abilities.svelte';

export class Enemy implements IEnemy {
	public Health: IProgress;
	public AttackSpeed: number = $state(0);
	public Abilities: Abilities[] = $state([]);
	public Info: IInfo;
	public HealthRegen: number;
	
	constructor(enemy: IEnemy) {
		this.Health = enemy.Health;
		this.Info = enemy.Info;
		this.Abilities = enemy.Abilities;
		this.HealthRegen = enemy.HealthRegen;
		this.AttackSpeed = enemy.AttackSpeed;

		if (enemy.Health.nextTick == null)
			enemy.Health.nextTick = () => this.RegenerateHealth();
	}

	RegenerateHealth() {
		this.Health.progress = Math.min(
			this.Health.progress + this.HealthRegen,
			this.Health.maxProgress,
		);
	}
}

export interface IEnemy {
	Health: IProgress;
	HealthRegen: number;
	AttackSpeed: number;
	EnemyDied?: () => void;
	Abilities: Abilities[];
	Info: IInfo;
}