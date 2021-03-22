const isGone = (next) => key => !(key in next);
const isNew = (prev, next) => key => prev[key] !== next[key];

const isObjEqual = (prev, next) => {
	const newKeys = new Set(Object.keys(next));

	for (const key of Object.keys(prev)) {
		if (!(key in next))
			return false;

		if (typeof prev[key] !== typeof next[key])
			return false;

		if (typeof prev[key] === "object") {
			if (!isObjEqual(prev[key], next[key]))
				return false;
		} else if (prev[key] !== next[key]) {
			return false;
		}

		newKeys.delete(key);
	}

	return newKeys.size === 0;
}

const isStateChanged = (prev, next) => {
	const prevType = typeof prev;
	const nextType = typeof next;

	if (prevType !== nextType)
		return true;

	if (prev === null || next == null
		|| prev === undefined || next == undefined)
		return prev !== next;

	if (prevType === "object")
		return !isObjEqual(prev, next);

	return prev !== next;
}

class Component {
	state;

	setState(newState) {
		if (!isStateChanged(this.state, newState))
			return ;
		this.state = newState;
		this.render();
	}

	render() {};
}

export default Component;

export {
	isStateChanged,
};
