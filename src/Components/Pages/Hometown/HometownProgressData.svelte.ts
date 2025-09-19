import {
	RemoveAction,
	type IProgressAction,
} from "../../../Game/Action.svelte";
import {
	AddEnergy,
	AddIntelligence,
	Player,
	RemoveEnergy,
} from "../../../Game/Player.svelte";

export const HometownProgressData: IProgressAction[] = $state<
	IProgressAction[]
>([
	{
		title: "locations.hometown.rest.title",
		description: "locations.hometown.rest.description",
		effects: [{ subject: `+${1}`, predicate: ["stats.energy.title"] }],
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
			{ subject: `+${1}`, predicate: ["stats.knowledge.title"] },
			{ subject: `-${0.25}`, predicate: ["stats.energy.title"] },
		],
		attribute: "locations.hometown.goschool.attribute",
		requirements: [
			[
				{ subject: `>${0.25}`, predicate: ["stats.energy.title"] },
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
