import Component from "./lib/Component.js";
import SearchResult from "./component/SearchResults.js";
import { fetchRandomCats } from "./api.js";

export default class App extends Component {
  $container = null;
  state = {
    loading: false,
    error: false,
    cats: [],
  };

  constructor({ $container }) {
    super();
    this.$container = $container;

    // this.searchInput = new SearchInput({
    //   $container,
    //   onSearch: keyword => {
    //     api.fetchCats(keyword).then(({ data }) => this.setState(data));
    //   }
    // });

    this.searchResult = new SearchResult({
      $container,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    // this.imageInfo = new ImageInfo({
    //   $container,
    //   data: {
    //     visible: false,
    //     image: null
    //   }
	  // });

    this.initialFetch();
  }

  async initialFetch() {
    try {
      const cats = await fetchRandomCats();

      this.searchResult.setState({ ...this.state, cats });
    } catch (err) {
      console.error("something went wrong", err);
    }
  }

  setState(nextState) {
    super.setState(nextState);

    const { loading, error, cats } = nextState;

    this.searchResult.setState({ loading, error, cats });
  }
}
