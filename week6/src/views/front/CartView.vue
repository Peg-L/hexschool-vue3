<template>
  這是購物車頁面
<!-- 購物車列表 -->
<div class="text-end">
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              :disabled="item.id===loadingItem"
              @click="deleteCartItem(item)"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingItem === item.id"
              ></i>
              x
            </button>
          </td>
          <td>
            <!-- 資料結構設計：對後端而言，產品名稱、描述等並非重要資料，所以放在內層 -->
            {{ item.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select
                name=""
                id=""
                class="form-control"
                v-model="item.qty"
                :disabled="item.id===loadingItem"
                @change="updateCartItem(item)"
              >
                <option :value="i" v-for="i in 20" :key="`${i}12345`">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
          <td class="text-end">
            <small
              v-if="cart.final_total !== cart.total"
              class="text-success"
              >折扣價：</small
            >
            {{ item.final_total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr v-if="cart.final_total !== cart.total">
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      productId: '',
      cart: {},
      loadingItem: '', // 存 id
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          // 要直接覆蓋原陣列，使用 =，而加入 一筆資料 用 push
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    getCarts () {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    updateCartItem (item) {
      this.loadingItem = item.id

      // 購物車的 id, 產品的 id
      const data = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          alert(res.data.message)
          this.loadingItem = '' // 清空
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.loadingItem = ''
        })
    },
    deleteAllCarts () {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteCartItem (item) {
      this.loadingItem = item.id
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          alert(res.data.message)
          this.loadingItem = ''
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    createOrder () {
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data: this.form })
        .then((res) => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
