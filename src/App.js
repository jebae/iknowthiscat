import Component from "./lib/Component.js";
import SearchResult from "./component/SearchResults.js";
import DarkmodeCheckbox from "./component/DarkmodeCheckbox.js";
import { fetchRandomCats } from "./api.js";
import { isWindowDarkmode, addColorSchemeListener } from "./utils/darkmode.js";

export default class App extends Component {
  $container = null;
  state = {
    loading: false,
    error: false,
    cats: [],
    isDarkmode: false,
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

    this.darkmodeCheckbox = new DarkmodeCheckbox({
      $container,
      setDarkmode: this.setDarkmode.bind(this),
    });

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
    this.initDarkmode();
  }

  async initialFetch() {
    try {
      const cats = await fetchRandomCats();

      this.setState({ ...this.state, cats });
    } catch (err) {
      console.error("something went wrong", err);
    }
  }

  initDarkmode() {
    addColorSchemeListener(this.setDarkmode.bind(this));

    if (isWindowDarkmode())
      this.setDarkmode(true);
  }

  setDarkmode(isDark) {
    if (isDark) {
      document.querySelector("body").classList.add("darkmode");
    } else {
      document.querySelector("body").classList.remove("darkmode");
    }
    this.setState({ ...this.state, isDarkmode: isDark });
  }

  setState(nextState) {
    super.setState(nextState);

    const { loading, error, cats, isDarkmode } = nextState;

    this.searchResult.setState({ loading, error, cats });
    this.darkmodeCheckbox.setState({ isDarkmode });
  }
}
