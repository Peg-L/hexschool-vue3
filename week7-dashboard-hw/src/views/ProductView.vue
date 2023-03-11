<template>
  <div>
    單一產品頁面
  </div>
</template> 

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    console.log('$route', this.$route); // 屬性值
    const { id } = this.$route.params;
    this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`).then((res) => {
      console.log(res);
    })
  }
}
</script>