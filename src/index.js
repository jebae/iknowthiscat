import { renderDOM, createElement, useState } from "./lib/react.js";

function Hey(props) {
	return createElement("p", {}, "it's odd");
}

function Component(props) {
	const [ count, setCount ] = useState(0);

	return createElement(
		"div", {},
		"hello iknowthiscat",
		createElement(
			"button", {
				onClick: () => setCount(prev => prev + 1),
			},
			"button"
		),
		`${count}`,
		count % 2 === 1 ? createElement(Hey) : ""
	);
}

renderDOM(
	createElement(Component, {}),
	document.getElementById("app")
);
