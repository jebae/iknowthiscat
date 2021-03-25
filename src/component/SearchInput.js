import Component from "../lib/Component.js";
import { fetchCats } from "../api.js";

export default class SearchInput extends Component {
  $searchInput;
  reqId = 0;
  tid = null;

  constructor({ $container, onUpdateResult }) {
    super();
    this.$searchInput = document.createElement("input");
    this.$searchInput.type = "text";
    this.$searchInput.placeholder = "고양이를 검색해보세요.";
    this.$searchInput.className = "SearchInput";
    this.$searchInput.autofocus = true;

    $container.appendChild(this.$searchInput);

    const onSearch = this.onSearch(onUpdateResult);

    this.$searchInput.addEventListener("keyup", e => {
      const keyword = e.target.value;

      if (this.tid !== null) {
        clearTimeout(this.tid);
      }

      this.tid = setTimeout(() => {
        onSearch(keyword);
      }, 500);
    });

    this.$searchInput.addEventListener("click", (e) => {
      onUpdateResult({ keyword: "" });
      e.target.value = "";
    });
  }

  onSearch(cb) {
    return async (keyword) => {
      this.reqId = (this.reqId + 1) % 1000000000;

      if (keyword === "") {
        cb({ cats: [], error: false, loading: false, keyword: "" });
        return ;
      }

      const id = this.reqId;

      try {
        cb({ error: false, loading: true, keyword });

        const cats = await fetchCats(keyword);

        if (this.reqId === id) {
          cb({ cats, error: false, loading: false });
        }
      } catch (err) {
        cb({ error: true, loading: false });
      }
    }
  }

  render() {}
}
