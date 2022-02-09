<template>
  <div class='search-suggestion'>
    <van-cell
    icon="search"
    v-for="(text,index) in suggestions"
    :key="index"
    @click="$emit('search', text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200)
      /*  handler(value){
          this.loadSearchSuggestions(value)
      } */
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>
<style lang='less' scoped>
  .search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
