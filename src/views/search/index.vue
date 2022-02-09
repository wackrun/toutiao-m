<template>
  <div class='search-container'>
      <!-- 搜索栏 -->
      <form class="search-form" action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            background="#3296fa"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
    </form>
    <!-- 搜索栏 -->
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :searchText="searchText"
    />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
   <search-suggestion
    v-else-if="searchText"
    :searchText="searchText"
    @search="onSearch"
    />
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :searchHistories = "searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
      />
    <!-- 搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion
  },
  props: {},
  computed: {},
  watch: {
    // 搜索历史内容一变化就保存到本地
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 展示搜索结果列表
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang='less' scoped>
.search-container{
  padding-top: 108px;
    .van-search__action{
        color: #fff
    }
    .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
