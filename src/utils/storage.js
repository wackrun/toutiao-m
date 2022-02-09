/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
   * 获取数据
   */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 有效的json格式字符串代码执行成功
    return JSON.parse(data)
  } catch (err) {
    // 不是有效的会报错直接返回
    return data
  }
}

/**
   * 删除数据
   */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
