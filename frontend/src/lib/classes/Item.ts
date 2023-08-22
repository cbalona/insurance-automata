export const ItemEnum = {
	Stove: 'Stove',
	Heater: 'Heater',
	Candle: 'Candle',
	Fireplace: 'Fireplace',
	Barbecue: 'Barbecue',
} as const;

export type ItemName = keyof typeof ItemEnum;

interface ItemParams {
	name: ItemName;
	fireProbability: number;
	value: number;
}

const StoveParams: ItemParams = {
	name: ItemEnum.Stove,
	fireProbability: 0.63,
	value: 800,
};

const HeaterParams: ItemParams = {
	name: ItemEnum.Heater,
	fireProbability: 0.12,
	value: 200,
}

const CandleParams: ItemParams = {
	name: ItemEnum.Candle,
	fireProbability: 0.08,
	value: 5,
}

const FireplaceParams: ItemParams = {
	name: ItemEnum.Fireplace,
	fireProbability: 0.08,
	value: 2000,
}

const BarbecueParams: ItemParams = {
	name: ItemEnum.Barbecue,
	fireProbability: 0.08,
	value: 100,
}

export const ItemParamsMap: Record<ItemName, ItemParams> = {
	Stove: StoveParams,
	Heater: HeaterParams,
	Candle: CandleParams,
	Fireplace: FireplaceParams,
	Barbecue: BarbecueParams,
};
