// 註記
// vue 自動將所有資料方法展開至 proxy 中，this 即可取得 methods 中的 getData、data 中的 apiUrl、apiPath 等等

import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "drmeme",
			products: [],
			tempProduct: {},
		};
	},
	methods: {
		// 確認管理員登入
		checkAdmin() {
			const url = `${this.apiUrl}/api/user/check`;
			axios
				.post(url)
				.then(() => {
					// console.log(res);
					// 登入成功，取得資料。
					this.getData();
				})
				.catch(() => {
					alert("禁止使用, 請確認 api_path 是否為本人使用。");
					// 登入失敗，跳轉回 login.html 頁面
					window.location = "login.html";
				});
		},

		// 取得資料
		getData() {
			// 管理控制台 - 產品 API
			const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
			axios
				.get(url)
				.then((res) => {
					// 先用 console.log 確認產品陣列在哪一層
					// console.log(res);
					this.products = res.data.products;
				})
				.catch((err) => {
					console.dir(err);
					alert(err.response.data.message);
				});
		},

		// 將產品資料放入 tempProduct 中
		getProductDetails(product) {
			this.tempProduct = product;
		},
		// 刪除測試產品
		// deleteProduct() {
		// 	const id = `-NK7a9oZqShY6ng7wod6`;
		// 	const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
		// 	axios
		// 		.delete(url)
		// 		.then((res) => {
		// 			console.log(res);
		// 		})
		// 		.catch((err) => {
		// 			console.dir(err);
		// 		});
		// },
	},
	mounted() {
		// 取出 Token (僅需設定一次)，https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#%E7%A4%BA%E4%BE%8B_2_%E5%BE%97%E5%88%B0%E5%90%8D%E4%B8%BA_test2_%E7%9A%84_cookie
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)drmemeToken\s*\=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		// console.log(token);
		// https://github.com/axios/axios
		axios.defaults.headers.common.Authorization = token;

		this.checkAdmin();
	},
}).mount("#app");
