import type { IProgressAction } from "./Action.svelte";
import { ElementTypes, type IElement } from "./Content/Elements";
import { Update } from "./Game";

export const Player = $state<{
	Name: string;
	Magicules: number;
	MaxMagicules: number;
	Gold: number;
	Intelligence: number;
	Strength: number;
	Health: number;
	MaxHealth: number;
	Stars: number;
	Actions: IProgressAction[];
	MaxAction: number;
	Energy: number;
	MaxEnergy: number;
	Elements: IElement[];
}>({
	Name: "Player",
	Magicules: 0,
	MaxMagicules: 100,
	Gold: 10,
	Intelligence: 1,
	Strength: 1,
	Health: 100,
	MaxHealth: 100,
	Stars: 1,
	Actions: [],
	MaxAction: 1,
	Energy: 10,
	MaxEnergy: 10,
	Elements: [
		{ ElementType: ElementTypes.Fire, Level: 0, Progress: 100, Stars: 0 },
		{ ElementType: ElementTypes.Earth, Level: 0, Progress: 0, Stars: 0 },
		{ ElementType: ElementTypes.Ice, Level: 0, Progress: 0, Stars: 0 },
		{ ElementType: ElementTypes.Light, Level: 0, Progress: 0, Stars: 0 },
		{ ElementType: ElementTypes.Lightning, Level: 0, Progress: 0, Stars: 0 },
		{ ElementType: ElementTypes.Water, Level: 0, Progress: 0, Stars: 0 },
		{ ElementType: ElementTypes.Wind, Level: 0, Progress: 0, Stars: 0 },
	],
});

export function AddEnergy(amount: number) {
	Player.Energy = Math.min(Player.Energy + amount, Player.MaxEnergy);
}

export function RemoveEnergy(amount: number) {
	Player.Energy = Math.max(0, Player.Energy - amount);
}

export function AddMagicules(amount: number) {
	Player.Magicules = Math.min(Player.Magicules + amount, Player.MaxMagicules);
}

export function RemoveMagicules(amount: number) {
	Player.Energy = Math.max(0, Player.Energy - amount);
}

export function AddIntelligence(amount: number) {
	Player.Intelligence += amount;
}

export function AddStrength(amount: number) {}

export function AddHealth(amount: number) {
	Player.Health = Math.max(Player.Health + amount, Player.MaxHealth);
}

Update.add(() => {
	// AddEnergy(1);
});
