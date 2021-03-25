import Component from "./lib/Component.js";
import { DetailModal, SearchResult, DarkmodeCheckbox, SearchSection } from "./component/index.js";
import { isWindowDarkmode, addColorSchemeListener } from "./utils/darkmode.js";

export default class App extends Component {
  $container = null;
  state = {
    loading: false,
    error: false,
    cats: [],
    keyword: "",
    isDarkmode: false,
    searchRecords: [],
  };

  constructor({ $container }) {
    super();
    this.$container = $container;

    this.darkmodeCheckbox = new DarkmodeCheckbox({
      $container,
      setDarkmode: this.setDarkmode.bind(this),
    });

    this.searchSection = new SearchSection({
      $container,
      onUpdateResult: this.onUpdateResult.bind(this),
    });

    this.searchResult = new SearchResult({
      $container,
      onClick: this.openDetailModal.bind(this),
    });


    this.detailModal = new DetailModal({
      $container,
	  });

    this.initDarkmode();
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

  openDetailModal(cat) {
    this.detailModal.setState({
      visible: true,
      ...cat,
    });
  }

  onUpdateResult(state) {
    this.setState({ ...this.state, ...state });
  }

  addSearchRecord(keyword) {
    const { searchRecords } = this.state;

    searchRecords.push(keyword);
    searchRecords.length > 5 && searchRecords.shift();
    this.setState({ ...this.state, searchRecords });
  }

  setState(nextState) {
    super.setState(nextState);

    const { loading, error, cats, keyword, isDarkmode, } = nextState;

    this.searchResult.setState({ loading, error, cats, keyword });
    this.darkmodeCheckbox.setState({ isDarkmode });
  }
}
