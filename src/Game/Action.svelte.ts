import { Update } from "./Game.ts";
import { Player } from "./Player.svelte.ts";

export class ProgressAction implements IAction, IInfo {
	public progress: number = $state(0);
	public maxProgress: number = $state(0);
	public nextTick: () => void;

	constructor(
		title: string,
		description: string,
		attribute: string,
		onSuccess: () => void = () => {},
		requirements: [EffectFormat, () => boolean][] = [],
		effects: EffectFormat[] = [],
		nextTick: () => void = () => {},
		maxProgress: number = 0,
		progress: number = 0,
	) {
		((this.title = title),
			(this.description = description),
			(this.maxProgress = maxProgress));
		this.progress = progress;
		this.attribute = attribute;
		this.nextTick = nextTick;
		this.requirements = requirements;
		this.effects = effects;
		this.onSuccess = onSuccess;
	}

	onSuccess: () => void;
	title: string;
	attribute: string;
	description: string;
	sum: number = $state(0);
	effects: EffectFormat[];
	requirements: [EffectFormat, () => boolean][];
}

export interface IAction extends IInfo {
	onSuccess: () => void;
	title: string;
	attribute: string;
	description: string;
	sum: number;
	effects: EffectFormat[];
	requirements: [EffectFormat, () => boolean][];
}

export interface IInfo {
	title: string;
	attribute: string;
	description: string;
}

export function IsRequirementsMet(data: IAction): boolean {
	return data.requirements.every(([x, e]) => e() == true);
}

export interface EffectFormat {
	prefix: string;
	suffix: string;
	value: number;
}

Update.add(() => {
	Player.Actions.forEach((action) => {
		action.nextTick();
	});
});

export function UseAction(action: IAction) {
	if (IsRequirementsMet(action)) {
		action.onSuccess();
	}
}

export function AddAction(action: ProgressAction): number {
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

export function ActionExists(action: ProgressAction): boolean {
	return Player.Actions.some((x) => x.title == action.title);
}

export function RemoveAction(id: string) {
	let idx = Player.Actions.findIndex((x) => x.title == id);
	if (idx !== -1) {
		Player.Actions.splice(idx, 1);
		Player.Actions = Player.Actions;
	}
}

export function RemoveLastAction(): ProgressAction | null {
	if (Player.Actions.length > 0) {
		const removedAction = Player.Actions.shift();
		Player.Actions = Player.Actions;
		return removedAction || null;
	}
	return null;
}

export function PeekLastAction(): ProgressAction | null {
	return Player.Actions.length > 0 ? Player.Actions[0] : null;
}
