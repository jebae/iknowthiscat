import Component from "../lib/Component.js";

export default class DarkmodeCheckbox extends Component {
	state = {
		isDarkmode: false,
	};

	constructor({ $container, setDarkmode }) {
		super();
		const $wrapper = document.createElement("section");
		const $label = document.createElement("label");
		const $labelText = document.createTextNode("Dark mode");

		this.$checkbox = document.createElement("input");
		this.$checkbox.type = "checkbox";

		$label.appendChild($labelText);
		$wrapper.appendChild($label);
		$wrapper.appendChild(this.$checkbox);
		$container.appendChild($wrapper);

		this.setDarkmode = setDarkmode;
		this.handleOnChange();
		this.render();
	}

	handleOnChange() {
		this.$checkbox.addEventListener("change", e => {
			this.setDarkmode(e.target.checked);
		});
	}

	render() {
		const { isDarkmode } = this.state;

		this.$checkbox.checked = isDarkmode ? true : false;
	}
}
