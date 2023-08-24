import {
	selectedObjectStore,
	selectedMaterialStore,
	selectedDefenceStore,
	selectedItemStore,
	igniteCellsStore
} from './paletteStore';
import { stepStore, simulationRunningStore, simulationPendingStore, numSimsStore } from './simulationStore';
import { simLogStore } from './simulationStore';
import {
	gridStore,
	alteredCellsStore,
	costStore,
	designingInitialStateStore,
	saveDesignState
} from './gridStore';
import { textureImageStore } from './textureStore';
import { MaterialParamsStoreMap } from './materialParamsStore';
import { writable, type Writable } from 'svelte/store';
import { RISK_PREMIUM_KATEX } from '$lib/constants';

const statusStore: Writable<string> = writable('');
const riskPremiumKatexStore: Writable<string> = writable(RISK_PREMIUM_KATEX);

export {
	selectedObjectStore,
	selectedMaterialStore,
	selectedDefenceStore,
	selectedItemStore,
	igniteCellsStore,
	stepStore,
	simulationRunningStore,
	simulationPendingStore,
	numSimsStore,
	simLogStore,
	designingInitialStateStore,
	gridStore,
	alteredCellsStore,
	costStore,
	saveDesignState,
	textureImageStore,
	MaterialParamsStoreMap,
	statusStore,
	riskPremiumKatexStore
};
