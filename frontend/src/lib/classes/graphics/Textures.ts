import { Texture, Assets } from 'pixi.js';
import { textureImageStore } from '$lib/store/textureStore';

import Defence_Blanket from '$lib/assets/textures/Defence_Blanket.png';
import Defence_Detector from '$lib/assets/textures/Defence_Detector.png';
import Defence_Extinguisher from '$lib/assets/textures/Defence_Extinguisher.png';
import Defence_Sprinkler from '$lib/assets/textures/Defence_Sprinkler.png';

import Item_Barbecue from '$lib/assets/textures/Item_Barbecue.png';
import Item_Candle from '$lib/assets/textures/Item_Candle.png';
import Item_Fireplace from '$lib/assets/textures/Item_Fireplace.png';
import Item_Heater from '$lib/assets/textures/Item_Heater.png';
import Item_Stove from '$lib/assets/textures/Item_Stove.png';

import Door_Metal from '$lib/assets/textures/Door_Metal.png';
import Door_Wood from '$lib/assets/textures/Door_Wood.png';

import Earth_Dirt from '$lib/assets/textures/Earth_Dirt.png';
import Earth_Grass from '$lib/assets/textures/Earth_Grass.png';

import Floor_Carpet from '$lib/assets/textures/Floor_Carpet.png';
import Floor_Tiles from '$lib/assets/textures/Floor_Tiles.png';
import Floor_Wood from '$lib/assets/textures/Floor_Wood.png';

import Wall_Brick from '$lib/assets/textures/Wall_Brick.png';
import Wall_Wood from '$lib/assets/textures/Wall_Wood.png';

import Window_Glass from '$lib/assets/textures/Window_Glass.png';


// we can have a fancy function to loop and fetch all these, but that messes with SvelteKit bundling
// so we'll just hardcode them as there are only a few
export async function createTextures(): Promise<Record<string, Texture>> {
	const textures: Record<string, Texture> = {};
	const texturePaths: Record<string, string> = {};

	textures['Defence_Blanket'] = await Assets.load(Defence_Blanket);
	texturePaths['Defence_Blanket'] = Defence_Blanket;

	textures['Defence_Detector'] = await Assets.load(Defence_Detector);
	texturePaths['Defence_Detector'] = Defence_Detector;

	textures['Defence_Extinguisher'] = await Assets.load(Defence_Extinguisher);
	texturePaths['Defence_Extinguisher'] = Defence_Extinguisher;

	textures['Defence_Sprinkler'] = await Assets.load(Defence_Sprinkler);
	texturePaths['Defence_Sprinkler'] = Defence_Sprinkler;

	textures['Item_Barbecue'] = await Assets.load(Item_Barbecue);
	texturePaths['Item_Barbecue'] = Item_Barbecue;

	textures['Item_Candle'] = await Assets.load(Item_Candle);
	texturePaths['Item_Candle'] = Item_Candle;

	textures['Item_Fireplace'] = await Assets.load(Item_Fireplace);
	texturePaths['Item_Fireplace'] = Item_Fireplace;

	textures['Item_Heater'] = await Assets.load(Item_Heater);
	texturePaths['Item_Heater'] = Item_Heater;

	textures['Item_Stove'] = await Assets.load(Item_Stove);
	texturePaths['Item_Stove'] = Item_Stove;

	textures['Door_Metal'] = await Assets.load(Door_Metal);
	texturePaths['Door_Metal'] = Door_Metal;

	textures['Door_Wood'] = await Assets.load(Door_Wood);
	texturePaths['Door_Wood'] = Door_Wood;

	textures['Earth_Dirt'] = await Assets.load(Earth_Dirt);
	texturePaths['Earth_Dirt'] = Earth_Dirt;

	textures['Earth_Grass'] = await Assets.load(Earth_Grass);
	texturePaths['Earth_Grass'] = Earth_Grass;

	textures['Floor_Carpet'] = await Assets.load(Floor_Carpet);
	texturePaths['Floor_Carpet'] = Floor_Carpet;

	textures['Floor_Tiles'] = await Assets.load(Floor_Tiles);
	texturePaths['Floor_Tiles'] = Floor_Tiles;

	textures['Floor_Wood'] = await Assets.load(Floor_Wood);
	texturePaths['Floor_Wood'] = Floor_Wood;

	textures['Wall_Brick'] = await Assets.load(Wall_Brick);
	texturePaths['Wall_Brick'] = Wall_Brick;

	textures['Wall_Wood'] = await Assets.load(Wall_Wood);
	texturePaths['Wall_Wood'] = Wall_Wood;

	textures['Window_Glass'] = await Assets.load(Window_Glass);
	texturePaths['Window_Glass'] = Window_Glass;

	textureImageStore.set(texturePaths);

	return textures;
}