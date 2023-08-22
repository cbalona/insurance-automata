import type { ParticleContainer } from 'pixi.js';
import { Texture } from 'pixi.js';
import { Emitter, upgradeConfig } from '@pixi/particle-emitter';
import { CELL_SIZE, MAX_TEMP } from '$lib/constants';
import particle from '$lib/assets/particle.png';

export function createFireEffect(container: ParticleContainer, x: number, y: number, temperature: number) {
	const scaleFactor = Math.min(0.7, temperature / (MAX_TEMP * 1.5));
	const emitter: Emitter = new Emitter(container, {
		lifetime: {
			min: 0.2,
			max: 0.4
		},
		frequency: 0.02,
		emitterLifetime: -1,
		maxParticles: 25,
		addAtBack: true,
		pos: { x: x * CELL_SIZE + CELL_SIZE / 2, y: y * CELL_SIZE + CELL_SIZE / 2 },
		behaviors: [
			{
				type: 'alpha',
				config: {
					alpha: {
						list: [
							{
								time: 0,
								value: 1
							},
							{
								time: 1,
								value: 0
							}
						]
					}
				}
			},
			{
				type: 'moveSpeed',
				config: {
					speed: {
						list: [
							{
								time: 0,
								value: 100
							},
							{
								time: 1,
								value: 10
							}
						]
					},
					minMult: 1
				}
			},
			{
				type: 'scale',
				config: {
					scale: {
						list: [
							{
								time: 0,
								value: scaleFactor
							},
							{
								time: 1,
								value: 0.01
							}
						]
					},
					minMult: 0.5
				}
			},
			{
				type: 'color',
				config: {
					color: {
						list: [
							{
								time: 0,
								value: '#f56200'
							},
							{
								time: 1,
								value: '#262626'
							}
						]
					}
				}
			},
			{
				type: 'rotation',
				config: {
					accel: 0,
					minSpeed: -3,
					maxSpeed: 0,
					minStart: 230,
					maxStart: 300
				}
			},
			{
				type: 'blendMode',
				config: {
					blendMode: 'overlay'
				}
			},
			{
				type: 'spawnPoint',
				config: {}
			},
			{ type: 'textureSingle', config: { texture: Texture.from(particle) } }
		]
	});
	// { type: 'moveSpeedStatic', config: { min: 120, max: 121 } }

	emitter.emit = true;
	return emitter;
}
