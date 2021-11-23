/**
 * 途牛相关API接口
 */
import http from '@/service/http'
// import axios from 'axios'

/**
 * 途牛-获取基础请求数据
 * /peripheral/api/tuNiu/getBaseInfo?tenantId=1107839525171277825
 */
function getTuNiuBaseInfo (params) {
  const url = `/peripheral/api/tuNiu/getBaseInfo?tenantId=${params.tenantId}`
  return http.get(url)
  // {
  //   "signature": "502ac08bc5bf3b1887436fbf78167d81",
  //   "key": "h1qe3in5R3todij5dRiuEw==",
  //   "secret": "655B0A326C872C2115AF18C8988366D2",
  //   "dateFormat": "20200309194248",
  //   "timestamp": null
  // }
}
/**
 * 途牛-单点跳转
 * http://101.132.162.31:9081/peripheral/api/tuNiu/login
 */
function tuNiuLoginJumpPage (params) {
  const url = '/peripheral/api/tuNiu/login'
  const data = {
    initPage: params.initPage,
    appName: params.appName,
    loginType: params.loginType,
    docNumber: params.docNumber,
    companyApplyCode: params.companyApplyCode
  }
  return http.post(url, data)
}
/**
 * 获取TuNiu订单列表
 * https://ttms-ops-api.tuniu-sit.com/order/list
 * 正式域名：ttms-ops-api.tuniu.com
 * 测试域名： ttms-ops-api.tuniu-sit.com
 */
async function getTuNiuOrderList (params) {
  const data = {
    apiKey: params.apiKey,
    data: {
      applyCode: params.applyCode // PC订单号
    },
    sign: params.sign,
    timestamp: params.timestamp
  }
  const url = '/order/list'
  return window.axios.post(url, data)
}

/**
 * 获取TuNiu订单详情
 * https://ttms-ops-api.tuniu-sit.com/order/list
 * 正式域名：ttms-ops-api.tuniu.com
 * 测试域名： ttms-ops-api.tuniu-sit.com
 */
async function getTuNiuOrderDetail (params) {
  const data = {
    apiKey: params.apiKey,
    data: {
      orderId: params.orderId // 第三方订单号
    },
    sign: params.sign,
    timestamp: params.timestamp
  }
  const url = '/order/get'
  return window.axios.post(url, data)
}

export {
  getTuNiuBaseInfo,
  getTuNiuOrderDetail,
  tuNiuLoginJumpPage,
  getTuNiuOrderList
}
