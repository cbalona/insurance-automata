import { ignite, type Cell, createCell, extinguish } from '$lib/classes/Cell';
import {
	Container,
	ParticleContainer,
	Renderer,
	Ticker,
	Text,
	Texture,
	Graphics,
	Sprite,
	BLEND_MODES
} from 'pixi.js';
import type { Emitter } from '@pixi/particle-emitter';
import { CELL_SIZE, GRID_WIDTH, GRID_HEIGHT, AMBIENT_TEMP } from '$lib/constants';
import { AllowedMaterialsMap, type ObjectName } from '$lib/classes/Object';
import type { MaterialName } from '$lib/classes/Material';
import {
	selectedObjectStore,
	selectedMaterialStore,
	igniteCellsStore,
	stepStore,
	gridStore,
	alteredCellsStore,
	designingInitialStateStore,
	selectedItemStore,
	selectedDefenceStore,
	simulationPendingStore,
	statusStore
} from '$lib/store';
import { get } from 'svelte/store';
import { createFireEffect } from '$lib/classes/graphics/Particle';
import { createTextures } from '$lib/classes/graphics/Textures';
import { ItemParamsMap, type ItemName } from '../Item';
import { type DefenceName, DefenceParamsMap } from '../Defence';

let selectedObject: ObjectName | null;
let selectedMaterial: MaterialName | null;
let selectedItem: ItemName | null;
let selectedDefence: DefenceName | null;
let igniteCells: boolean;

selectedObjectStore.subscribe((object) => {
	selectedObject = object;
	selectedMaterial = object ? AllowedMaterialsMap[object][0] : null;
	selectedMaterialStore.set(selectedMaterial);
});
selectedMaterialStore.subscribe((material) => {
	selectedMaterial = material;
});
selectedItemStore.subscribe((item) => {
	selectedItem = item;
});
selectedDefenceStore.subscribe((defence) => {
	selectedDefence = defence;
});
igniteCellsStore.subscribe((ignite) => {
	igniteCells = ignite;
});

function roundToCellCenter(number: number): number {
	return Math.round((number - CELL_SIZE / 2) / CELL_SIZE) * CELL_SIZE + CELL_SIZE / 2;
}

interface CellCoordinates {
	x: number;
	y: number;
}

function darkenColor(color: number, amount: number): number {
	const clampedAmount = Math.min(amount, 1);
	const factor = 1 - clampedAmount;
	const r = ((color >> 16) & 0xff) * factor;
	const g = ((color >> 8) & 0xff) * factor;
	const b = (color & 0xff) * factor;
	return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

export default class PixiGrid {
	gridContainer: Container;
	particleContainer: ParticleContainer;
	textures: Record<string, Texture | undefined>;
	fireEffects: Map<string, Emitter>;
	renderer: Renderer;
	ticker: Ticker;
	// fpsText: Text;

	// painting
	private initPointer: { x: number; y: number } = { x: 0, y: 0 };
	private isMouseButtonDown = false;
	private tempLine: Graphics | null = null;

	constructor(canvas: HTMLCanvasElement) {
		this.renderer = new Renderer({
			view: canvas,
			width: GRID_WIDTH * CELL_SIZE,
			height: GRID_HEIGHT * CELL_SIZE,
			backgroundColor: 0xffffff,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true
		});

		this.gridContainer = new Container();
		this.particleContainer = new ParticleContainer(100000);
		// this.fpsText = new Text('', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010 });
		this.ticker = new Ticker();
		this.textures = {};
		this.fireEffects = new Map();

		this.init();
	}

	async init(): Promise<void> {
		this.textures = await createTextures();

		this.gridContainer.sortableChildren = true;
		this.createGrid();

		this.particleContainer.zIndex = 9999;
		this.gridContainer.addChild(this.particleContainer);

		this.ticker.add((deltaTime) => {
			this.fireEffects.forEach((fireEffect) =>
				fireEffect.update((deltaTime * this.ticker.elapsedMS) / 2000)
			);
			this.renderer.render(this.gridContainer);
		});
		this.ticker.start();

		// painting
		if (this.renderer && this.renderer.view) {
			(this.renderer.view as HTMLCanvasElement).addEventListener(
				'mousedown',
				this.onMouseDown.bind(this),
				{
					capture: false
				}
			);
			(this.renderer.view as HTMLCanvasElement).addEventListener(
				'mousemove',
				this.onMouseMove.bind(this),
				{
					capture: false
				}
			);
			(this.renderer.view as HTMLCanvasElement).addEventListener(
				'mouseup',
				this.onMouseUp.bind(this),
				{
					capture: false
				}
			);
			(this.renderer.view as HTMLCanvasElement).addEventListener(
				'pointerout',
				this.onPointerOut.bind(this),
				{
					capture: false
				}
			);
		} else {
			// handle the error case
			console.error('renderer or view is not defined');
		}
	}

	getInstance(): Renderer {
		return this.renderer;
	}

	handleInteractions(cells: CellCoordinates[]): void {
		const step = get(stepStore);
		if (step !== 0) {
			statusStore.set('Simulation mode is active. Reset to edit the grid.');
			return;
		}
		const simulationPending = get(simulationPendingStore);
		if (!simulationPending) {
			statusStore.set('Simulation mode is ready. Reset to edit the grid.');
			return;
		}
		const designingInitialState = get(designingInitialStateStore);
		if (!designingInitialState) designingInitialStateStore.set(true);

		// First gather all altered cells
		alteredCellsStore.update((alteredCells: Set<string>) => {
			for (const { x, y } of cells) {
				alteredCells.add(`${x},${y}`);
			}
			return alteredCells;
		});

		// Then update the grid
		gridStore.update((grid: Cell[][]) => {
			for (const { x, y } of cells) {
				const cell = grid[y][x];
				if (igniteCells) {
					grid[y][x] = ignite(grid[y][x]);
				} else if (cell.isBurning && !igniteCells) {
					grid[y][x] = extinguish(grid[y][x]);
					grid[y][x].temperature = AMBIENT_TEMP;
				} else if (selectedObject && selectedMaterial) {
					const newCell = createCell(
						x,
						y,
						selectedObject,
						selectedMaterial,
						cell.temperature,
						cell.isBurning
					);
					grid[y][x] = newCell;
				} else if (selectedItem) {
					const newCell = createCell(
						x,
						y,
						cell.object,
						cell.material,
						cell.temperature,
						cell.isBurning
					);
					newCell.item = selectedItem;
					newCell.value = ItemParamsMap[selectedItem!].value;
					grid[y][x] = newCell;
				} else if (selectedDefence) {
					const newCell = createCell(
						x,
						y,
						cell.object,
						cell.material,
						cell.temperature,
						cell.isBurning
					);
					newCell.defence = selectedDefence ? DefenceParamsMap[selectedDefence!] : null;
					grid[y][x] = newCell;
				} else {
					// Do nothing
				}
			}
			return grid;
		});
	}

	private onMouseDown(event: MouseEvent): void {
		const { offsetX, offsetY } = event;
		this.initPointer = { x: roundToCellCenter(offsetX), y: roundToCellCenter(offsetY) };
		this.tempLine = new Graphics();
		this.tempLine.zIndex = 999;
		this.tempLine.lineStyle(20, 0xffffff, 0.2);
		this.tempLine.moveTo(this.initPointer.x, this.initPointer.y);
		this.tempLine.lineTo(roundToCellCenter(offsetX), roundToCellCenter(offsetY));

		this.gridContainer.addChild(this.tempLine);
		this.isMouseButtonDown = true;
	}

	private onMouseMove(event: MouseEvent): void {
		if (this.isMouseButtonDown) {
			if (this.initPointer === null) return;

			this.tempLine?.clear();
			this.tempLine?.lineStyle(20, 0xffffff, 0.2);
			this.tempLine?.moveTo(this.initPointer.x, this.initPointer.y);

			const { offsetX, offsetY } = event;
			this.tempLine?.lineTo(roundToCellCenter(offsetX), roundToCellCenter(offsetY));
		}
	}

	private onPointerOut(event: MouseEvent): void {
		// Cancel the drawing operation
		this.isMouseButtonDown = false;
		if (this.tempLine) {
			this.gridContainer.removeChild(this.tempLine);
			this.tempLine = null;
		}
	}

	private onMouseUp(event: MouseEvent): void {
		if (!this.isMouseButtonDown) return;

		const { offsetX, offsetY } = event;
		const x1 = this.initPointer.x;
		const y1 = this.initPointer.y;
		const x2 = roundToCellCenter(offsetX);
		const y2 = roundToCellCenter(offsetY);

		const cells: CellCoordinates[] = [];
		for (let x = x1; x <= x2; x += CELL_SIZE) {
			for (let y = y1; y <= y2; y += CELL_SIZE) {
				cells.push({ x: x / CELL_SIZE - 0.5, y: y / CELL_SIZE - 0.5 });
			}
		}
		this.handleInteractions(cells);

		this.isMouseButtonDown = false;
		if (this.tempLine) {
			this.gridContainer.removeChild(this.tempLine);
			this.tempLine = null;
		}
	}

	createCellSprite(x: number, y: number): Container {
		const cell = get(gridStore)[y][x];

		// Create the first sprite
		const cellSprite1 = new Sprite(this.textures[`${cell.object}_${cell.material}`]);
		cellSprite1.width = CELL_SIZE;
		cellSprite1.height = CELL_SIZE;
		cellSprite1.zIndex = 0;

		// Update the tint of the sprite based on the proportion burned of the cell
		const darkenedColor = darkenColor(0xffffff, cell.proportionBurned / 2);
		cellSprite1.tint = darkenedColor;

		const cellContainer = new Container();
		cellContainer.addChild(cellSprite1);

		// Create the second sprite for any items or defences
		if (cell.item) {
			const cellSprite2 = new Sprite(this.textures[`Item_${cell.item}`]);
			cellSprite2.width = CELL_SIZE;
			cellSprite2.height = CELL_SIZE;
			cellSprite2.zIndex = 1;
			cellContainer.addChild(cellSprite2);
		} else if (cell.defence) {
			const cellSprite2 = new Sprite(this.textures[`Defence_${cell.defence.name}`]);
			cellSprite2.width = CELL_SIZE;
			cellSprite2.height = CELL_SIZE;
			cellSprite2.zIndex = 1;
			cellContainer.addChild(cellSprite2);
		}

		// Set the position and other properties of the container
		cellContainer.x = x * CELL_SIZE;
		cellContainer.y = y * CELL_SIZE;
		cellContainer.interactive = true;
		cellContainer.buttonMode = true;
		cellContainer.name = `${x},${y}`;
		const cells: CellCoordinates[] = [{ x, y }];
		cellContainer.on('pointerdown', () => this.handleInteractions(cells));

		return cellContainer;
	}

	updateCellSprite(x: number, y: number): void {
		const oldCellSprite = this.gridContainer.getChildByName(`${x},${y}`);
		if (oldCellSprite) this.gridContainer.removeChild(oldCellSprite);
		const newCellSprite = this.createCellSprite(x, y);
		this.gridContainer.addChild(newCellSprite);
	}

	createGrid(): void {
		const grid = get(gridStore);
		grid.forEach((row, y) => {
			row.forEach((cell, x) => {
				const cellGraphic = this.createCellSprite(x, y);
				this.gridContainer.addChild(cellGraphic);
				const coordinates = `${x},${y}`;
				if (cell.isBurning) {
					if (!this.fireEffects.has(coordinates)) {
						const fireEffect = createFireEffect(this.particleContainer, x, y, cell.temperature);
						this.fireEffects.set(coordinates, fireEffect);
					}
				}
			});
		});
	}

	updateGrid(): void {
		const alteredCells = get(alteredCellsStore);
		alteredCells.forEach((coordinates) => {
			const [x, y] = coordinates.split(',').map((coord) => parseInt(coord));
			this.updateCellSprite(x, y);
			const cell = get(gridStore)[y][x];
			if (cell.isBurning) {
				if (!this.fireEffects.has(coordinates)) {
					const fireEffect = createFireEffect(this.particleContainer, x, y, cell.temperature);
					this.fireEffects.set(coordinates, fireEffect);
				}
			} else {
				const fireEffect = this.fireEffects.get(coordinates);
				if (fireEffect) {
					fireEffect.destroy();
					this.fireEffects.delete(coordinates);
				}
			}
		});
	}

	clearGrid(): void {
		this.gridContainer.removeChildren();
		this.createGrid();
	}
}
