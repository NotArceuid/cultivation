import type { EffectFormat, IAction, IInfo } from "../Action.svelte";

export function EnterCombat(dungeon: IDungeonInfo) {}

abstract class Enemies {}

export interface IDungeonInfo extends IInfo, IAction {
	Enemies: Enemies[];
	Rewards: EffectFormat[];
}
