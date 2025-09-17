import {
	ProgressAction,
	RemoveAction,
	type IAction,
	type IInfo,
} from "../../Game/Action.svelte";
import { _ } from "svelte-i18n";
import {
	AddEnergy,
	AddIntelligence,
	AddStrength,
	Player,
	RemoveEnergy,
} from "../../Game/Player.svelte";

export const HometownProgressData: ProgressAction[] = $state<ProgressAction[]>([
	{
		title: "locations.hometown.rest.title",
		description: "locations.hometown.rest.description",
		effects: [{ value: 1.0, prefix: "+", suffix: "stats.energy.title" }],
		attribute: "locations.hometown.rest.attribute",
		requirements: [],
		sum: 0,
		progress: 0,
		maxProgress: 100,
		onSuccess: function (): void {
			AddEnergy(1);
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
	{
		title: "locations.hometown.goschool.title",
		description: "locations.hometown.goschool.description",
		effects: [
			{ value: 1.0, prefix: "+", suffix: "stats.knowledge.title" },
			{ value: 0.25, prefix: "-", suffix: "stats.energy.title" },
		],
		attribute: "locations.hometown.goschool.attribute",
		requirements: [
			[
				{ value: 0.25, prefix: ">", suffix: "stats.energy.title" },
				() => Player.Energy >= 0.25,
			],
		],
		sum: 0,
		progress: 0,
		maxProgress: 100,
		onSuccess: function (): void {
			AddIntelligence(1);
			RemoveEnergy(0.25);

			this.sum++;
			this.progress = 0;
		},
		nextTick() {
			if (Player.Energy < 0.25) {
				RemoveAction(this.title);
			}
			if (Player.Energy >= 0.25) {
				this.progress += 1;
			}
			if (this.progress >= this.maxProgress) {
				this.onSuccess();
			}
		},
	},
]);

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
				{ prefix: ">", value: 0.75, suffix: "stats.energy.title" },
				() => Player.Energy >= 0.75,
			],
		],
		effects: [{ prefix: "+", value: 1, suffix: "stats.strength.title" }],
	},
]);

export const HometownInfo: IInfo = {
	title: "locations.hometown.title",
	description: "locations.hometown.description",
	attribute: "locations.hometown.attribute",
};
