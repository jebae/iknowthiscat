import { test } from "@jest/globals";
import { isStateChanged } from "./Component";

describe("isStateChanged", () => {
	test("primitive type same", () => {
		expect(isStateChanged("string", "string")).toEqual(false);
		expect(isStateChanged(42, 42)).toEqual(false);
		expect(isStateChanged(true, true)).toEqual(false);
		expect(isStateChanged(null, null)).toEqual(false);
		expect(isStateChanged(undefined, undefined)).toEqual(false);
	});

	test("primitive type different", () => {
		expect(isStateChanged("string", "str")).toEqual(true);
		expect(isStateChanged(42, 31)).toEqual(true);
		expect(isStateChanged(true, false)).toEqual(true);
	});

	test("type different", () => {
		expect(isStateChanged("string", 42)).toEqual(true);
		expect(isStateChanged(42, true)).toEqual(true);
		expect(isStateChanged(null, undefined)).toEqual(true);
		expect(isStateChanged({}, 42)).toEqual(true);
	});

	test("object same", () => {
		const a = {
			name: "woody",
			material: "fabric",
		};
		const b = {
			name: "woody",
			material: "fabric",
		};

		expect(isStateChanged(a, b)).toEqual(false);
	});

	test("object different with value", () => {
		const a = {
			name: "buzz",
			material: "fabric",
		};
		const b = {
			name: "woody",
			material: "fabric",
		};

		expect(isStateChanged(a, b)).toEqual(true);
	});

	test("object different with key gone", () => {
		const a = {
			name: "buzz",
			material: "fabric",
		};
		const b = {
			name: "buzz",
		};

		expect(isStateChanged(a, b)).toEqual(true);
	});

	test("object different with new key", () => {
		const a = {
			name: "buzz",
		};
		const b = {
			name: "buzz",
			material: "fabric",
		};

		expect(isStateChanged(a, b)).toEqual(true);
	});

	test("object same with nested", () => {
		const a = {
			name: "woody",
			material: "fabric",
			friends: [ "buzz", "andy", "slinky", "bo" ],
		};
		const b = {
			name: "woody",
			material: "fabric",
			friends: [ "buzz", "andy", "slinky", "bo" ],
		};

		expect(isStateChanged(a, b)).toEqual(false);
	});

	test("object different with nested", () => {
		const a = {
			name: "woody",
			material: "fabric",
			friends: [ "buzz", "andy", "alex", "bo" ],
		};
		const b = {
			name: "woody",
			material: "fabric",
			friends: [ "buzz", "andy", "slinky", "bo" ],
		};

		expect(isStateChanged(a, b)).toEqual(true);
	});

	test("object same with function", () => {
		const f = () => {};

		const a = {
			f,
		};
		const b = {
			f,
		};

		expect(isStateChanged(a, b)).toEqual(false);
	});

	test("object different with function", () => {
		const a = {
			f: () => {},
		};
		const b = {
			f: () => {},
		};

		expect(isStateChanged(a, b)).toEqual(true);
	});
})
