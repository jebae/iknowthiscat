import Component from "../lib/Component.js";

export default class SearchResult extends Component {
	$searchResult = null;
	state = {
		loading: false,
		error: false,
		cats: [],
		keyword: "",
	};
	onClick = null;

	constructor({ $container, onClick }) {
		super();
		this.$searchResult = document.createElement("section");
		this.$searchResult.className = "SearchResult";

		this.onClick = onClick;

		$container.appendChild(this.$searchResult);
		this.render();

		this.$searchResult.addEventListener("click", e => {
			if (e.target.classList.contains("item-Image")) {
				const idx = parseInt(e.target.getAttribute("data-idx"));

				this.onClick({ ...this.state.cats[idx] });
			}
		});
	}

	render() {
		const { error, keyword, cats, loading } = this.state;

		if (error) {
			this.$searchResult.innerHTML = "something went wrong...";
		} else if (loading) {
			this.$searchResult.innerHTML = "Hold on...";
		} else if (keyword != "" && cats.length === 0) {
			this.$searchResult.innerHTML = "no results..."
		} else {
			this.$searchResult.innerHTML = cats
			.map(({ url, name }, i) => `
				<div class="item">
					<img
						class="item-Image"
						loading="lazy"
						src=${url}
						alt=${name}
						data-idx=${i}
					/>
				</div>
			`)
			.join("");
		}
	}
}
