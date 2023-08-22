import type { Writable } from 'svelte/store';
import { ObjectEnum, type ObjectName } from '$lib/classes/Object';
import { writable } from 'svelte/store';
import { type MaterialName, MaterialEnum } from '$lib/classes/Material';
import type { ItemName } from '$lib/classes/Item';
import type { DefenceName } from '$lib/classes/Defence';

export const selectedObjectStore: Writable<ObjectName | null> = writable(ObjectEnum.Floor);
export const selectedMaterialStore: Writable<MaterialName | null> = writable(MaterialEnum.Wood);
export const selectedItemStore: Writable<ItemName | null> = writable(null);
export const selectedDefenceStore: Writable<DefenceName | null> = writable(null);
export const igniteCellsStore: Writable<boolean> = writable(false);
