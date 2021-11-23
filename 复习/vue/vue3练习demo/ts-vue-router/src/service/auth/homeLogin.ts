/** *这里存放各种登录相关的js */
import { getCompanyInfo } from '../../api/common/commonApi'
import http from '@/service/http'
import axios from 'axios'
import { isEmpty,  setLocalValue, removeLocalValue, getLocalValue,setBaseInfoOfStore } from '../../utils/util'// getUrlParams
import router from '@/router/index'
async function homeLogin () {
const result=await analogLogin()
setLocalValue('token', result.token)
if (!isEmpty(result.token)) {
  try {
    if (!isEmpty(getLocalValue('token'))) {
      await setAccountInfo()
      setDepartInfo()
    }
    let companyInfo = await getCompanyInfo()
    console.log('companyInfo', companyInfo)
    setBaseInfoOfStore('companyInfo', companyInfo.data)
    router.push({ // 跳转并传参
      name: 'homePage'
    })
  } catch (error) {
    console.log(error)
    router.push({
      name: 'LoginPage'
    })
  }
} else {
  router.push({
    name: 'LoginPage'
  })
}

}

// 模拟登录
 async function analogLogin () {
  console.log('***模拟登录***')
  // await getPublicKey()
  // const url = `${$config.baseURL}/oauth/token?client_id=${$config.client_id}&client_secret=${$config.client_secret}&grant_type=${$config.grant_type}&authType=${$config.authType}&username=${$config.username}&password=${$config.password}`
  let url = `/auth/oauth/token`
  let formData = new FormData()
  formData.append('scope', 'write')
  formData.append('grant_type', 'password')
  formData.append('username', '18888888888')
  formData.append('password', '123654')
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Basic ' + 'QXJ0ZW1pc0FwcDpuTENud2RJaGl6V2J5a0h5dVpNNlRwUURkN0t3SzlJWERLOExHc2E3U09X'
    },
    timeout: 20000
  }
  try {
    const res = await axios.post(url, formData, config)
    return {
      token: res.data.access_token,
      tokenType: res.data.token_type,
      expires: res.data.expires_in,
      userId: res.data.userId,
      organizationId: res.data.organizationId
    }
  } catch (err) {
    console.log(JSON.stringify(err))
    return err
  }
}

// 设置公司信息
async function setCompanyInfo () {
  console.log('setCompanyInfo调用')
  try {
    let companyInfo = await getCompanyInfo()
    setBaseInfoOfStore('companyInfo', companyInfo.data)
  } catch (error) {
    console.log(error)
  }
}
// 获取部门信息
export function getDepartment () {
  let url = '/mdata/api/my/department'
  const env = process.env.CONFIG_ENV // 环境
  return http.get(url)
}

export async function setAccountInfo () {
  let accountInfo = await getHcfAccountInfo()
 setBaseInfoOfStore('accountInfo', accountInfo)
}

export async function setDepartInfo () {
  let departmentInfo = await getDepartment()
  setBaseInfoOfStore('departmentInfo', departmentInfo.data)
}
// 获取费控系统的用户详细信息
export async function getHcfAccountInfo () {
  let url = '/api/account?roleType=TENANT'
  const res = await http.get(url)
  return res.data
}

export {
  homeLogin
}
