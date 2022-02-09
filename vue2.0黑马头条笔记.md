# 一、项目初始化

## 1、使用 Vue CLI 创建项目

切换到创建项目的目录cmd，输入vue create toutiao-m，选择相应配置后进行项目创建

> 第一次使用需全局安装npm install -g @vue/cli

## 2、加入Git版本管理

1. <strong style="color: green">登录github账号</strong>

​	右上角加号new repository，输入内容后点击create repository

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211228214738881.png" alt="image-20211228214738881" style="float: left; zoom:50%;" />

**本地仓库已存在**

打开项目文件，右键Git Bash Here，vue/cli初始化项目时会创建本地git仓库并对项目中的代码做了初始化提交

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211228215605535.png" alt="image-20211228215605535" style="float: left; zoom:50%;" />

2. <strong style="color: green">给本地仓库添加一个远程仓库地址记录起来（添加一个远端仓库名字叫origin）</strong>

```shell
git remote add origin https://github.com/wackrun/toutiao-m.git
```

3. <strong style="color: green">将本地代码push到origin这个远程仓库</strong>

完整写法master：master，本地master推送到远程仓库的master，--set-upstream把本次推送信息记住，下次直接git push

```shell
git push --set-upstream origin master
可简写为
git push -u origin master
```

4. <strong style="color: green">执行命令后刷新github页面可以看到已将本地代码上传到该仓库中</strong>

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211228221910926.png" alt="image-20211228221910926" style="float: left; zoom:50%;" />

如果之后项目代码有了变动需要提交：

```shell
git add
git commit
git push
```

## 3、调整初始目录结构

1. **修改文件内容**

* App.vue删除结构样式并添加script

* router/index.js删除配置的路由信息

2. **删除初始化的默认文件**

- src/views/About.vue
- src/views/Home.vue
- src/components/HelloWorld.vue
- src/assets/logo.png

3. **新增调整我们需要的目录结构**

- src/api 目录
  - 存储接口封装
- src/utils 目录
  - 存储一些工具模块
- src/styles 目录
  - index.less 文件，存储全局样式
  - 在 `main.js` 中加载全局样式 `import './styles/index.less'`

<strong style="color: green">修改成功后在git中查看状态，此时显示红色已修改状态</strong>

git status（红色（已修改）绿色（已暂存））

<strong style="color: green">添加到暂存区后git status变为绿色，已添加到暂存区</strong>

git add ./（把当前目录下所有变化的资源添加到暂存区）

<strong style="color: green">提交到本地仓库（可以用 -m 参数后跟提交说明的方式，在一行命令中提交更新）</strong>

git commit -m "项目初始化-调整初识目录结构"（提交对象暂存区到版本库）

<strong style="color: green">提交到线上仓库，可在github上看到提交记录</strong>

git push

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211229111854552.png" alt="image-20211229111854552" style="float: left; zoom:50%;" />

## 4、导入图标素材

[阿里巴巴矢量图标库网址](https://www.iconfont.cn/)

1. 到我的项目中新建项目，点击上传图标至项目，把本地的svg图标文件传到项目中去色提交

2. 点击Font class在线生成链接，打开链接复制样式到styles/incon.less，并在index.less中引入该样式

   注意less语法@符和分号：@import './icon.less';

3. 图标使用方法：

```html
<i class="toutiao toutiao-dianzan"></i>
```

4. 图片素材复制到assets中，public中fav图标替换成自己的

## 5、引入Vant组件库

[官方文档](https://youzan.github.io/vant/#/zh-CN/)

用的组件少-->按需引入，多-->全部引入

1. npm安装Vant
2. 在入口文件main.js中导入所有组件
3. 找到组件代码粘贴即可

## 6、移动端REM适配

Vant默认px单位，若要转rem需下面2个工具：

### [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值（根据页面大小改变字体大小）

1. 安装npm i amfe-flexible
2. 在main.js中引入import 'amfe-flexible'
3. 在浏览器中切换手机尺寸查看字体大小

### [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem

1. 安装npm install postcss-pxtorem -D
2. 在**项目根目录**中创建 `.postcssrc.js` 文件

```javascript
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

3. 重启服务查看是否将px转为rem

报错Syntax Error: Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.

原因是在package.json中看到postcss-pxtorem版本是6.0.0，安装5.1.1版本即可

`npm i postcss-pxtorem@5.1.1`

> 行内样式px不会转rem其他都会转`<div style="width: 200px;"></div>`

### 拓展：postcss配置文件

```javascript
module.exports = {
    plugins: {
    'postcss-pxtorem': {
        // 设计稿宽750应设置为75，但Vant建议用37.5，若固定37.5则设计稿需/2
        // 解决方案：rootValue可以是函数，把文件名中包含vant的根元素字体大小设为37.5否则75
        rootValue ({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        // 要转化的css属性
        propList: ['*']
      }
    }
  }
```

## 7、封装请求模块

1. 安装npm i axios
2. 创建 `src/utils/request.js`

```javascript
//封装 axios 请求模块
import axios from "axios"
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/app' //基础路径
})
export default request
```

## 8、关闭语法检查

根目录新建vue.config.js

```javascript
module.exports = {
    /*pages: {
        index: {
            //入口
            entry: 'src/main.js'
        },
    },*/
    lintOnSave: false // 关闭语法检查
}
```



# 二、登录注册

## 准备

### 创建组件并配置路由

1. 在路由组件views/login/index.vue写入内容
2. 在router/index.js中配置登录页路由表

```javascript
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]
```

3. 最后，访问 `/login` 查看是否能访问到登录页面

### 布局样式

在views/login/index.vue写入内容

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211230151447901.png" alt="image-20211230151447901" style="float: left; zoom:50%;" />

**图标使用方法：**

使用slot`<i slot="left-icon" class="toutiao toutiao-shouji"></i>`

## 实现登录&状态提示

表单onSubmit方法中

1. 获取用户输入信息

* v-model进行绑定`v-mode="user.mobile"` `v-mode="user.code"`
* 获取到信息`const user = this.user`

2. 表单验证

* 验证表单，表单通过后提示加载中（组件中必须通过this.$toast来调用Toast组件）

```javascript
this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间默认2000 若0持续展示，下一个Toast出现会顶掉这个
      })
```

3. 提交表单请求登录

* 先在api/user.js中封装一个用户登录请求函数

```javascript
//引入原先utils中封装的baseURL
import request from "../utils/request";
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
```

* 发送请求

```javascript
//在script中先引入登录请求方法
import {login} from '@/api/user'
//利用trycatch发送请求
try {
    //成功提示登录成功
    const res = await login(user)
    this.$toast.success('登录成功')
} catch(err){
    if(err.response.status === 400){
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
}
```

## 表单验证

参考文档校验规则，将规则单独放置到data中

设置文本框类型为数字，以及最大长度maxlength

```javascript
:rules: "userFormRules.mobile"
:rules: "userFormRules.code"
userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
```

## 验证码处理

1. 给button按钮添加点击事件`@click="OnSendSms"`
2. 先校验手机号，成功再往后否则不处理

```javascript
// 给form表单打标识获取到这个元素
<van-form ref="loginForm" @submit="onSubmit">
try {
    //参考文档使用validate方法验证name属性值
  await this.$refs.loginForm.validate('mobile')
} catch (err) {
   //若错误直接return不进行下一步   
  return console.log('验证失败', err)
} 
```

3. 校验成功后按钮变为倒计时，倒计时结束后再复原

```javascript
//将发送验证码和倒计时都写在button中
//设置data中isCountDownShow: false，用v-if&v-else控制显示和隐藏
<template #button>
        <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false" // 倒计时结束复原调用finish事件
        />
        <van-button
          v-else
          class="send-sms-btn"
          native-type="button"
          round size="small"
          type="default"
          @click="OnSendSms"
        >获取验证码</van-button>
      </template>
// 校验成功后按钮变为倒计时
this.isCountDownShow = true
```

4. 发送验证码请求，先在api中封装发送验证码方法

```javascript
//校验方法
// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}` //路径参数
    })
}
// 引入后再引用
try {
    await.sendSms(this.user.mobile)
    this.$toast('发送成功')
} catch (err) {
    // 发送失败关闭倒计时
    this.isCountDownShow = false
        if(err.response.status === 429){
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
```

## 处理用户Token

只有在用户第一次登陆成功后才有token

很多模块中要用到，所以要放在公共位置

Vuex容器响应式，存取方便但刷新页面会丢失需要存到本地存储中

在store/index.js中

```javascript
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 防止刷新数据丢失需将数据存到本地存储中
      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
………………
})
```

在views/login/index.js中登陆成功后commit调用setUser方法并传入数据

```javascript
try {
    //从res中结构data
  const {data} = await login(user)
  //数据包含token和refreshtoken
  this.$store.commit('setUser', data.data)
  this.$toast.success('登录成功')
}
```

* > 组件中读取vuex中的数据：```$store.state.sum```

* > 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

## 封装本地存储操作模块

创建 `src/utils/storage.js` 模块。

```javascript
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
// 在store/index.js中引入并使用
user: getItem(TOKEN_KEY)
setItem(TOKEN_KEY, state.user)
```

## Token过期问题

# 三、个人中心

## TabBar处理

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231174402503.png" alt="image-20211231174402503" style="float: left; zoom:67%;" />

1. 在父路由views/layout/index.vue中引入Vant的TabBar基本样式并修改图标及文字

```javascript
//一个空页面，包含一个 tabbar，中间留子路由出口<router-view/>
<van-tabbar-item to="/">
     <i slot="icon" class="toutiao toutiao-shouye"></i>
     <span class="text">首页</span>
 </van-tabbar-item>
```

2. 另外分别在views中建立四个组件home, qa, video,my
3. 在router/index.js中配置路由及其子路由(子路由使用children配置)

```javascript
{
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由，只能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
```

4. 使用Vant提供的TabBar路由模式实现点击切换路由

```javascript
//给外部添加route，每个标签使用to
<van-tabbar class="layout-tabbar" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>
        </van-tabbar-item>
```

## 页面布局

### 顶部未登录

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231202745127.png" alt="image-20211231202745127" style="float: left; zoom: 50%;"/>

在views/my/index.vue中写结构及样式

点击图标&文字跳转到登录页面`<div class="login-btn" @click="$router.push('/login')">`

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231203548245.png" alt="image-20211231203548245" style="float: left; zoom:50%;" />

给登录左边添加按钮及后退功能`<van-icon slot="left" name="cross" @click="$router.back()"/>`

> 编程式路由导航
>
> $router.forward() //前进 $router.back() //后退
>
> $router.go() //可前进也可后退，正数前进几步，负数后退几步

### 顶部已登录

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231212036063.png" alt="image-20211231212036063" style="float:left;zoom:50%;" />

头像参照Vant的image，邮编Vant的button

上半部分flex布局space-between，下半部分flex布局center

### 宫格导航

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231214709729.png" alt="image-20211231214709729" style="float: left;zoom:67%;" />

参考Vant的Grid布局

### 单元格导航

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20211231221647194.png" alt="image-20211231221647194" style="float: left;zoom:67%;" />

参照Vant的cell

## 处理页面显示状态

1. 先用mapState获取vuex中的state中的user

```react
// 引入并获取
import {mapState} from 'vuex'
computed: {
    ...mapState(['user'])
  }
```

2. 利用v-if v-else根据user内容是否为空判断显示登陆头部还是未登录头部`v-if="user"` `v-else`

   退出登陆按钮也要用v-if判断

3. 标签栏底部根据user用三元表达式判断我的、未登录

`<span class="text">{{$store.state.user? "我的" : "未登录"}}</span>`

4. 登陆成功后应该返回上一页`this.$router.back()`

## 用户退出

给退出登陆按钮绑定单击事件，先使用Vant的Dialog 弹出框确认弹窗，取消不操作，确认清除user内容及本地token

> 使用vuex中的mapState获取user好处是响应式，只要user内容改变页面就改变

```javascript
onLogout(){
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          return
        })
    }
```

## 展示当前登录用户信息

1. 在`api/user.js`中封装请求方法

```javascript
/**
 * 获取用户自己的信息
 */
//需引入store
import store from '@/store'
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // 发送请求头数据
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
```

2. 在 `views/my/index.vue` 请求引入请求方法并获取数据

```javascript
created(){
    // 实例创建后html页面加载完成之前发送请求
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  }
  methods: {
    async loadUserInfo(){
      try {
        const {data} = await getUserInfo()
        console.log(data);
        this.userInfo = data.data //在data中先定义userInfo
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
```

3. 引用数据到模板中`:src="userInfo.photo"`

## 优化设置Token(请求拦截器)

给通过条件设置的的请求路径添加请求头Authorization

这样给有需要授权才能访问的请求自动添加请求头

```javascript
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象
    const { user } = store.state //需引入import store from '@/store'
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
    return config
  }, function (error) {
    // 如果请求出错了（还没有发出去）会进入这里
    return Promise.reject(error)
})
```

# 四、首页

## 头部导航栏

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220101222648636.png" alt="image-20220101222648636" style="float: left; zoom: 80%;" />

使用nav-bar及button组件，需使用::v-deep更改Vant默认样式

## 文章频道列表

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220102153008171.png" alt="image-20220102153008171" style="float: left;zoom: 67%;" />

### 使用 Tab 标签页组件

1. 给每个tab设置宽无效：因为使用flex布局每个均设22%等分，min-width有效

2. 点击某个tab字体变色：给class是active的设置颜色

3. 导航条宽设置了无效：浏览器样式中显示的样式被划掉，原因是等级不够，需加!important

### 处理汉堡按钮

1. 利用Tab中的slot="nav-right"将更多符号固定在页面右侧，背景设置白色并添加透明度

2. 符号前面的渐变竖线利用伪类:before插入图片

```css
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
```

### 获取展示数据

在api/user.js中封装获取用户列表频道方法

在views/home/index.vue中引入并使用

```javascript
created(){
    this.loadChannels()
  },
  methods: {
  async loadChannels () {
    try {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    } catch (err) {
      this.$toast('获取频道数据失败')}}}
```

根据返回数据绑定到模板中，用v-for进行列表渲染

```javascript
<van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key = "channel.id"
      >
```

## 文章列表

### 创建列表组件

Home中每一个标签都对应一个列表组件，需将列表组件封装，再按需引入

组件中接收每个标签传过来的参数，通过参数发送请求将数据存储到list中，再通过list内容渲染模板

### 使用List列表组件

参考Vant的List组件，组件完成后导入到home中

```javascript
<van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key = "channel.id"
      >
       <article-list :channel="channel"/>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
```

### 请求获取数据

onLoad事件中发送请求

1. 先在api/article.js中封装获取文章列表的方法

```javascript
// 获取文章列表
 export const getArticles = params => {
   return request({
     method: 'GET',
     url: '/v1_1/articles',
     // params 选项用来配置 Query 参数
     params
   })
 }
```

2. 在onLoad事件中引用发送请求方法并传入所需参数

```javascript
..........
getArticles({
    channel_id: this.channel.id,//此为父组件传过来的频道id
    timestamp: this.timestamp || 1556789000001, //请求第一页数据用当前时间戳，之后的数据用接口返回的时间戳
    with_top: 1 //是否有置顶
)}
```

### 处理响应结果&请求失败处理

```javascript
// 拿到数据后将之push到list中，同时将loading改为false不显示加载中图标
this.list.push(...results)
this.loading = false
//判断数据是否全部加载完成
if(results.length){
    // 更新获取下一页数据的时间戳
    this.timestamp = data.data.pre_timestamp
} else{
    // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
    this.finished = true
} catch (error) {
          // 展示错误提示状态
          this.error = true // 此方法为list组件中错误提示方法
          // 请求失败了，loading 也需要关闭
          this.loading = false
}
```

### 下拉刷新功能

参考Vant的PullRefresh 下拉刷新组件

包裹需要刷新的内容，在onRefresh中发送请求

```javascript
// axios请求同onLoad，只是时间戳需要当前最新时间戳，并将数据通过unshift添加到前方
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
// 获取数据错误则提示刷新失败
        catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
```

### 头部固定位置

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220103133632388.png" alt="image-20220103133632388" style="float: left;zoom:50%;" />

NavBar组件有自带的fixed属性可固定，Tab标签页通过`position:fixed`进行相应调整

### 记住列表滚定位置

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220102224539700.png" alt="image-20220102224539700" style="float: left;zoom: 80%;" />

是body在滚动所以列表滚动位置相互影响

解决办法：给列表高度并设置滚动条overflow-y: auto

```css
.article-list {
  // 百分比单位是相对于父元素的，而父元素都没有高，此方法不可行
  // height: 100%;

  // 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow-y: auto;
}
```

## 文章列表项

### 准备组件

使用Vant的Cell 单元格组件，在components/article.item/index.vue中使用van-cell标签

并将article.item引入到article-list中

```vue
<van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        >
    <article-item
        v-for="(article, index) in list"
        :key="index"
        :article="article"
    />
    </van-list>
```



### 展示列表项内容

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220103142519110.png" alt="image-20220103142519110" style="float: left;zoom:50%;" />

均使用slot

```vue
  <van-cell
    class="article-item"
  >
    <div slot="title" class="title">{{ article.title }}</div>
    <div slot="label">
        // 若三张图写在标签上方
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
      <div>
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
      // 一张图在最右侧显示
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      :src="article.cover.images[0]"
    />
  </van-cell>
```

### 样式调整

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220103152607156.png" alt="image-20220103152607156" style="float: left;zoom: 67%;" />

标题宽度窄，因为此list是flex布局平分1:1，将图片的flex设成unset

……

### 图片403资源问题

服务端使用Referer请求头识别访问来源，做保护处理的会返回403

解决办法：不发送referrer

```html
<!--在public的html页面中写入-->
<meta name="referrer" content="no-referrer" />
```

### 处理相对时间

使用dayjs处理时间[Day.js](https://day.js.org/)

1、安装

```sh
npm i dayjs
```

2、创建 `utils/dayjs.js`

```js
import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

```

3、在 `main.js` 中加载初始化

```js
import './utils/dayjs'
```

4、使用

使用过滤器：

```html
<p>{{ 日期数据 | relativeTime }}</p>
```

# 五、频道编辑

## 使用弹出组件

Popup 弹出层

## 创建频道编辑组件

1. 创建 `views/home/components/channel-edit.vue`
2. 在首页中引入并使用

```javascript
<van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <channel-edit />
    </van-popup>
```

## 页面布局

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220103195536141.png" alt="image-20220103195536141" style="float: left;zoom:50%;" />

## 展示我的频道

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220104100303441.png" alt="image-20220104100303441" style="float: left; zoom:50%;" />

将父组件中的频道列表传给channel-edit组件进行渲染

```vue
// 父组件中传参
<channel-edit :myChannels="channels"/>
// 子组件声明接收并使用
<van-grid-item v-for="(channel, index) in myChannels" :key="index">
   <span slot="text">{{ channel.name }}</span>
</van-grid-item>
props: {
    myChannels: {
      type: Array,
      required: true
    },
```

## 处理激活频道高亮

将首页中的active传递给频道编辑组件，频道编辑组件利用v-bind绑定样式

```javascript
// 等式true展示active样式，否则不展示
:class="{ active: index === active }"
```

## 展示推荐频道

接口只有全部频道，需将全部频道-我的频道

1. 封装获取所有频道的请求api/channel.js

```javascript
export const getAllChannels = ()=>{
    return request({
        method:"GET",
        url:"'/v1_0/channels'"
    })
}
```

2. 在频道编辑组件中引入并使用

```javascript
created () {
    this.loadAllChannels()
  }
methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels // allChannels为数组
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
```

3. 利用computed计算出推荐频道的内容(计算属性会观测内部依赖数据的变化，如果依赖的数据发生变化，则计算属性会重新执行)

```javascript
computed(){
    recommendChannels(){
        return this.allChannels.filter(channel=>{
            //此函数为filter的判断条件，若成立则存到filter过滤出来的数组中
            return ！this.myChannels.find(myChannel=>{
                return myChannel.id === channel.id
            })
        })
    }
}
```

4. 拿到重新计算后的属性渲染推荐频道列表

```javascript
<van-grid-item
v-for="(channel, index) in recommendChannels"
:key="index"
:text="channel.name" 
/>
```

## 添加频道

给频道推荐的item添加单击事件并将当前被点击的channel传递过去`onAddChannel(channel)`，将channel内容添加到我的频道列表中

```javascript
onAddChannel (channel) {
      this.myChannels.push(channel)
    }
```

## 处理编辑状态

给我的频道右上角添加×符号，通过isEdit的布尔值控制显示和隐藏、右边按钮的操作编辑和完成

```vue
<van-icon
    v-show="isEdit && !fiexdChannels.includes(channel.id)"// 推荐频道不删除不需要添加符号
    slot="icon"
    name="clear"
></van-icon>
@click="isEdit = !isEdit"
<van-button @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
```

## 切换频道

点击频道的时候获取到频道的channel和index`@click="onMyChannelClick(channel, index)"`

若在非编辑状态下，将index的值传递给父组件并关闭弹窗

## 删除频道

在编辑状态下，如果是固定频道不删除，否则删除频道

若点击的索引号小于被激活的索引，被激活的索引要-1

接收的父组件传过来的props参数myChannels和active不能直接在子组件中修改，需用$emit触发父组件中的自定义事件进行修改

```javascript
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2. 删除频道项
        this.myChannels.splice(index, 1)
        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 - 1并传递参数
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    }
```

```javascript
// 父组件中自定义事件
<channel-edit @update-active="onUpdateActive"/>
  onUpdateActive(index, isChennelEditShow = true){
    // 更新激活的频道项
    this.active = index
    // 关闭编辑频道弹层
    this.isChennelEditShow = isChennelEditShow
}
```

## 数据持久化

### 添加频道

在onAddChannel方法中判断是否登录，若登录，发请求保存数据，未登录，保存到本地

1. 封装添加用户频道方法

```javascript
export const addUserChannel = channel =>{
    return request({
        method: "PATCH"
        url:"/v1_0/user/channels"
        data:{
        	channel=[channel]
    	}
    })
}
```

2. 在频道编辑组件中引入并使用

```javascript
// 需引入mapState在computed中映射user
import { mapState } from 'vuex'
computed(){
    ...mapState(['user'])
}
async onAddChannel (channel) {
    this.myChannels.push(channel)
    if(this.user){
        //登录发送添加请求
        try{
            await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
            })
            
        } catch(err){
            this.$toast('保存失败，请稍后重试')
        }
    }else{
        //未登录保存本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
    }
}
```

### 删除频道

在onMyChannelClick方法中删除频道项后处理`this.deleteChannel(channel)`，原理同添加频道

1. 封装删除用户频道方法

```javascript
 export const deleteUserChannel = channelId => {
   return request({
     method: 'DELETE',
     url: `/v1_0/user/channels/${channelId}`
   })
 }
```

2. 在频道编辑组件中引入并使用

```javascript
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
```

## 正确获取展示首页频道列表

在父组件created中的方法loadChannels判断是否是登录状态，是发送请求，不是看本地存储，有就展示本地存储的内容，无发送请求展示内容

```javascript
async loadChannels(){
    try{
    let channels = []
    if(this.user){
         // 已登录，请求获取用户频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
    } else {
         // 未登录，判断是否有本地的频道列表数据
        const localChannels = getItem('TOUTIAO_CHANNELS')
        if(localChannels){
            channels = localChannels
        } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
        }
    }
    this.channels = channels
  } catch(err){
      this.$toast('获取频道数据失败')
  }
}
```

# 六、文章搜索

## 创建组件并配置路由

在view中创建search/index.vue组件并在router/index.js中配置

## 页面布局-搜索栏

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220104215936045.png" alt="image-20220104215936045" style="float: left;zoom: 67%;" />

使用Search搜索组件

## 页面布局-完成

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220104220356476.png" alt="image-20220104220356476" style="float: left;zoom:50%;" /><img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220104220548766.png" alt="image-20220104220548766" style="zoom:50%;" />









## 处理页面展示逻辑

设置一个data用来控制搜索结果的展示`isResultShow: false`

* 输入框无内容展示搜索历史

* 输入框有内容展示搜索联想

* 输入框搜索/回车通过search事件将isResultShow变为true展示搜索结果

* 当光标聚焦时通过focus事件将isResultShow变为false再根据输入框有无内容进行展示

```javascript
<van-search
            v-model="searchText"
            @search="onSearch"
            @focus="isResultShow = false"
        />
<search-result v-if="isResultShow"/>
<search-suggestion v-else-if="searchText"/>
<search-history v-else/>
```

## 联想建议

### 获取并监视输入框内容的变化

父组件将文本框内容传给子组件search-suggestion

子组件中接收并监视当内容变化时调用函数

### 请求获取展示数据

封装搜索联想请求方法引入并使用

```javascript
// 父传参
<search-suggestion :searchText="searchText" />
// 子接收并监视
props: {
    searchText: {
      type: String,
      required: true
    }
  }
  watch: {
    searchText:{
      immediate: true, // 第一次输入不监视是因为模块在第一次输入后才出来，需让它在初始化时就调用
      handler(value){
          this.loadSearchSuggestions(value)
      }
    }
  }
// 当内容变化时发送请求
  methods: {
    async loadSearchSuggestions(q){
      try {
        const {data} = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
// 应用到模板中
<van-cell
    :title="text"
    v-for="(text,index) in suggestions"
    :key="index"
></van-cell>
```

### 优化防抖

使用lodash防抖[lodash](https://www.lodashjs.com/)

1. `npm i lodash`
2. `import { debounce } from "lodash"`(lodash 支持按需加载，有利于打包结果优化)

3. 修改代码

```javascript
handler: debounce(function(value){
        this.loadSearchSuggestions(value)
      }, 200)
     /*  handler(value){
          this.loadSearchSuggestions(value)
      } */
```

### 搜索关键字高亮

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220105143135653.png" alt="image-20220105143135653" style="float: left;zoom:50%;" />

用string.replace方法把字符替换成带样式的，在模板中用v-html解析出带样式的表达式

string.replace第一个参数可以是字符串/正则表达式，若正则表达式内容是变量需使用构造函数手动new RegExp

```javascript
<div slot="title" v-html="highlight(text)"></div>
highlight(text){
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
```

## 搜索结果

### 传递搜索内容

将被点击的搜索联想建议列表中的内容传递给父组件的search事件

```javascript
// 只能通过父组件更改搜索框内容
<van-cell @click="$emit('search', text)">
```

在search事件的onSearch函数中将searchText改为传递过来的值，这样搜索框就会出现被点击的内容

```javascript
<search-suggestion @search="onSearch"/>
onSearch(val) {
      this.searchText = val
      this.isResultShow = true
    }
```

将searchText的内容传递给search-result组件，并在该组件中用searchText发请求将内容进行渲染

```javascript
<search-result :searchText="searchText" />
```

### 处理完成

```javascript
    async onLoad() {
      // 发送请求
      try {
        const {data} = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        const {results} = data.data
        // 结果保存到list中
        this.list.push(...results)
        // 关闭loading状态
        this.loading = false
        // 判断是否还有结果，有页码++
        if(results.length){
          this.perPage++
        } else {
          // 无finished为true
          this.finished = true
        }
      } catch (error) {
        this.error = true,
        this.loading = false
      }
    }
```

## 历史记录

### 添加历史记录

在data中设置`searchHistories: []`

在onSearch方法中添加历史记录

```javascript
onSearch(val) {
      // 更新文本框内容
      this.searchText = val
     // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if(index !== -1){
        this.searchHistories.splice(index,1)
      }
      this.searchHistories.unshift(val)
      // 展示搜索结果列表
      this.isResultShow = true
    }
```

### 展示历史记录

父组件中奖searchHistories数组传给历史记录组件

组件中接收参数并渲染

### 处理删除显示状态

在data中添加isDeleteShow=false，用v-if/v-else/v-show绑定相关内容

### 处理删除操作

在编辑状态时，点击×删除该条记录（splice方法），点击全部删除需通过自定义方法让父组件将searchHistories清空

非编辑状态调用父组件的搜索方法

```javascript
<span @click="$emit('clear-search-histories')">全部删除</span>
onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录数据
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    }
```

### 数据持久化

使用watch属性监视searchHistories的变化，一变化就保存到本地

若有本地数据就展示，无即为空数组

```javascript
searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
watch: {
    // 搜索历史内容一变化就保存到本地
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  }
```

# 七、文章详情

## 创建组件配置路由

1. 创建 `views/article/index.vue` 组件
2. 在router/index.js中配置路由

```javascript
{
    path: '/article/:articleId', // 点击不同列表对应不同文章路径要有文章id
    name: 'article',
    component: () => import('@/views/article')
  }
```

3. 给article-item配置点击后跳转的目标路由对象（给最外侧标签配置）

```javascript
  <van-cell
    class="article-item"
    :to="{
      // 根据路由名称进行跳转
      name: 'article',
      // 传递路由动态参数
      params: {
        // 属性名：路由路径中设计的动态参数名称
        articleId: article.art_id
      }
    }"
  >
(:to="`/article/${article.art_id}`")
```

## 使用组件Props解耦路由参数

路由的props配置让路由组件更方便的收到参数

props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给article组件

```javascript
// 路由中配置
{
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
  }
// 组件中声明接收
props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  }
```

## 页面布局

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220105195748628.png" alt="image-20220105195748628" style="float: left;zoom:50%;" />

## 请求获取文章数据404

发送获取文章请求均返回404

原因：后端返回的数据是json格式，axios发送请求时会把接收到的json数据通过JSON.parse自动帮我们转换为对象格式，但超出安全整数范围（-2^53~2^53）无法精确表示，所以会造成转换前后id不一样

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220105210041961.png" alt="image-20220105210041961" style="float: left;zoom: 67%;" />

解决方法：[json-bigint](https://github.com/sidorares/json-bigint)

1. npm i json-bigint
2. 在utils/request.js中引入并使用（参考[axios.api](https://github.com/axios/axios#axios-api)中Request Config）

```javascript
import JSONBig from 'json-bigint'
// 在基础路径中设置
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/app',
  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})
```

3. 从article-list组件中发送请求article数据内容是被JSONBig.parse了，article-list将article传给article-item，

给每个item添加点击跳转路由事件即`:to=……`将JSONBig.parse数据传给路由

在路由配置文件中开启了props传参，即将art_id传给了article组件，所以axios函数中的参数是JSONBig.parse格式的对象，则在声明prop类型是需添加Object类型

```javascript
async loadArticle(){
      try {
        const {data} = await getArticleById(this.articleId)
        console.log(data);
      } catch (err) {
        console.log('获取数据失败', err);
      }
    }
```

请求方法中传入的参数是JSONBig对象，字符串拼接后会默认toString

JSONBig.parse(article).toString()

```javascript
// 获取文章
 export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
```

## 展示文章详情

拿到数据后渲染

图片需动态加载`:src="article.aut_photo"`

注意日期需用到之前的dayjs转换`{{article.pubdate | relativeTime}}`

含样式的标签需使用`v-html="article.content"`解析

## 处理内容加载状态

1. 在data中设置加载中状态`loading: true`

2. 加载中组件设置`v-if="loading"`

3. 加载完成文章详情设置`v-else-if="article.title"`（随便设置一个加载完成后才有的参数进行判断）

4. 加载失败404设置`v-else-if="errStatus === 404"`（需在data中设置errStatus: 0）

5. 加载失败其它未知错误设置`v-else`其中点击重试按钮需绑定点击事件`@click="loadArticle"`（因为失败需再次发送，之前的loading状态为关闭，调用函数时要先将loading改为true）

6. 在加载文章函数中，无论加载成功或失败，结束后都需将loading改为false

   在加载失败中判断状态码是不是404，是就将errStatus改为404

```javascript
async loadArticle(){
      this.loading = true
      try {
        const {data} = await getArticleById(this.articleId)
        /* if (Math.random() > 0.5) {
          JSON.parse('dsankljdnskaljndlkjsa')
        } */
        this.article = data.data
      } catch (err) {
        if(err.response && err.response.status === 404){
          this.errStatus = 404
        }
        console.log('获取数据失败', err.response);// response可能是对象也可能是undefined
      }
      this.loading = false
    }
```

## 文章正文样式markdown-css

文章正文包括各种数据：段落、标题、列表、链接、图片、视频等资源。

- 将 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 样式文件(点击raw)下载到项目中并在样式中引入`@import "./github-markdown.css";`文章内容class类名添加`markdown-body`
- 配置不要转换样式文件中的字号，在postcssrc.js中配置不要转换的样式资源`exclude: 'github-markdown'`

## 图片点击预览

需用到Vant的ImagePreview 图片预览组件

我们获取到的文章内容是html结构，需要先拿到这个结构，再拿到img元素标签，再拿到标签中的src存储到数组中进行遍历并给并给每个图片元素添加点击事件使用图片预览组件

```javascript
// 在发送请求赋值完成后获取节点
// 该地方获取到的节点是undefined，article数据更新驱动页面更新不是立即的，所以要在异步函数中获取dom元素
        setTimeout(()=>{
          this.previewImage()
        },0)
    previewImage (){
      // 先获取到整个文章节点
      const articleContent = this.$refs['article-content']
      // 再从中获取到图片的相关dom元素
      const imgs = articleContent.querySelectorAll('img')
      // 声明一个空数组存放图片地址
      const images = []
      // 遍历出img元素中的图片地址
      imgs.forEach((img, index)=>{
        images.push(img.src)
        img.onclick = ()=>{
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    }
```

## 关注用户

### 视图处理

给已关注样式绑定`v-if="article.is_followed"`，关注样式绑定`v-else`

### 实现基本功能

1. 在api/user.js中封装取消关注和添加关注方法
2. 给已关注和关注添加点击事件`@click="onFollow"`
3. 在onFollow方法中判断是否关注来发送相应请求，另用户自己不能关注自己需作出提示

```javascript
async onFollow(){
      try {
        if(this.article.is_followed){
          // 已关注，取消关注
          await deleteFollow(this.article.aut_id)
        } else {
          // 未关注，添加关注
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败，请重试！'
        if(err.response && err.response.status === 410) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
    }
```

### loading处理

给已关注和关注添加loading属性(button组件带有loading属性)，通过followLoading判断是否展示，followLoading默认false

点击后调用onFollow函数先将loading开启，在发送请求后（无论成功失败）关闭loading

### 关注用户组件封装

1. 在很多地方都需用到这个功能，因此需要对此功能样式进行封装，将它放到公共组件中`components/follow-user/index.vue`
2. 将结构和方法复制到该文件中，并在父组件article组件中引入注册使用，并将参数传递给子组件

```javascript
<FollowUser 
       class="follow-btn" // 传递样式
       :isFollowed="article.is_followed" // 传递是否关注参数
       :userId="article.aut_id" // 传递文章作者id
// 子组件中要求更改关注状态需在父组件中完成，模板中的 $event 是事件参数（!this.isFollowed）
       @update-is_followed="article.is_followed = $event"
  />
```

3. 子组件中接收参数并修改

```javascript
// 子修改关注状态需触发父的自定义事件进行修改
this.$emit('update-is_followed', !this.isFollowed)
```

### 在组件上使用v-model

当子组件传递给父组件的数据既要使用也要修改可以使用v-model

v-model默认传给子组件的参数名为value，自定义事件名为input，可利用model更改名称

```javascript
// 父组件中用v-model可省略传参并更改状态的步骤
<FollowUser v-model="article.is_followed" />
    
// 子组件中可用model修改默认数据名称
// 自定义v-mode的数据名称
  model:{
      prop: 'isFollowed', // 默认value
      event: 'update-is_followed' // 默认input
  }
```

## 文章收藏

### 准备组件

涉及到重用也放到组件中components/collect-article/index.vue

将结构放到该文件中，父组件引入注册并使用

### 视图处理

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220106212540581.png" alt="image-20220106212540581" style="float: left;zoom:100%;" />

通过article.is_collected判断

通过v-model将此数据传给子组件

```javascript
<collect-article v-model="article.is_collected" />
// 父组件接收并依此判断空心实心和颜色
<van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{collected: value}" // 此为v-bind绑定样式方法，true应用样式，false不引用
/>
props: {
    value: {
      type: Boolean,
      required: true
    },
  },
```

### 处理完成

在api/article.js中封装收藏和取消收藏方法

在collect-article中引入方法并使用

```javascript
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没有收藏，添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
```

## 文章点赞

### 准备组件&处理完成

同文章收藏，需注意点赞是1，不点赞是-1

```javascript
<like-article v-model="article.attitude" />
<van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onLike"
  />
```



```javascript
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          // 没有点赞，添加点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
```

# 八、文章评论

## 展示文章评论列表

### 准备组件

为了更好的开发和维护，这里我们把文章评论单独封装到一个组件中来处理。

创建 `src/views/article/components/comment-list.vue`

基本结构

```vue
<van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :comment="item.content"
    />
  </van-list>
```

并在父组件中引入注册使用并传入文章id`<comment-list :source="article.art_id" />`

### 获取数据并展示

在api/comment.js中封装获取评论方法

在comment-list中引入并使用，获取数据后遍历展示到模板中

```javascript
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: 'a', //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
```

### 展示文章评论总数量（子传父通过自定义函数）

1. 在父组件中先定义一个数据`totalCommentCount: 0` 并与评论图标的badge绑定`:badge="totalCommentCount"`

2. 子组件中在发送请求拿到数据后触发自定义方法并传参让父组件修改

​	`this.$emit('onload-success', data.data)`

3. 父组件在该组件中监听该方法并修改totalCommentCount参数

​	`@onload-success="totalCommentCount = $event.total_count"`

### 评论列表项组件

新建article/components/comment-item.vue

将该组件引入到article.list中并使用，将comment内容传递给comment-item

```javascript
<comment-item
   v-for="(item, index) in list"
   :key="index"
   :comment="item.content"
/>
```

子组件中接收并将数据渲染到模板中

### 评论点赞

#### 视图处理

根据comment数据里的is_liking的值判断

```javascript
:class="{liked: comment.is_liking }" // 判断颜色
:icon="comment.is_liking ? 'good-job' : 'good-job-o'" //判断空心实心
```

#### 处理完成

在api/comment.js中封装对评论点赞和取消评论点赞方法

在点赞按钮绑定点击事件`@click="onCommentLike"`

```javascript
async onCommentLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          // 已赞，取消点赞
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count-- //没有对object进行直接复制修改，不需调用$emit让父组件该内容
        } else {
          // 没有点赞，添加点赞
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.commentLoading = false
    }
```

## 发布文章评论

### 准备弹出层

在文章详情最后添加一个popup组件，v-model绑定`v-model="isPostShow"`默认false

给发布评论按钮添加点击事件`@click="isPostShow = true"`

### 准备组件

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220107143036115.png" alt="image-20220107143036115" style="float: left;zoom:67%;" />

添加article/components/comment-post.vue，并在article组件中引入注册使用

### 请求发布

现在api/comment.js中封装发布评论或评论回复方法

再在comment-post中引入并使用，需通过父组件传递文章id`:target="article.art_id"`

### 发布成功处理

触发请求发布后

1. 显示发布中（$toast.loading...在发送请求函数一开始就调用），

2. 获取数据后清空文本框`this.message=''`

3. 关闭弹窗，并将最新发布的放在列表最前边

```javascript
// 以上均在父组件中实现
this.$emit('post-success', data.data) // comment-post中触发方法
// 父组件中监听
@post-success="onPostSuccess"
onPostSuccess (data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
```

```javascript
// 父组件article中要用到子组件comment-list中的list，
方法：父组件传一个空的commentList数组给子组件，子组件声明接收默认值数组，子组件中可通过unshift对数组进行修改传递给commentList
// 父组件传一个空的commentList给子组件
<comment-list :list="commentList" />
// 子组件声明接收默认值数组
list: {
      type: Array,
      default: () => [] //vue中默认空数组或对象不能直接写，须通过函数
    }
```

4. 发布完成后提示发布成功`this.$toast.success('发布成功')`，

### 发布空内容处理

button有disabled属性`:disabled="!message.length"`

防止按空格键也能发布，v-mode有个修饰符trim可过滤掉首尾空格`v-model.trim="message"`

# 九、评论回复

## 准备弹出层

在main-wrap后面写弹出层样式

```javascript
<van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 100%;"
>hello</van-popup>
```

## 点击回复展示弹出层

在comment-item中才有回复的按钮可绑定点击事件

* 但在此组件中操作无效，需要将方法传递给父comment-list`@click="$emit('reply-click', comment)"`

* 再通过comment-list传递给article`@reply-click="$emit('reply-click', $event)"`

* 在article中修改是否展示弹层`@reply-click="onReplyClick"`

```javascript
onReplyClick(comment){
	this.isReplyShow = true
}
```

## 封装组件

封装组件在article/components/comment-reply.vue中

并在article中引入注册使用

## 将点击回复的评论项传给评论回复组件

由于之前的点击事件已经将comment传递给了父组件，此时只需要将接收到的参数赋值给data中新定义的`currentComment:{}`，`this.currentComment = comment`并传递给comment-reply组件`<comment-reply :comment="curentComment">`

## 处理头部及当前评论项

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220107204447137.png" alt="image-20220107204447137" style="float: left;zoom:67%;" />

点击关闭弹层需在父组件中操作

子`@click="$emit('close')"`父`@close="isReplyShow = false"`

## 展示回复列表

### 基本处理

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220107211619759.png" alt="image-20220107211619759" style="float: left;zoom:50%;" />

复用comment-list组件在发送请求时source和type不一样需更改

```javascript
<comment-list
   :source="comment.com_id" // 原先是文章id，这里需要评论id
   type="c" // c为评论的回复，a是文章的回复
/>
```

子组件comment-list需在props中定义type

```javascript
type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }

type: this.type
source: this.source.toString()
```

会出现400报错原因：

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220107213721211.png" alt="image-20220107213721211" style="float: left;zoom:100%;" />

GET 参数使用 params 进行传递，我们写的时候是对象，但是最终发给后端的数据是？axios 会把 params 对象转为 key=value?key=value 的格式放到 url 中发送，将数据进行了url编码拼接因此会有%22

评论id是大数据所以是对象格式，而如果传的数据是字符串拼接就不会有多余的引号

`source: this.source.toString()`

### 解决重复数据问题

评论的回复复用了comment-list组件，请求数据后四条回复变成了8条，等于发了两次请求

**原因**：在封装的comment-list中，使用的Vant的list组件需要在可视区域才会自动触发onLoad事件，为了打开文章后就能看到评论数量，我们手动在created时调用onLoad会先加载一次，当滑动到评论后再加载，而我们复用到评论列表中，手动调用的函数和在可视区调用的函数会同时进行，因此会有两次的结果出现

**解决方法**：Vant的list组件中immediate-check属性用于关闭List 初始化后会触发一次 load 事件，即手动触发了就不会当出现在可视区在初始化`:immediate-check="false"`

### 解决内容不重新获取问题

**问题**：点回复按钮弹出层显示再点击别的评论评论列表内容一样

**原因**：（弹出层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容，之后它的关闭和显示都是在切换内容的显示和隐藏），组件没有被销毁，就不会触发onLoad发送请求加载全部评论，所有始终展示的是一开始加载的评论

**思路**：弹出层关闭的同时也要将组件进行销毁，这样下次再点击的时候可以重新渲染组件

**方法**：v-if为false的时候DOM元素会被移除，将v-if绑定"isReplyShow"，不展示弹出层组件被移除掉而不是隐藏

## 处理底部视图布局

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220108114955731.png" alt="image-20220108114955731" style="float: left;zoom:100%;" />

van-button按钮，同时要让中间的评论展示区域固定，给评论区设置宽高并溢出滚动`overflow-y: auto`

## 参数处理（依赖注入）

父组件给所有后代组件提供数据（使用前提：很多后代组件均要使用该数据）

```javascript
// 父组件export default中添加属性
provide: function () {
    return {
      articleId: this.articleId
    }
  },
// 要使用数据的后代组件声明接收，export default中添加属性
inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
```

## 处理完成

comment-post组件中触发了post-success事件，我们在父组件comment-reply中使用了该组件，因此我们要在引入的comment-post监听事件`@post-success="onPostSuccess"`

```javascript
onPostSuccess(data){
    // 更新评论数量
    this.comment.reply_count++
    // 关闭弹层
    this.isPostShow = false
    // 将评论内容添加到顶部
    this.commentList.unshift(data.new_obj)
}
```

# 十、编辑用户资料

## 创建页面组件并配置路由

1. 创建文件view/user-profile/index.vue

2. 在router/index.js中配置路由

```javascript
{
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
```

3. 给my页面的编辑资料按钮添加路由跳转`<van-button to="/user/profile">编辑资料</van-button>`

## 页面布局

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220109103858667.png" alt="image-20220109103858667" style="float: left;zoom:67%;" />

## 展示用户信息

在api/user.js中封装获取登录用户个人资料的方法getUserProfile

在user-profile中引入方法，在created是调用方法发送请求

将请求到的数据存到user: {}中并绑定到模板中

## 修改昵称

### 处理弹出层

<van-popup>绑定v-model="isUpdateNameShow"，当点击van-cell昵称时将isUpdateNameShow改为true

### 内容组件

将修改昵称弹窗的内容封装到user-profile/components/update-name.vue中，并在父组件中引入使用

### 内容布局

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220109141139008.png" alt="image-20220109141139008" style="float: left;zoom:67%;" />

点击取消，关闭弹窗`@click-left="$emit('close')"`

### 数据处理

1. 需要将父组件中的user.name传递给子组件update-name中，此数据不仅需要传递还要修改，所以用v-model绑定，子组件props中value接收数据

2. 另外点击昵称跳出的弹窗中需要显示原先的昵称，让`localName=this.user`

3. 修改昵称取消后再打开还是显示之前编辑未保存的内容，原因是取消时组件没有被销毁只是隐藏，因此需要在该组件中绑定`v-if="isUpdateNameShow"`

### 处理完成

1. 封装更新用户资料方法
2. 点击完成发送请求，先判断输入内容是否为空，若空提示
3. 成功后更新视图，关闭弹窗，提示成功

```javascript
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
```

## 修改性别

步骤同修改昵称

1. 先在父组件中准备弹出层，弹出层中的内容写到user-profile/components/update-gender.vue中

2. 该组件中使用Vant的picker组件，设置组件中默认选中项的索引`:default-index="value"`，在data设置选中项数据`localGender: this.value`

```javascript
// picker中选择后如何获取选择到的数据？
// 给选择器绑定onChange事件
<van-picker @change="onPickerChange" />
// 参考文档change事件的参数
onPickerChange(picker, value, index){
    this.localGender = index
}
```

3. 点击发送请求

```javascript
async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
```

## 修改生日

准备弹出层和内容组件

1. 内容需用到Vant的DatetimePicker 时间选择组件

```javascript
<van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
/>
props: {
    value: {
      type: String,
      required: true
    }
  },
data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value), // 将this.value字符串格式的转为Sun Jan 09 2022 17:03:45 GMT+0800 (GMT+08:00) {}格式
    };
  }
```

2. 点击确定修改数据，传的参数是字符串格式，需用dayjs转为字符串才能发送请求

```javascript
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
```

## 修改头像

### 图片上传预览

#### 1. 处理file-input

`<input type="file">`用于上传文件，用hidden将其隐藏

如何通过点击头像栏的同时点击input弹出选择文件框？

```vue
<!-- 给input框打标识 -->
<input type="file" hidden ref="file">
<!-- 点击头像弹出input框 -->
<van-cell @click="$refs.file.click()">
    
<!-- 给input框绑定change事件 -->
<input type="file" hidden ref="file" @change="onFileChange">
<!-- 获取上传的文件对象 -->
onFileChange(){
    <!-- 获取文件对象 -->
    const file = this.$refs.file.files[0]
    <!-- 基于文件对象获取blob数据 -->
    const data = window.URL.createObjectURL(file)
}
```

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220108195412959.png" alt="image-20220108195412959" style="float: left;zoom:100%;" />

#### 2. 功能处理

先在user-profile文件结构中加入编辑头像的弹层，设置数据isUpdatePhotoShow为false，在获取到文件blob数据后改为true

```vue
<van-popup v-model="isUpdatePhotoShow">
 <update-photo :img="img"/> // data中需定义img为null
</van-popup>
```

新建user-profile/components/update-photo.vue，在里边展示文件里选择的图片，此图片需要从父组件中传递图片url`<img class="img" :src="img">`

bug: file input框若选择同一张图片，则不会触发change事件进而显示弹出层，此时应该在函数最后将input框的value改为空

```javascript
onFileChange(){
    const file = this.$refs.file.files[0]
    this.img = window.URL.createObjectURL(file)
    this.isUpdatePhotoShow = true
    this.$refs.file.value = ''
}
```

#### 3. 样式处理

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220108205347436.png" alt="image-20220108205347436" style="float: left;zoom:50%;" />

给底部添加一个div包裹两个取消和完成div，背景改为黑色，并给取消添加点击事件关闭弹层

```javascript
<div class="cancel" @click="$emit('close')">取消</div>
// 父组件中
<update-photo @close="isUpdatePhotoShow = false" />
```

### 图片裁切

#### 初始化

[插件cropperjs](https://github.com/fengyuanchen/cropperjs)

1. npm install cropperjs

2. ```javascript
   // 在srcipt中引入
   import 'cropperjs/dist/cropper.css';
   import Cropper from 'cropperjs';
   ```

3. 确保图片有div包裹，图片块元素宽100%
4. 因为要操作dom元素，需在mounted中写入代码

#### 配置说明

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220108212303490.png" alt="image-20220108212303490" style="float: left;zoom:50%;" />

```javascript
mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  }
```

#### 获取结果的两种方式

```javascript
<div class="confirm" @click="onConfirm">完成</div>
onConfirm () {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        console.log(blob)
      })
    },
```

<img src="C:\Users\13619\AppData\Roaming\Typora\typora-user-images\image-20220108215101118.png" alt="image-20220108215101118" style="float: left;zoom:100%;" />

#### 处理完成

封装更新用户照片方法

在获取到裁切的文件对象后发送请求，注意该接口需要multipart/form-data格式

请求发送成功后关闭弹层，更新图片地址并提示更新成功

注意父组件的update-photo组件需绑定v-if="isUpdatePhotoShow"，否则组件不会被销毁下次选择别的图片还是展示之前的图片

```javascript
onConfirm () {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 错误的用法
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通 JavaScript 对象
        // updateUserPhoto({photo: blob})
        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则你必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob) // photo为需要传入的参数名称

        const { data } = await updateUserPhoto(formData)

        // 关闭弹出层
        this.$emit('close')

        // 更新视图
        this.$emit('update-photo', data.data.photo)
       // 父组件中更新 @update-photo="user.photo=$event"
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
```

