import Component from "../lib/Component.js";
import { fetchRandomCats } from "../api.js";

export default class RandomFetchBtn extends Component {
	$button;

	constructor({ $container, onUpdateResult }) {
		super();
		this.$button = document.createElement("button");
		this.$button.className = "RandomFetchBtn";
		this.$button.appendChild(document.createTextNode("😸"));

		$container.appendChild(this.$button);

		const onClick = this.onClick(onUpdateResult);

		this.$button.addEventListener("click", onClick);
	}

	onClick(cb) {
		return async () => {
			try {
				cb({ error: false, loading: true, lastIdx: 0 });
				const cats = await fetchRandomCats();

				cb({ cats, error: false, loading: false });
			} catch (err) {
				cb({ error: true, loading: false });
			}
		}
	}
}
