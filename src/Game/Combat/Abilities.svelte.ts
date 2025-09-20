import { get } from "svelte/store";
import { type EffectFormat, type IProgressAction } from "../Action.svelte";
import { ElementTypes } from "../Content/Elements";
import { Player } from "../Player.svelte";
import { Damage } from "./Dungeon.svelte";

export abstract class Ability implements IAbilityInfo {
	title: string;
	ability: AbilityEnum;
	attribute: string;
	description: string;
	elementType: ElementTypes;

	constructor(
		ability: AbilityEnum,
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
		this.ability = ability;
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
	ability: AbilityEnum;
	elementType: ElementTypes;
	player?: boolean;
}

export enum AbilityEnum {
	punch,
}

export const AbilityData: IAbilityInfo[] = [
	{
		ability: AbilityEnum.punch,
		title: "abilities.punch.title",
		description: "abilities.punch.description",
		effects: [{ subject: `${5} `, predicate: ["combat.damage"] }],
		elementType: ElementTypes.Physical,
		attribute: "abilities.punch.attribute",
		sum: 0,
		progress: 0,
		maxProgress: 100,
		onSuccess: function (): void {
			Damage(5 * GetDamageMultiplier());

			this.sum++;
			this.progress = 0;
		},
		nextTick() {
			this.progress += 1;
			if (this.progress >= this.maxProgress) {
				this.onSuccess();
			}
		},
	},
];

function GetDamageMultiplier(): number {
	return Player.Strength;
}

function GetAbilities(elementType: ElementTypes): IAbilityInfo[] {
	return AbilityData.filter((x) => x.elementType == elementType);
}

export function GetOwnedAbilities(elementType: ElementTypes): IAbilityInfo[] {
	return GetAbilities(elementType).filter((x) =>
		Player.Abilities.includes(x.ability),
	);
}

export function GetOwnedElements(): ElementTypes[] {
    const ownedElements = new Set<ElementTypes>();
    
    // Get all abilities across all element types that player owns
    Player.Abilities.forEach(abilityEnum => {
        // You might need a way to map Ability enum to element type
        // This would require either:
        // 1. A lookup table/method, or
        // 2. Iterating through all element types to find which one contains this ability
        Object.values(ElementTypes)
            .filter(value => typeof value === 'number')
            .forEach(elementType => {
                const abilitiesOfType = GetAbilities(elementType as ElementTypes);
                if (abilitiesOfType.some(ability => ability.ability === abilityEnum)) {
                    ownedElements.add(elementType as ElementTypes);
                }
            });
    });
    
    return Array.from(ownedElements);
}
