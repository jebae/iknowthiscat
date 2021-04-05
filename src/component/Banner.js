import Component from "../lib/Component.js";
import { fetchRandomCats } from "../api.js";

const DIRECTION_LEFT = 0;
const DIRECTION_RIGHT = 1;

export default class Banner extends Component {
	$wrapper;
	imgs = [];

	constructor({ $container }) {
		super();
		this.$wrapper = document.createElement("aside");
		this.$wrapper.className = "BannerWrapper";

		const $nextBtn = document.createElement("span");

		$nextBtn.textContent = ">";
		$nextBtn.className = "Btn NextBtn";

		const $prevBtn = document.createElement("span");

		$prevBtn.textContent = "<";
		$prevBtn.className = "Btn PrevBtn";

		this.$wrapper.appendChild($nextBtn);
		this.$wrapper.appendChild($prevBtn);
		$container.appendChild(this.$wrapper);

		this.initialFetch();

		$nextBtn.addEventListener("click", () => this.onClickNext());
		$prevBtn.addEventListener("click", () => this.onClickPrev());
	}

	onClickNext() {
		const { srcs, current } = this.imgs.state;

		this.imgs.setState({
			...this.imgs.state,
			current: (current + 1) % srcs.length,
			direction: DIRECTION_LEFT,
		});
	}

	onClickPrev() {
		const { srcs, current } = this.imgs.state;

		this.imgs.setState({
			...this.imgs.state,
			current: (current + srcs.length - 1) % srcs.length,
			direction: DIRECTION_RIGHT,
		});
	}

	async initialFetch() {
		try {
			const cats = await fetchRandomCats();

			this.imgs = new BannerImages({
				$container: this.$wrapper,
				srcs: cats.map(({ url }) => url),
			});
		} catch (err) {
			console.error("banner fetch error", err);
		}
	}
}

class BannerImages extends Component {
	state = {
		srcs: [],
		current: null,
		direction: null,
	};
	$imgs = [];

	constructor({ $container, srcs }) {
		super();
		this.$imgs = srcs.map(src => {
			const $img = document.createElement("img");

			$img.className = "BannerImg";
			$img.src = src;
			return $img;
		});
		this.$imgs.forEach($img => $container.appendChild($img));
		this.setState({ srcs, current: 0, direction: null });
	}

	render() {
		const { current, direction, srcs } = this.state;
		const left = (current + srcs.length - 1) % srcs.length;
		const right = (current + 1) % srcs.length;

		this.$imgs.forEach(($img, i) => {
			$img.className = "BannerImg";
			if (i === left) {
				if (direction === DIRECTION_LEFT)
					$img.classList.add("active");
				$img.classList.add("left");
			} else if (i === current) {
				$img.classList.add("active");
			} else if (i === right) {
				if (direction === DIRECTION_RIGHT)
					$img.classList.add("active");
				$img.classList.add("right");
			}
		});
	}
}
