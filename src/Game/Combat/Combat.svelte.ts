import { writable } from "svelte/store";
import {
	AddAction,
	type EffectFormat,
	type IProgressAction,
} from "../Action.svelte";
import { Dungeon, ExitDungeon, type IDungeonInfo } from './Dungeon.svelte.ts';

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

export class CombatAction implements IProgressAction {
	progress!: number;
	maxProgress!: number;
	nextTick?: (() => void) | undefined;
	onSuccess: () => void;
	sum: number;
	effects: EffectFormat[];
	requirements?: [EffectFormat, () => boolean][];
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
