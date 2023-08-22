export const DefenceEnum = {
	Extinguisher: 'Extinguisher',
	Sprinkler: 'Sprinkler',
	Blanket: 'Blanket',
	Detector: 'Detector',
} as const;

export type DefenceName = keyof typeof DefenceEnum;

export interface DefenceParams {
	name: DefenceName;
	fuelReductionRate: number;
	maxTemperature: number;
	alerted: boolean;
	radiusOfEffect: number;
	responseTime: number;
	remainingUses: number;
	chanceOfFailure: number;
}

const ExtinguisherParams: DefenceParams = {
	name: DefenceEnum.Extinguisher,
	fuelReductionRate: 0.75,
	maxTemperature: 800 + 273,
	alerted: false,
	radiusOfEffect: 3,
	responseTime: 2,
	remainingUses: 10,
	chanceOfFailure: 0.05,
}

const SprinklerParams: DefenceParams = {
	name: DefenceEnum.Sprinkler,
	fuelReductionRate: 0.9,
	maxTemperature: 700 + 273,
	alerted: false,
	radiusOfEffect: 5,
	responseTime: 3,
	remainingUses: -1,
	chanceOfFailure: 0.01,
}

const BlanketParams: DefenceParams = {
	name: DefenceEnum.Blanket,
	fuelReductionRate: 1,
	maxTemperature: 500 + 273,
	alerted: false,
	radiusOfEffect: 3,
	responseTime: 1,
	remainingUses: 1,
	chanceOfFailure: 0.25,
}

const DetectorParams: DefenceParams = {
	name: DefenceEnum.Detector,
	fuelReductionRate: 1,
	maxTemperature: 2000 + 273,
	alerted: false,
	radiusOfEffect: 8,
	responseTime: 10,
	remainingUses: -1,
	chanceOfFailure: 0.01,
}

export const DefenceParamsMap: Record<DefenceName, DefenceParams> = {
	Extinguisher: ExtinguisherParams,
	Sprinkler: SprinklerParams,
	Blanket: BlanketParams,
	Detector: DetectorParams,
};
