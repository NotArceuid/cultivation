import { writable } from 'svelte/store';
import type { EffectFormat, IAction, IInfo, IProgress, IProgressAction, IProgressInfo } from "../Action.svelte";
import type { ElementTypes } from '../Content/Elements';

export let isInCombat = writable<boolean>(false);
export let currentDungeon = writable<Dungeon>({
	Enemies: [],
	Rewards: [],
	CompletionRewards: [],
	title: '',
	attribute: '',
	description: '',
	onSuccess: function (): void
	{
		throw new Error( 'Function not implemented.' );
	},
	sum: 0,
	effects: [],
	requirements: []
})

export function EnterCombat(dungeon: IDungeonInfo) {
	isInCombat.set(true);
	currentDungeon.set(new Dungeon(dungeon)); 

	
}

class Dungeon implements IDungeonInfo {
	Enemies: Enemy[];
	Rewards: EffectFormat[];
	CompletionRewards: EffectFormat[];
	title: string;
	attribute: string;
	description: string;
	onSuccess: () => void;
	sum: number = $state(0)
	effects: EffectFormat[];
	requirements: [ EffectFormat, () => boolean ][];

	constructor(dungeon: IDungeonInfo) {
		this.Enemies = CreateEnemies(dungeon.Enemies);
		this.Rewards = dungeon.Rewards;
		this.CompletionRewards = dungeon.CompletionRewards;
		this.title = dungeon.title;
		this.attribute = dungeon.attribute;
		this.description = dungeon.description;
		this.onSuccess = dungeon.onSuccess;
		this.sum = dungeon.sum;
		this.effects = dungeon.effects;
		this.requirements = dungeon.requirements;
	}
}
export function CreateEnemy(enemy: IEnemy): Enemy {
	let _enemy = new Enemy(enemy);
	return _enemy;
}

export function CreateEnemies(enemies: IEnemy[]): Enemy[] {
	let col: Enemy[] = [];
	for (let i = 0; i < enemies.length; i++) {
		const element = CreateEnemy(enemies[i]);
		col.push(element)
	}
	return col;
}

export class Enemy implements IEnemy {
	public Health: IProgress;
	public AttackSpeed: number = $state(0);
	public Abilities: Abilities[] = $state([]);
	public Info: IInfo;
	public HealthRegen: number;

	constructor(enemy: IEnemy) 
	{
		this.Health = enemy.Health;
		this.Info = enemy.Info;
		this.Abilities = enemy.Abilities;
		this.HealthRegen = enemy.HealthRegen;
		this.AttackSpeed = enemy.AttackSpeed;

		if (enemy.Health.nextTick == null)
			enemy.Health.nextTick = () => this.RegenerateHealth()
	}
	
	RegenerateHealth()
	{
		this.Health.progress = Math.min(this.Health.progress + this.HealthRegen, this.Health.maxProgress);
	} 
}

export interface IEnemy {
	Health: IProgress;
	HealthRegen: number;
	AttackSpeed: number;
	Abilities: Abilities[];
	Info: IInfo;
} 

abstract class Abilities implements IProgressAction {
	title: string;
	attribute: string;
	description: string;
	elementType : ElementTypes;

	constructor(elementType: ElementTypes, title: string, attribute : string, description: string, progress: number, maxProgress: number, nextTick: () => void, onSuccess: () => void,
			effects: EffectFormat[], sum: number, requirements: [ EffectFormat, () => boolean ][])
	{
		this.elementType = elementType;
		this.title = title;
		this.attribute = attribute;
		this.description = description;
		this.progress = progress;
		this.maxProgress = maxProgress;
		this.nextTick = nextTick;
		this.onSuccess = onSuccess;
		this.effects = effects;
		this.sum = sum;
		this.requirements = requirements;
	}

	public progress: number = $state(0);
	public maxProgress: number = $state(0);
	public nextTick: () => void;
	onSuccess: () => void;
	sum: number;
	effects: EffectFormat[];
	requirements: [ EffectFormat, () => boolean ][];
}

export interface IDungeonInfo extends IInfo, IAction {
	Enemies: IEnemy[];
	Rewards: EffectFormat[];
	CompletionRewards: EffectFormat[]; //First time completion rewards
}
