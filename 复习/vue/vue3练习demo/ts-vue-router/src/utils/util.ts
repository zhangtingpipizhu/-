/**
 * 一些帮助函数
 */
import store from '../store'
// import { searchAvatarByUserId } from 'api/common/commonApi'


/**
 * 判断对象为空
 * @param v
 * @return {boolean}
 */
const isEmpty = (v:any) => {
  // console.log('typeof v ', v, typeof v)
  if (typeof v === 'undefined') {
    return true
  }
  if (v === undefined || v === 'undefined') {
    return true
  }
  if (v === null) {
    return true
  }
  if (v === '' || v === 'null') {
    return true
  }
  if (v === 0) {
    return true
  }
  switch (typeof v) {
    case 'string' :
      if (v.trim().length === 0) {
        return true
      }
      break
    case 'boolean' :
      if (!v) {
        return true
      }
      break
    case 'number' :
      if (v === 0) {
        return true
      }
      break
    case 'object' :
      return undefined !== v.length && v.length === 0
  }
  return false
}
/**
 * @method 使用store缓存一些用户基本数据
 */
function setBaseInfoOfStore (key:string, value:any) {
  let stores = {
    ...store.getters.getBaseDataSaveData
  }
  stores[key] = value
  store.commit('setBaseDataSaveData', stores)
}

/**
 * @method 存储数据到localStorage中
 * @param {*key值} key
 * @param {*值} val
 */
function setLocalValue (key:string, value:any) {
  key = 'local.' + key
  const currentTime = new Date().getTime()
  localStorage.setItem(key, JSON.stringify({
    value: value,
    time: currentTime
  }))
}
/**
 * @method json 转string
 */
function judgetFieldValue (json:any) {
  let str = ''
  for (let key in json) {
    if (json[key] === false || json[key] === 0 || !isEmpty(json[key])) {
      str += `&${key}=${json[key]}`
    }
  }
  return str
}
/**
 * @method 获取localStorage中某个的数据
 * @param {*key值} key
 */
function getLocalValue (key:string) {
  try {
    key = 'local.' + key
    const value = localStorage.getItem(key)||''
    if (!isEmpty(value)) {
      return JSON.parse(value).value
    } else {
      return ''
    }
  } catch (e) {
    console.log('从localStorage获取' + key + '失败: ' + e)
  }
}

/**
 * @method 移除localStorage中的某个数据
 * @param {*key值} key
 */
function removeLocalValue (key:string) {
  key = 'local.' + key
  localStorage.removeItem(key)
}

/**
 * @method 获取store缓存的一些用户基本数据
 * @param key 为空则获取全部的key值
 */
function getBaseInfoOfStore (key:string) {
  let saveData = isEmpty(key) ? store.getters.getBaseDataSaveData : store.getters.getBaseDataSaveData[key]
  return isEmpty(saveData) ? saveData : saveData
}


/**
 * @method 根据日期判断今天周几
 * @param {*} date 日期格式为字符串2018-01-01
 */
function getDateWeek (date:any):string{
  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const myDate = new Date(Date.parse(date))
  return weekDay[myDate.getDay()]
}
/**
 * @method 转化日期格式
 * @param {*} time
 */
function formatDate (time:any):string {
  const date = new Date(time)
  console.log(date.getFullYear(),'date',time)
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  return `${YYYY}-${MM}-${DD}`
}



export{
  isEmpty,
  getLocalValue,
  setLocalValue,
  removeLocalValue,
  setBaseInfoOfStore,
  getBaseInfoOfStore,
  judgetFieldValue,
  getDateWeek,
  formatDate
}
