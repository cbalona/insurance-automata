import { writable, type Writable } from 'svelte/store';
import { MaterialParamsMap, type MaterialName, type MaterialParams } from '$lib/classes/Material';

const MaterialParamsStoreMap: Record<MaterialName, Writable<MaterialParams>> = {} as any;

// Create a store for each material
for (const material in MaterialParamsMap) {
	const materialKey = material as MaterialName;
	MaterialParamsStoreMap[materialKey] = writable(MaterialParamsMap[materialKey]);
}

export { MaterialParamsStoreMap };
