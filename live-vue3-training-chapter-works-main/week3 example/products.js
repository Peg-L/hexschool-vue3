// import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// let productModal = null;
// let delProductModal = null;

// createApp({
// 	data() {
// 		return {
// 			apiUrl: "https://vue3-course-api.hexschool.io/v2",
// 			apiPath: "drmeme",
// 			products: [],
// 			isNew: false,
// 			tempProduct: {
// 				imagesUrl: [],
// 			},
// 		};
// 	},
// 	mounted() {
// 		productModal = new bootstrap.Modal(
// 			document.getElementById("productModal"),
// 			{
// 				keyboard: false,
// 			}
// 		);

// 		delProductModal = new bootstrap.Modal(
// 			document.getElementById("delProductModal"),
// 			{
// 				keyboard: false,
// 			}
// 		);

// 		// 取出 Token
// 		const token = document.cookie.replace(
// 			/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
// 			"$1"
// 		);
// 		axios.defaults.headers.common.Authorization = token;

// 		this.checkAdmin();
// 	},
// 	methods: {
// 		checkAdmin() {
// 			const url = `${this.apiUrl}/api/user/check`;
// 			axios
// 				.post(url)
// 				.then(() => {
// 					this.getData();
// 				})
// 				.catch((err) => {
// 					alert(err.response.data.message);
// 					window.location = "login.html";
// 				});
// 		},
// 		getData() {
// 			const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
// 			axios
// 				.get(url)
// 				.then((response) => {
// 					this.products = response.data.products;
// 				})
// 				.catch((err) => {
// 					alert(err.response.data.message);
// 				});
// 		},
// 		updateProduct() {
// 			let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
// 			let http = "post";

// 			if (!this.isNew) {
// 				url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
// 				http = "put";
// 			}

// 			axios[http](url, { data: this.tempProduct })
// 				.then((response) => {
// 					alert(response.data.message);
// 					productModal.hide();
// 					this.getData();
// 				})
// 				.catch((err) => {
// 					alert(err.response.data.message);
// 				});
// 		},
// 		openModal(isNew, item) {
// 			if (isNew === "new") {
// 				this.tempProduct = {
// 					imagesUrl: [],
// 				};
// 				this.isNew = true;
// 				productModal.show();
// 			} else if (isNew === "edit") {
// 				this.tempProduct = { ...item };
// 				this.isNew = false;
// 				productModal.show();
// 			} else if (isNew === "delete") {
// 				this.tempProduct = { ...item };
// 				delProductModal.show();
// 			}
// 		},
// 		delProduct() {
// 			const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

// 			axios
// 				.delete(url)
// 				.then((response) => {
// 					alert(response.data.message);
// 					delProductModal.hide();
// 					this.getData();
// 				})
// 				.catch((err) => {
// 					alert(err.response.data.message);
// 				});
// 		},
// 		createImages() {
// 			this.tempProduct.imagesUrl = [];
// 			this.tempProduct.imagesUrl.push("");
// 		},
// 	},
// }).mount("#app");

// -------------
// 註記
// vue 自動將所有資料方法展開至 proxy 中，this 即可取得 methods 中的 getData、data 中的 apiUrl、apiPath 等等
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"; // import {} from 來源：具名匯入模組

let productModal = null;
let delProductModal = null;

createApp({
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "drmeme",
			products: [],
			isNew: false,
			tempProduct: {
				imagesUrl: [],
			},
		};
	},
	// 生命週期
	mounted() {
		// 建立 product 互動視窗 (Modal)
		productModal = new bootstrap.Modal(
			document.getElementById("productModal"),
			{
				// keyboard: true, 按 esc 鍵關閉 Modal，反之不會關閉 https://bootstrap5.hexschool.com/docs/5.0/components/modal/#options
				keyboard: false,
			}
		);
		// 建立 delete 互動視窗 (Modal)
		delProductModal = new bootstrap.Modal(
			document.getElementById("delProductModal"),
			{
				keyboard: false,
			}
		);

		// 取出 Token
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		axios.defaults.headers.common.Authorization = token;

		this.checkAdmin();
	},

	methods: {
		checkAdmin() {
			const url = `${this.apiUrl}/api/user/check`;
			axios
				.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = "login.html";
				});
		},

		getData() {
			const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
			axios
				.get(url)
				.then((response) => {
					this.products = response.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},

		updateProduct() {
			let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
			let http = "post";

			if (!this.isNew) {
				url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
				http = "put";
			}

			axios[http](url, { data: this.tempProduct })
				.then((response) => {
					alert(response.data.message);
					productModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		openModal(isNew, item) {
			if (isNew === "new") {
				this.tempProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				productModal.show();
			} else if (isNew === "edit") {
				this.tempProduct = { ...item };
				this.isNew = false;
				productModal.show();
			} else if (isNew === "delete") {
				this.tempProduct = { ...item };
				delProductModal.show();
			}
		},
		delProduct() {
			const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

			axios
				.delete(url)
				.then((response) => {
					alert(response.data.message);
					delProductModal.hide();
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		createImages() {
			this.tempProduct.imagesUrl = [];
			this.tempProduct.imagesUrl.push("");
		},
	},
}).mount("#app");
