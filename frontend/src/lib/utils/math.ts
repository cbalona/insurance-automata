export function histogramData(data: number[]): { binData: number[]; binLabels: string[] } {
	const min = Math.min(...data);
	const max = Math.max(...data);
	const dataCount = data.length;

	let binCount;

	binCount = Math.floor(Math.sqrt(dataCount)); // fixed width bins thereafter (using the square root rule)

	const binSize = (max - min) / binCount;
	const binData = Array(binCount).fill(0);
	const binLabels = Array(binCount)
		.fill('')
		.map(
			(_, index) =>
				`${Math.round(min + index * binSize)} - ${Math.round(min + (index + 1) * binSize)}`
		);
	for (const datum of data) {
		let binIndex = Math.floor((datum - min) / binSize);
		binIndex = binIndex === binCount ? binIndex - 1 : binIndex; // ensure we don't exceed the bin array length
		binData[binIndex]++;
	}

	return { binData, binLabels };
}
