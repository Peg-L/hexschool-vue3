// 任務頁面：https://rpg.hexschool.com/training/33/task/self
// github repo：https://github.com/hexschool/live-vue3-training-chapter-works/tree/main/week5
// 六角 api：https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__products_all

// 定義規則
VeeValidate.defineRule("email", VeeValidateRules["email"]);
VeeValidate.defineRule("required", VeeValidateRules["required"]);

// // ** 加入多國語系 **
// // 讀取外部的資源
// VeeValidateI18n.loadLocaleFromURL(
// 	"https://unpkg.com/@vee-validate/i18n@4.0.2/dist/locale/ar.json"
// );

// // Activate the locale
// VeeValidate.configure({
// 	generateMessage: VeeValidateI18n.localize(
// 		"https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
// 	),
// 	validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
// });

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
	"https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
	generateMessage: localize("zh_TW"),
});

import productModal from "./productModal.js";

const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "drmeme";

const app = Vue.createApp({
	data() {
		return {
			products: [],
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
	components: {
		VForm: Form,
		VField: Field,
		ErrorMessage: ErrorMessage,
	},
	methods: {
		getProducts() {
			axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`).then((res) => {
				console.log("產品列表：", res.data.products);
				// 直接覆蓋原陣列，使用 =，加入 一筆資料 用 push
				this.products = res.data.products;
			});
		},
		openModal(id) {
			this.productId = id;
			console.log("外層帶入 productId:", id);
		},
		addToCart(product_id, qty = 1) {
			const data = {
				product_id,
				qty,
			};
			axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, { data }).then((res) => {
				console.log("加入購物車：", res.data);
				// 加入購物車後自動關閉
				// productModal 中加入 hide 方法
				this.$refs.productModal.hide();

				// 加入購物車時也要觸發
				this.getCarts();
			});
		},
		getCarts() {
			axios.get(`${apiUrl}/v2/api/${apiPath}/cart`).then((res) => {
				console.log("購物車：", res.data);
				this.cart = res.data.data;
			});
		},
		updateCartItem(item) {
			// 購物車的 id, 產品的 id
			const data = {
				product_id: item.product.id,
				qty: item.qty,
			};

			this.loadingItem = item.id;

			axios
				.put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, { data })
				.then((res) => {
					console.log("更新購物車：", res.data);
					this.getCarts();
					this.loadingItem = ""; // 清空
				});
		},
		deleteCartItem(item) {
			this.loadingItem = item.id;
			axios
				.delete(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`)
				.then((res) => {
					console.log("刪除購物車：", res.data);
					this.loadingItem = "";
					this.getCarts();
				});
		},
		createOrder() {
			axios
				.post(`${apiUrl}/v2/api/${apiPath}/order`, { data: this.form })
				.then((res) => {
					alert(res.data.message);
					this.$refs.form.resetForm();
					this.getCarts();
					this.form.user = "";
				})
				.catch((err) => {
					alert(err.data.message);
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
