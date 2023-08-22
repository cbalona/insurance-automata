import { createCell, type Cell } from './classes/Cell';
import { MaterialEnum } from './classes/Material';
import { ObjectEnum } from './classes/Object';

export const APP_NAME = '🔥';

export const CELL_SIZE = 20;
export const GRID_HEIGHT: number = 540 / CELL_SIZE;
export const GRID_WIDTH: number = 960 / CELL_SIZE;
export const AMBIENT_TEMP: number = 21 + 273;
export const MAX_TEMP: number = 800 + 273;
export const HEAT_TRANSFER_RATE = 0.25;
export const ROOF_VALUE = 80;
export const ROOF_VOLUME = 0.15;
export const CONTENTS_VALUE = 25;

export const FIRE_LAMBDA = 0.0025;

export const RISK_PREMIUM_KATEX = 'Run~a~simulation~to~see~the~risk~premium';

export function emptyGrid(): Cell[][] {
	const grid = Array.from({ length: GRID_HEIGHT }, (_, y) =>
		Array.from({ length: GRID_WIDTH }, (_, x) =>
			createCell(x, y, ObjectEnum.Earth, MaterialEnum.Grass, AMBIENT_TEMP, false)
		)
	);
	return grid;
}
