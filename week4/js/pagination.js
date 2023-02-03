// 模組 https://hackmd.io/P-U_pnqXSpOB4WqsM-BXfw
// 預設匯出 export default

// 在 bootstrap 找到 pagination 版型寫法，貼至 template 中

// 【分頁數字】 使用 v-for，v-for 記得搭配 :key (純數值加上字串 -> 唯一值)
// 【當前數字樣式】 :class="{ active: 判斷 }"
// 【前一頁後一頁有無】 :class="{ disabled: 判斷 }"

// props 父元件傳 資料 給子元件
// props 加入 pages, getProducts，a 標籤上 @click.prevent="getProducts(page)"

// emit  子元件傳 事件 給父元件
// a 標籤上 @click.prevent="$emit('change-page', page)"

export default {
	props: ["pages", "getProducts"],
	template: `<nav aria-label="Page navigation example">
  <ul class="pagination">

    <li class="page-item"
      :class="{ disabled: !pages.has_pre }">
      <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="getProducts(pages.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item"
      :class="{ active: page === pages.current_page }"
      v-for="page in pages.total_pages" :key="page + 'page'">
      <a class="page-link" href="#"
        @click.prevent="getProducts(page)">{{ page }}</a>
    </li>
    
    <li class="page-item"
      :class="{ disabled: !pages.has_next }">
      <a class="page-link" href="#" aria-label="Next"
        @click.prevent="getProducts(pages.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
