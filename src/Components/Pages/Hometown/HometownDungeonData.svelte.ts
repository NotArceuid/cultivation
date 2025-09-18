import type { IDungeonInfo } from "../../../Game/Combat/Combat.svelte";

export const HometownDungeonData: IDungeonInfo[] = $state<IDungeonInfo[]>([
	{
		Enemies: [],
		Rewards: [],
		title: "",
		attribute: "",
		description: "",
		onSuccess: function (): void {
			throw new Error("Function not implemented.");
		},
		sum: 0,
		effects: [],
		requirements: [],
	},
]);
