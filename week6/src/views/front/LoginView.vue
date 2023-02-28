<template>
  <form class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        v-model="user.username"
        id="username"
        placeholder="name@example.com"
        required
        autofocus
      />
      <label for="username">Email address</label>
    </div>

    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        id="password"
        placeholder="Password"
        required
      />
      <label for="password">Password</label>
    </div>
    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
      登入
    </button>
  </form>
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // API
      const api = `${VITE_APP_URL}/v2/admin/signin`
      // 發送 API 至遠端並登入 (並儲存 Token)
      this.$http
        .post(api, this.user)
      // 成功結果
        .then((res) => {
          // 取得 token, expired 失效時間
          const { token, expired } = res.data
          console.log(token, expired)
          // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#%E7%A4%BA%E4%BE%8B_3_%E5%8F%AA%E6%89%A7%E8%A1%8C%E6%9F%90%E4%BA%8B%E4%B8%80%E6%AC%A1
          document.cookie = `drmemeToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
          // window.location = 'products.html'
        })
      // 失敗結果
        .catch((err) => {
          // 從 response 中取得失敗訊息，alert 跳出該訊息警示
          // 訊息是給使用者(管理員)觀看的，採用 alert 較佳
          alert(err.response.data.message)
        })
    }
  }
}
</script>
