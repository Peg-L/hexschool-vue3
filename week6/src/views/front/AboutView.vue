<template>
  <h1>This is About page.</h1>
</template>

<script>
const { VITE_TEXT } = import.meta.env
export default {
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    console.log(VITE_TEXT)
    // const url = import.meta.env.VITE_APP_PATH
  //   this.$http.get(url).then((res) => {
  //     console.log(res)
  //     this.data = res.data.results[0]
  //     console.log(this.data)
  //   })
  }
}
</script>
