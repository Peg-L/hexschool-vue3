<template>
  <div>
    <table>
      <thead>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{  product.title }}</td>
          <td><img :src="product.imageUrl" height="150"></td>
          <td>
            <RouterLink :to="`/product/${product.id}`">
              連結到單一產品頁面
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    RouterLink
  },
  mounted() {
    this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
      this.products = res.data.products
    })
  }

}
</script>