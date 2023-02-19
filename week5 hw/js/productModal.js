export default {
	// 當 id 變動時，取得遠端資料，並呈現 modal
	props: ["id", "addToCart", "openModal"],
	data() {
		return {
			modal: {},
			tempProduct: {},
			qty: 1,
		};
	},
	template: "#ProductModal",
	watch: {
		id() {
			console.log("productModal:", this.id);
			if (this.id) {
				axios
					.get(`${apiUrl}/v2/api/${apiPath}/product/${this.id}`)
					.then((res) => {
						console.log("單一產品：", res.data.product);
						this.tempProduct = res.data.product;
						this.modal.show();
					});
			}
		},
	},
	methods: {
		hide() {
			this.modal.hide();
		},
	},
	mounted() {
		// id 替換成 refs
		this.modal = new bootstrap.Modal(this.$refs.modal);
		// 監聽 dom，當 modal 關閉時，...要做什麼事情
		this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
			// console.log("modal 被關閉了");
			this.openModal(""); // 從外層傳入 openModal 事件，來改 ID
		});
	},
};
