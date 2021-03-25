import Component from "../lib/Component.js";
import SearchInput from "./SearchInput.js";
import RandomFetchBtn from "./RandomFetchBtn.js";

export default class SearchSection extends Component {
	section;

	constructor({ $container, onUpdateResult }) {
		super();

		this.section = document.createElement("section");
		this.section.className = "SearchSection";

		this.searchInput = new SearchInput({
			$container: this.section,
			onUpdateResult,
		});

		this.randomFetchBtn = new RandomFetchBtn({
			$container: this.section,
			onUpdateResult,
		});

		$container.appendChild(this.section);
	}
}
