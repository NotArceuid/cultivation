import type { IAction } from "../../../Game/Action.svelte";
import { AddStrength, RemoveEnergy, Player } from "../../../Game/Player.svelte";

export const HometownInstantData: IAction[] = $state<IAction[]>([
	{
		onSuccess: function (): void {
			AddStrength(1); // Stronk
			RemoveEnergy(0.75);
		},
		title: "locations.hometown.dopushups.title",
		attribute: "locations.hometown.dopushups.attribute",
		description: "locations.hometown.dopushups.description",
		sum: 0,
		requirements: [
			[
				{ subject: `>${0.75}`, predicate: "stats.energy.title" },
				() => Player.Energy >= 0.75,
			],
		],
		effects: [{ subject: `+${1}`, predicate: "stats.strength.title" }],
	},
]);
