import { MaterialEnum, type MaterialName } from './Material';

export const ObjectEnum = {
	Earth: 'Earth',
	Floor: 'Floor',
	Wall: 'Wall',
	Door: 'Door',
	Window: 'Window',
} as const;
export type ObjectName = keyof typeof ObjectEnum;

// below we do everything relative to a 1x1x3 cell
// base volume is 3: 1x1x3:
// /____\ <- top
// |    | <- middle
// |____| <- bottom

// roof is always the same volume and material for all cells
// roof is not modelled directly, if the cell is burning, 
// it's assumed that the roof is burning too

// floor cells burn based on the roof
// cost is calculated using a constant roof value
// we also assume some volume for contents made of wood
// like furniture, etc.

// eg tile floor would have 0.15 * 500 = 75 volume of wood
// for the "contents" and then 0.25 * 500 = 125 voume of 
// wood for the roof structure

interface ObjectParams {
	name: ObjectName;
	volume: number;
	contributesToCost: boolean;
	baseValue: number;
}

const EarthParams: ObjectParams = {
	name: ObjectEnum.Earth,
	volume: 0.2,
	contributesToCost: false,
	baseValue: 0
};

const FloorParams: ObjectParams = {
	name: ObjectEnum.Floor,
	volume: 0.25,
	contributesToCost: true,
	baseValue: 100
};

const WallParams: ObjectParams = {
	name: ObjectEnum.Wall,
	volume: 2,
	contributesToCost: true,
	baseValue: 100
};

const DoorParams: ObjectParams = {
	name: ObjectEnum.Door,
	volume: 0.25,
	contributesToCost: true,
	baseValue: 50
};

const WindowParams: ObjectParams = {
	name: ObjectEnum.Window,
	volume: 0.05,
	contributesToCost: true,
	baseValue: 50
};
	

export const AllowedMaterialsMap: Record<ObjectName, MaterialName[]> = {
	Earth: [MaterialEnum.Dirt, MaterialEnum.Grass],
	Wall: [MaterialEnum.Brick, MaterialEnum.Wood],
	Floor: [MaterialEnum.Wood, MaterialEnum.Tiles, MaterialEnum.Carpet],
	Door: [MaterialEnum.Wood, MaterialEnum.Metal],
	Window: [MaterialEnum.Glass],
};

export const ObjectParamsMap: Record<ObjectName, ObjectParams> = {
	Earth: EarthParams,
	Floor: FloorParams,
	Wall: WallParams,
	Door: DoorParams,
	Window: WindowParams,
};
