module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿宽750应设置为75，但Vant建议用37.5，若固定37.5则设计稿需/2
      // 解决方案：rootValue可以是函数，把文件名中包含vant的根元素字体大小设为37.5否则75
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 要转化的css属性
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
