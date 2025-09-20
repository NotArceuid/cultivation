import { get } from 'svelte/store';
import type { EffectFormat, IAction, IInfo } from '../Action.svelte';
import { Player } from '../Player.svelte';
import { currentDungeon, isInCombat } from './Combat.svelte';
import { Enemy, type IEnemy } from './Enemy.svelte';

export function DungeonCompleted(dungeon: IDungeonInfo) {}
export interface IDungeonInfo extends IInfo, IAction {
	Waves: IEnemy[][];
	Rewards: EffectFormat[];
	CompletionRewards: EffectFormat[]; //First time completion rewards
}

export function ExitDungeon(dungeon?: IDungeonInfo) {
	isInCombat.set(false);
	dungeon = undefined;
}

export class Dungeon implements IDungeonInfo {
	Waves: Enemy[][]; // The waves is wuthering :)
	Rewards: EffectFormat[];
	CompletionRewards: EffectFormat[];
	title: string;
	attribute: string;
	description: string;
	onSuccess: () => void;
	sum: number = $state(0); // Sum == Waves
	effects: EffectFormat[];
	requirements?: [EffectFormat, () => boolean][];
	CancelAction?: () => void = () => {};
	constructor(dungeon: IDungeonInfo) {
		this.Waves = Dungeon.CreateWaves(dungeon.Waves);
		this.Rewards = dungeon.Rewards;
		this.CompletionRewards = dungeon.CompletionRewards;
		this.title = dungeon.title;
		this.attribute = dungeon.attribute;
		this.description = dungeon.description;
		this.onSuccess = dungeon.onSuccess;
		this.effects = dungeon.effects;
		this.requirements = dungeon.requirements;
		this.CancelAction = () => ExitDungeon(dungeon);
	}

	private static CreateEnemies(enemies: IEnemy[]): Enemy[] {
		return enemies.map((enemy) => CreateEnemy(enemy));
	}

	private static CreateWaves(waves: IEnemy[][]): Enemy[][] {
		return waves.map((wave) => this.CreateEnemies(wave));
	}
}

export function Damage(damage: number, aoeRange: number = 1, player = false) {
	if (player)
	{
		DamagePlayer( damage, aoeRange );
	}
	else
	{
		DamageEnemies( damage );
	}
}

function DamageEnemies( damage: number )
{
	let dungeon = get( currentDungeon );
	let enemies = dungeon.Waves[ dungeon.sum ];
	for ( let i = 0; i < enemies.length; i++ )
	{
		const enemy = enemies[ i ];
		if (enemy.Health.progress <= 0) {
			continue;
		}

		DamageEnemy( enemy, damage );
	}
}

function DamageEnemy( enemy: IEnemy, damage: number)
{
	enemy.Health.progress = Math.min(enemy.Health.progress - damage, enemy.Health.maxProgress)
	if (enemy.Health.progress <= 0)
	{
		if (enemy.EnemyDied)
			enemy.EnemyDied();
	}
}

function DamagePlayer( damage: number, aoe :number )
{
	Player.Health = Math.min( Player.Health - damage, Player.MaxHealth );
	if ( Player.Health <= 0 )
	{
		ExitDungeon( get( currentDungeon ) );
	}
}

export function CreateEnemy(enemy: IEnemy): Enemy {
	let _enemy = new Enemy(enemy);
	return _enemy;
}