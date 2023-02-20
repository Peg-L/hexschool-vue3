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
	template: "#productModal",
	watch: {
		id() {
			this.loadingItem = this.id;

			const apiUrl = "https://vue3-course-api.hexschool.io/v2";
			const apiPath = "drmeme";

			if (this.id) {
				axios
					.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
					.then((res) => {
						this.tempProduct = res.data.product;

						this.modal.show();
					})
					.catch((err) => {
						alert(err.response.data.message);
					});
			}
		},
	},
	methods: {
		show() {
			this.modal.show();
		},
		hide() {
			this.modal.hide();
		},
	},
	mounted() {
		// id 替換成 refs
		this.modal = new bootstrap.Modal(this.$refs.modal);
		// 監聽 dom，當 modal 關閉時，...要做什麼事情
		this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
			// this.getProduct(this.id); // 從外層傳入 getProduct 事件，來改 ID
			this.openModal("");
		});
	},
};
