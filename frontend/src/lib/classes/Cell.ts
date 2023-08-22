import { produce } from 'immer';
import { type ObjectName, ObjectParamsMap, ObjectEnum } from '$lib/classes/Object';
import { type MaterialName, MaterialParamsMap, MaterialEnum } from '$lib/classes/Material';
import type { ItemName } from '$lib/classes/Item';
import type { DefenceParams } from '$lib/classes/Defence';
import {
	CONTENTS_VALUE,
	MAX_TEMP,
	ROOF_VALUE,
	ROOF_VOLUME
} from '$lib/constants';

export interface Cell {
	x: number;
	y: number;
	object: ObjectName;
	material: MaterialName;
	temperature: number; // K
	initialFuel: number; // kg
	fuel: number; // kg
	isBurning: boolean;
	proportionBurned: number;
	value: number;
	item?: ItemName | null;
	defence?: DefenceParams | null;
}

export function createCell(
	x: number,
	y: number,
	object: ObjectName,
	material: MaterialName,
	temperature: number,
	isBurning: boolean
): Cell {
	const volume = ObjectParamsMap[object].volume;
	const density = MaterialParamsMap[material].density;

	let initialFuel = getInitialFuel(volume, density);
	if (object === ObjectEnum.Floor) {
		initialFuel += ROOF_VOLUME * MaterialParamsMap[MaterialEnum.Wood].density;
	}

	const cell: Cell = {
		x,
		y,
		object,
		material,
		temperature,
		isBurning,
		item: null,
		defence: null,
		initialFuel: initialFuel,
		fuel: initialFuel,
		proportionBurned: 0,
		value: ObjectParamsMap[object].contributesToCost
			? ObjectParamsMap[object].baseValue * MaterialParamsMap[material].baseValueMultiplier +
			  ROOF_VALUE +
			  CONTENTS_VALUE
			: 0
	};
	return cell;
}

function getInitialFuel(volume: number, density: number): number {
	return volume * density;
}

export const ignite = produce((draftCell: Cell) => {
	if (draftCell.fuel <= 0) return draftCell;
	draftCell.temperature = Math.max(
		MaterialParamsMap[draftCell.material].combustionPoint,
		draftCell.temperature
	);
	draftCell.isBurning = true;
	return draftCell;
});

export const extinguish = produce((draftCell: Cell) => {
	if (!draftCell.isBurning) return draftCell;
	draftCell.isBurning = false;
	return draftCell;
});

export const calculateNewTemp = (
	currentTemp: number,
	deltaTemp: number,
	heatResistance: number
): number => {
	const proportionToMax = currentTemp / MAX_TEMP;
	const adjustedDeltaTemp = deltaTemp * (1 - proportionToMax);
	const temperatureChange = adjustedDeltaTemp * (1 - heatResistance);
	return currentTemp + temperatureChange;
};
