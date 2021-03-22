import Component from "../lib/Component.js";

export default class SearchResult extends Component {
	$searchResult = null;
	state = {
		loading: false,
		error: false,
		cats: [],
	};
	onClick = null;

	constructor({ $container, onClick }) {
		super();
		this.$searchResult = document.createElement("section");
		this.$searchResult.className = "SearchResult";

		this.onClick = onClick;

		$container.appendChild(this.$searchResult);
		this.render();
	}

	render() {
		this.$searchResult.innerHTML = this.state.cats
			.map(
				cat => `
				<div class="item">
				<img src=${cat.url} alt=${cat.name} />
				</div>
				`
			)
			.join("");

		this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
			$item.addEventListener("click", () => {
				this.onClick(this.data[index]);
			});
		});
	}
}
