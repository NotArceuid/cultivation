import { Update } from "./Game.ts";
import { Player } from "./Player.svelte.ts";

export type IProgressAction = IProgress & IAction & IInfo;
export type IProgressInfo = IProgress & IInfo;

export interface IProgress {
	progress: number;
	maxProgress: number;
	nextTick?: () => void;
}

export interface IAction extends IInfo {
	onSuccess: () => void;
	sum: number;
	effects: EffectFormat[];
	requirements?: [EffectFormat, () => boolean][];
	CancelAction?: () => void;
}

export interface IInfo {
	title: string;
	attribute: string;
	description: string;
}

export function IsRequirementsMet(data: IAction): boolean {
	if (!data.requirements)
		return false;
	return data.requirements.every(([_, e]) => e() == true);
}

export interface EffectFormat {
	subject: string;
	predicate: string[];
}

Update.add(() => {
	Player.Actions.forEach((action) => {
		if (action.nextTick != null) action.nextTick();
	});
});

export function UseAction(action: IAction) {
	if (IsRequirementsMet(action)) {
		action.onSuccess();
	}
}

export function AddAction(action: IProgressAction): number {
	if (ActionExists(action)) {
		return -1;
	}

	if (Player.Actions.length >= Player.MaxAction) {
		RemoveLastAction();
	}

	Player.Actions.unshift(action);
	Player.Actions = Player.Actions;
	return 0;
}

export function ActionExists(action: IProgressAction): boolean {
	return Player.Actions.some((x) => x.title == action.title);
}

export function RemoveAction(id: string) {
	let idx = Player.Actions.findIndex((x) => x.title == id);
	if (idx !== -1) {
		Player.Actions.splice(idx, 1);
		Player.Actions = Player.Actions;
	}
}

export function RemoveLastAction(): IProgressAction | null {
	if (Player.Actions.length > 0) {
		const removedAction = Player.Actions.shift();
		Player.Actions = Player.Actions;
		return removedAction || null;
	}
	return null;
}

export function PeekLastAction(): IProgressAction | null {
	return Player.Actions.length > 0 ? Player.Actions[0] : null;
}
