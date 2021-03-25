import Component from "../lib/Component.js";

export default class RecentSearchRecord extends Component {
	$ul;
	state = [];

	constructor({ $container }) {
		super();

		const $wrapper = document.createElement("section");

		this.$ul = document.createElement("ul");
		this.$ul.className = "RecentSearchRecord";

		$wrapper.appendChild(this.$ul);
		$container.appendChild($wrapper);

		this.render();

		this.$ul.addEventListener("click", (e) => {
			if (e.target.tagName === "li") {
				e.target.textContent;
			}
		});
	}

	render() {
		this.$ul.innerHTML = this.state.map(word => `<li>${word}</li>`);
	}
}
