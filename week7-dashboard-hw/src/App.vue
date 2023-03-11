<template>
  <div>
    | <RouterLink to="/">Home</RouterLink> | 
    <RouterLink to="/about">About</RouterLink> | 
    <RouterLink to="/Products">Products</RouterLink> || 
    <RouterLink to="/admin/products">後台產品頁面</RouterLink> | 
    <RouterLink to="/admin/orders">後台訂單頁面</RouterLink> | 
  </div>
  <br>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {

    }
  }, 
  components: {
    RouterLink, 
    RouterView
  },
  mounted() {
    this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
      console.log('app', res);
    })
  }
}
</script>