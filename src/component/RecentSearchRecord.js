import Component from "../lib/Component.js";
import { fetchCats } from "../api.js";

export default class RecentSearchRecord extends Component {
	$ul;
	state = [];

	constructor({ $container, onUpdateResult, changeInputValue }) {
		super();

		const $wrapper = document.createElement("section");

		this.$ul = document.createElement("ul");
		this.$ul.className = "RecentSearchRecord";

		$wrapper.appendChild(this.$ul);
		$container.appendChild($wrapper);

		const onClick = this.onClick(onUpdateResult);

		this.render();

		this.$ul.addEventListener("click", (e) => {
			if (e.target.tagName.toLowerCase() !== "li")
				return ;

			const keyword = e.target.textContent.slice(1);
			onClick(keyword);
			changeInputValue(keyword);
		});
	}

	onClick(cb) {
		return async (keyword) => {
			try {
				cb({ error: false, loading: true, keyword, lastIdx: 0 });
				const cats = await fetchCats(keyword);

				cb({ cats, error: false, loading: false });
			} catch (err) {
				cb({ error: true, loading: false });
			}
		}
	}

	render() {
		this.$ul.innerHTML = this.state.map(word => `<li>#${word}</li>`).join("");
	}
}
