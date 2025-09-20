import { get } from 'svelte/store';
import { type EffectFormat, type IProgressAction } from '../Action.svelte';
import { ElementTypes } from '../Content/Elements';
import { Player } from '../Player.svelte';
import { Damage } from './Dungeon.svelte';

export abstract class Abilities implements IAbilityInfo {
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

export interface IAbilityInfo extends IProgressAction {
	elementType: ElementTypes;
	player? : boolean;
}

export const AbilityData: IAbilityInfo[] = [ {
		title: "abilities.punch.title",
		description: "abilities.punch.description",
		effects: [
			{ subject: `${5} `, predicate: ["combat.damage"] },
		],
		elementType: ElementTypes.Physical,
		attribute: "abilities.punch.attribute",
		sum: 0,
		progress: 0,
		maxProgress: 100,
		onSuccess: function (): void {
			Damage(5 * GetDamageMultiplier())			

			this.sum++;
			this.progress = 0;
		},
		nextTick() {
			this.progress += 1;
			if (this.progress >= this.maxProgress) {
				this.onSuccess();
			}
		},	
	
} ]

function GetDamageMultiplier(): number {
	return Player.Strength;
}