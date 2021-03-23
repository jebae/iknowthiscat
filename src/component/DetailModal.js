import Component from "../lib/Component.js";

export default class DetailModal extends Component {
	$detailModal = null;
	state = {
		visible: false,
		url: "",
		name: "",
		temperament: "",
		origin: "",
	};
	reqCount = 0;

	constructor({ $container }) {
		super();
		this.$detailModal = document.createElement("aside");
		this.$detailModal.className = "ImageInfo";

		$container.appendChild(this.$detailModal);

		this.render();

		document.addEventListener("keydown", e => {
			if (e.keyCode === 27)
				this.close();
		});

		this.$detailModal.addEventListener("click", () => this.close());
	}

	close() {
		this.$detailModal.classList.remove("open");
		this.$detailModal.classList.add("close");
		setTimeout(() => {
			this.setState({ ...this.state, visible: false });
		}, 400);
	}

	handleInnerClose() {
		this.$detailModal.querySelector(".content-wrapper").addEventListener("click", e => {
			e.stopPropagation();
		});

		this.$detailModal.querySelector(".close").addEventListener("click", () => this.close());
	}

	render() {
	  if (this.state.visible) {
		const { url, name, temperament, origin } = this.state;

		this.$detailModal.innerHTML = `
		  <div class="content-wrapper">
			<div class="title">
			  <span>${name || ""}</span>
			  <div class="close">x</div>
			</div>
			<img src="${url}" alt="${name || ""}"/>
			<div class="description">
			  <div>성격: ${temperament || ""}</div>
			  <div>태생: ${origin || ""}</div>
			</div>
		  </div>
		`;
		this.$detailModal.style.display = "block";
		this.$detailModal.classList.remove("close");
		this.$detailModal.classList.add("open");
		this.handleInnerClose();
	  } else {
		this.$detailModal.style.display = "none";
	  }
	}
  }
