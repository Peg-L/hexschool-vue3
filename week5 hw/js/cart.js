// 任務頁面：https://rpg.hexschool.com/training/33/task/self
// github repo：https://github.com/hexschool/live-vue3-training-chapter-works/tree/main/week5
// 六角 api：https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__products_all

// 定義規則
VeeValidate.defineRule("email", VeeValidateRules["email"]);
VeeValidate.defineRule("required", VeeValidateRules["required"]);

// ** 加入多國語系 **
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL(
	"https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

// Activate the locale
VeeValidate.configure({
	generateMessage: VeeValidateI18n.localize("zh_TW"),
	validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

import productModal from "./productModal.js";

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "drmeme";

const app = Vue.createApp({
	data() {
		return {
			products: [],
			tempProduct: {},
			productId: "",
			cart: {},
			loadingItem: "", // 存 id
			form: {
				user: {
					name: "",
					email: "",
					tel: "",
					address: "",
				},
				message: "",
			},
		};
	},
	methods: {
		getProducts() {
			axios
				.get(`${apiUrl}/api/${apiPath}/products`)
				.then((res) => {
					// 要直接覆蓋原陣列，使用 =，而加入 一筆資料 用 push
					this.products = res.data.products;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		openModal(id) {
			this.productId = id;
		},
		addToCart(product_id, qty = 1) {
			this.loadingItem = product_id;
			const data = {
				product_id,
				qty,
			};
			this.$refs.productModal.hide();
			axios
				.post(`${apiUrl}/api/${apiPath}/cart`, { data })
				.then((res) => {
					alert(res.data.message);

					this.loadingItem = "";
					// 加入購物車後自動關閉
					// productModal 中加入 hide 方法

					// 加入購物車時也要觸發
					this.getCarts();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		getCarts() {
			axios
				.get(`${apiUrl}/api/${apiPath}/cart`)
				.then((res) => {
					this.cart = res.data.data;
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		updateCartItem(item) {
			this.loadingItem = item.id;

			// 購物車的 id, 產品的 id
			const data = {
				product_id: item.product_id,
				qty: item.qty,
			};
			axios
				.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
				.then((res) => {
					alert(res.data.message);
					this.loadingItem = ""; // 清空
					this.getCarts();
				})
				.catch((err) => {
					alert(err.response.data.message);
					this.loadingItem = "";
				});
		},
		deleteAllCarts() {
			axios
				.delete(`${apiUrl}/api/${apiPath}/carts`)
				.then((res) => {
					alert(res.data.message);
					this.getCarts();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		deleteCartItem(item) {
			this.loadingItem = item.id;
			axios
				.delete(`${apiUrl}/api/${apiPath}/cart/${item.id}`)
				.then((res) => {
					alert(res.data.message);
					this.loadingItem = "";
					this.getCarts();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		createOrder() {
			axios
				.post(`${apiUrl}/api/${apiPath}/order`, { data: this.form })
				.then((res) => {
					alert(res.data.message);
					this.$refs.form.resetForm();
					this.getCarts();
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
		isPhone(value) {
			const phoneNumber = /^(09)[0-9]{8}$/;
			return phoneNumber.test(value) ? true : "需要正確的電話號碼";
		},
	},
	mounted() {
		this.getProducts();
		this.getCarts();
	},
});

// 全域註冊
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.component("productModal", productModal);

app.mount("#app");
