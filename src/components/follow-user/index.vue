<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
>已关注</van-button>
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
>关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  // 自定义v-mode的数据名称
  model: {
    prop: 'isFollowed', // 默认value
    event: 'update-is_followed' // 默认input
  },
  data () {
    return {
      loading: false
    }
  },
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，添加关注
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
        // this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 410) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
