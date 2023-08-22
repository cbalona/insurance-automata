export const MaterialEnum = {
	Dirt: 'Dirt',
	Grass: 'Grass',
	Wood: 'Wood',
	Brick: 'Brick',
	Tiles: 'Tiles',
	Carpet: 'Carpet',
	Metal: 'Metal',
	Glass: 'Glass'
} as const;
export type MaterialName = keyof typeof MaterialEnum;

// tiles and carpet are considered under roof floor materials
// so we give them wood's values as we assume the roof is burning
// and made of wood

export interface MaterialParams {
	name: string;
	density: number;
	fuelConsumptionRate: number;

	heatValue: number;
	specificHeat: number;
	combustionPoint: number;

	heatDecreaseRate: number;

	baseValueMultiplier: number;
}

const DirtParams: MaterialParams = {
	name: MaterialEnum.Dirt,
	density: 1000,
	fuelConsumptionRate: 0.0,
	heatValue: 0,
	specificHeat: 1.5,
	combustionPoint: 2000 + 273,
	heatDecreaseRate: 0.05,
	baseValueMultiplier: 0
};

const WoodParams: MaterialParams = {
	name: MaterialEnum.Wood,
	density: 500,
	fuelConsumptionRate: 0.01,
	heatValue: 15000,
	specificHeat: 2000,
	combustionPoint: 400 + 273,
	heatDecreaseRate: 0.1,
	baseValueMultiplier: 0.9
};

const GrassParams: MaterialParams = {
	name: MaterialEnum.Grass,
	density: 100,
	fuelConsumptionRate: 0.1,
	heatValue: 10000,
	specificHeat: 1000,
	combustionPoint: 200 + 273,
	heatDecreaseRate: 0.2,
	baseValueMultiplier: 0
};

const BrickParams: MaterialParams = {
	name: MaterialEnum.Brick,
	density: 2000,
	fuelConsumptionRate: 0.0,
	heatValue: 0,
	specificHeat: 3.0,
	combustionPoint: 2000 + 273,
	heatDecreaseRate: 0.05,
	baseValueMultiplier: 1
};

const TileParams: MaterialParams = {
	...WoodParams // floors burn based on roof made of wood
};

const CarpetParams: MaterialParams = {
	...WoodParams // floors burn based on roof made of wood
};

const MetalParams: MaterialParams = {
	name: MaterialEnum.Metal,
	density: 8000,
	fuelConsumptionRate: 0.0,
	heatValue: 0,
	specificHeat: 3.0,
	combustionPoint: 2000 + 273,
	heatDecreaseRate: 0.2,
	baseValueMultiplier: 1
};

const GlassParams: MaterialParams = {
	name: MaterialEnum.Glass,
	density: 2500,
	fuelConsumptionRate: 0.0,
	heatValue: 0,
	specificHeat: 3.0,
	combustionPoint: 2000 + 273,
	heatDecreaseRate: 0.05,
	baseValueMultiplier: 0.5
};

export const MaterialParamsMap: Record<MaterialName, MaterialParams> = {
	Dirt: DirtParams,
	Wood: WoodParams,
	Grass: GrassParams,
	Brick: BrickParams,
	Tiles: TileParams,
	Carpet: CarpetParams,
	Metal: MetalParams,
	Glass: GlassParams
};
