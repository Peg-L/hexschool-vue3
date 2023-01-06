import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
	data() {
		return {
			user: {
				username: "",
				password: "",
			},
		};
	},
	methods: {
		login() {
			// API
			const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
			// 發送 API 至遠端並登入 (並儲存 Token)
			axios
				.post(api, this.user)
				// 成功結果
				.then((res) => {
					console.log(res);
					// 取得 token, expired 失效時間
					const { token, expired } = res.data;
					console.log(token, expired);
					// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#%E7%A4%BA%E4%BE%8B_3_%E5%8F%AA%E6%89%A7%E8%A1%8C%E6%9F%90%E4%BA%8B%E4%B8%80%E6%AC%A1
					document.cookie = `drmemeToken=${token}; expires=${new Date(
						expired
					)};`;
					window.location = "products.html";
				})
				// 失敗結果
				.catch((err) => {
					// console.dir(err);

					// 從 response 中取得失敗訊息，alert 跳出該訊息警示
					// 訊息是給使用者(管理員)觀看的，採用 alert 較佳
					alert(err.response.data.message);
				});
		},
	},
}).mount("#app");
