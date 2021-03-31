import Component from "../lib/Component.js";
import { fetchCats } from "../api.js";

export default class SearchResult extends Component {
	$searchResult = null;
	state = {
		loading: false,
		error: false,
		cats: [],
		keyword: "",
		lastIdx: 0,
	};
	onClick = null;
	reqId = 0;
  	tid = null;

	constructor({ $container, onClick, onUpdateResult }) {
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

		const loadMore = this.loadMore(onUpdateResult);

		window.onscroll = (e) => {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
				if (this.tid !== null) {
					console.log("cancel");
					clearTimeout(this.tid);
				}

				this.tid = setTimeout(() => {
					loadMore();
					this.tid = null;
				}, 500);
			}
		}
	}

	createArticle(url, name, i) {
		const $article = document.createElement("article");
		const $img = document.createElement("img");

		$article.className = "item";
		$img.className = "item-Image";
		$img.loading = "lazy";
		$img.alt = name;
		$img.src = url;
		$img.setAttribute("data-idx", i);
		$article.appendChild($img);
		return $article
	}

	loadMore(cb) {
		return async () => {
			this.reqId = (this.reqId + 1) % 1000000000;

			const keyword = this.state.keyword;

			if (keyword === "") {
			  cb({ cats: [], error: false, loading: false, keyword: "" });
			  return ;
			}

			const id = this.reqId;

			try {
			  cb({ error: false, loading: true, keyword, lastIdx: this.state.cats.length });

			  const cats = await fetchCats(keyword);

			  if (this.reqId === id)
				cb({ cats: [ ...this.state.cats, ...cats ], error: false, loading: false });
			} catch (err) {
				console.log(err);
			  cb({ error: true, loading: false });
			}
		}
	}

	render() {
		const { error, keyword, cats, loading, lastIdx } = this.state;

		if (error) {
			this.$searchResult.innerHTML = "<h2>something went wrong...</h2>";
		} else if (loading && lastIdx === 0) {
			this.$searchResult.innerHTML = "<h2>Hold on...</h2>";
		} else if (keyword != "" && cats.length === 0) {
			this.$searchResult.innerHTML = `<h2>no results for ${keyword}...</h2>`;
		} else {
			if (lastIdx === 0)
				this.$searchResult.innerHTML = "";

			cats.slice(lastIdx).forEach(({ url, name }, i) => {
				this.$searchResult.appendChild(this.createArticle(url, name, i));
			});
		}
	}
}
