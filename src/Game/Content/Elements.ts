enum ElementTypes {
	Physical,
	Fire,
	Earth,
	Ice,
	Light,
	Lightning,
	Water,
	Wind,
	Blessing,
	Chaos,
	Curse,
	Healing,
	Nature,
	Poison,
	Shadow,
	Sound,
	Psychic,
	Summon,
	Undead,
	Space,
	Demon,
}

interface IElement {
	ElementType: ElementTypes;
	Level: number;
	Progress: number;
	Stars: number;
}

export { ElementTypes };
export type { IElement };
