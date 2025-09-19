import { writable } from "svelte/store";
import {
	AddAction,
	RemoveAction,
	type EffectFormat,
	type IAction,
	type IInfo,
	type IProgress,
	type IProgressAction,
	type IProgressInfo,
} from "../Action.svelte";
import type { ElementTypes } from "../Content/Elements";
import { InvokeableEvent } from "../Shared/Events";

export let isInCombat = writable<boolean>(false);
export let currentDungeon = writable<Dungeon>({
	Waves: [[]],
	Rewards: [],
	CompletionRewards: [],
	title: "",
	attribute: "",
	description: "",
	onSuccess: function (): void {
		throw new Error("Function not implemented.");
	},
	sum: 0,
	effects: [],
	requirements: [],
});

export function EnterCombat(dungeon: IDungeonInfo) {
	isInCombat.set(true);
	currentDungeon.set(new Dungeon(dungeon));
	AddAction(new CombatAction(dungeon));
}

export function DungeonCompleted(dungeon: IDungeonInfo) {}

export function ExitDungeon(dungeon?: IDungeonInfo) {
	isInCombat.set(false);
	dungeon = undefined;
	console.log("eqweqweqwwe");
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
	requirements: [EffectFormat, () => boolean][];
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
export function CreateEnemy(enemy: IEnemy): Enemy {
	let _enemy = new Enemy(enemy);
	return _enemy;
}

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
	Abilities: Abilities[];
	Info: IInfo;
}

abstract class Abilities implements IProgressAction {
	title: string;
	attribute: string;
	description: string;
	elementType: ElementTypes;

	constructor(
		elementType: ElementTypes,
		title: string,
		attribute: string,
		description: string,
		progress: number,
		maxProgress: number,
		nextTick: () => void,
		onSuccess: () => void,
		effects: EffectFormat[],
		sum: number,
		requirements: [EffectFormat, () => boolean][],
	) {
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
	requirements: [EffectFormat, () => boolean][];
}

export interface IDungeonInfo extends IInfo, IAction {
	Waves: IEnemy[][];
	Rewards: EffectFormat[];
	CompletionRewards: EffectFormat[]; //First time completion rewards
}

export class CombatAction implements IProgressAction {
	progress!: number;
	maxProgress!: number;
	nextTick?: (() => void) | undefined;
	onSuccess: () => void;
	sum: number;
	effects: EffectFormat[];
	requirements: [EffectFormat, () => boolean][];
	title: string;
	attribute: string;
	description: string;
	CancelAction?: (() => void) | undefined;
	constructor(dungeonInfo: IDungeonInfo) {
		this.title = dungeonInfo.title;
		this.attribute = dungeonInfo.attribute;
		this.description = dungeonInfo.description;
		this.onSuccess = dungeonInfo.onSuccess;
		this.effects = dungeonInfo.effects;
		this.sum = dungeonInfo.sum;
		this.requirements = dungeonInfo.requirements;

		this.CancelAction = () => {
			ExitDungeon(dungeonInfo);
		};
	}
}
