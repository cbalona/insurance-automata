simulation-engine:
	cd wasm/simulation-engine && wasm-pack build --target web
# sudo apt install jq
	jq '. + { "type": "module" }' wasm/simulation-engine/pkg/package.json > tmp_package.json && mv tmp_package.json wasm/simulation-engine/pkg/package.json
	rm -rf frontend/src/lib/simulation-engine
	mkdir -p frontend/src/lib/simulation-engine
	cp -r wasm/simulation-engine/pkg/* frontend/src/lib/simulation-engine

check:
	cd wasm/simulation-engine && cargo check