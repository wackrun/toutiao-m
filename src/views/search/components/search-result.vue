<template>
  <div class='search-result'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
     error-text="请求失败，点击重新加载"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1, // 页码
      perPage: 20 // 每页多少条
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
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 发送请求
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        const { results } = data.data
        // 结果保存到list中
        this.list.push(...results)
        // 关闭loading状态
        this.loading = false
        // 判断是否还有结果，有页码++
        if (results.length) {
          this.perPage++
        } else {
          // 无finished为true
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
