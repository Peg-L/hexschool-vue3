// vue 自動將所有資料方法展開至 proxy 中，this 即可取得 methods 中的 getData、data 中的 apiUrl、apiPath 等等
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"; // import {} from 來源：具名匯入模組

let productModal = null;
let delProductModal = null;

createApp({
	// 資料
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "drmeme", // 使用自己申請的 api
			products: [],
			isNew: false,
			tempProduct: {
				imagesUrl: [],
			},
		};
	},

	// 生命週期
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		axios.defaults.headers.common.Authorization = token;
		this.checkAdmin();

		// 建立 product 互動視窗 (Modal) https://bootstrap5.hexschool.com/docs/5.1/migration/#javascript
		productModal = new bootstrap.Modal(
			document.getElementById("productModal"),
			{
				// keyboard: true, 按 esc 鍵可關閉 Modal，false 則不會關閉 https://bootstrap5.hexschool.com/docs/5.0/components/modal/#options
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
	},

	// 方法
	// 透過 .then() 取得成功 response，.catch() 取得失敗 response
	methods: {
		// 確認管理員登入
		checkAdmin() {
			const url = `${this.apiUrl}/api/user/check`;
			axios
				.post(url)
				.then(() => {
					this.getData(); // 成功：觸發 getData() 來取得資料
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = "login.html"; // 失敗後跳轉回登入頁面
				});
		},

		// 取得 data
		getData() {
			const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
			axios
				.get(url)
				.then((res) => {
					this.products = res.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message); // 失敗：都使用 "伺服器回傳的錯誤訊息"
				});
		},

		// 更新產品
		updateProduct() {
			// 將 url 改為新增產品 api，方法為 post
			let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
			let httpMethod = "post";

			// 將 url 改為編輯產品api，方法為 put
			if (!this.isNew) {
				url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
				httpMethod = "put";
			}

			axios[httpMethod](url, { data: this.tempProduct })
				.then((res) => {
					alert(res.data.message);
					productModal.hide(); // 前面 alert 關閉後，.hide()：Modal 隱藏
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},

		// 開啟互動視窗(Modal)
		openModal(isNew, item) {
			if (isNew === "new") {
				this.tempProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				productModal.show(); // .show：Modal 打開
			} else if (isNew === "edit") {
				this.tempProduct = { ...item };
				this.isNew = false;
				productModal.show();
			} else if (isNew === "delete") {
				this.tempProduct = { ...item };
				delProductModal.show();
			}
		},

		// 刪除產品
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

		// 新增圖片
		createImages() {
			this.tempProduct.imagesUrl = [];
			this.tempProduct.imagesUrl.push("");
		},
	},
}).mount("#app");
