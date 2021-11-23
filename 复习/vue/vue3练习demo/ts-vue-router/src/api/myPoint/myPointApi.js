/**
 * 我的积分相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'
/**
 * 获取全部积分列表
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /expense/api/travel/get/integration/mytotal/by/employee/detail?isMobile=true
 */
async function getAllPointsList () {
  const url = '/expense/api/travel/get/integration/mytotal/by/employee/detail?isMobile=true'
  return http.get(url)
}

/**
 * 获取积分信息
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /expense/api/travel/get/integration/mytotal/total/sum
 */
async function getPointsInfo () {
  const url = '/expense/api/travel/get/integration/mytotal/total/sum'
  return http.get(url)
}

/**
 * 获取积分明细
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /expense/api/travel/get/integration/mytotal/by/employee/detail/condition?page=0&size=10&expenseTypeCode=111&flightType=1&startDate=4&endDate=5
 */
async function getPointsDetailList (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    expenseTypeCode: params.expenseTypeCode || '',
    flightType: params.flightType || '',
    startDate: params.startDate || '',
    endDate: params.endDate || ''
  }
  const url = `/expense/api/travel/get/integration/mytotal/by/employee/detail/condition?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 获取积分明细按年月
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /expense/api/travel/get/integration/mytotal/by/employee/travel/detail/condition?year=2019&month=11&expenseTypeCode=111&flightType=1
 */
async function getPointsDetailListByYearMonth (params) {
  const data = {
    year: params.year,
    month: params.month,
    expenseTypeCode: params.expenseTypeCode || '',
    flightType: params.flightType || ''
  }
  const url = `/expense/api/travel/get/integration/mytotal/by/employee/travel/detail/condition?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 积分筛选差旅类型
 * /expense/api/travel/get/integration/type
 */
async function getPointTravelTypeList () {
  const url = '/expense/api/travel/get/integration/type'
  return http.get(url)
}

/**
 * 积分消耗
 * /expense/api/travel/get/integration/month/consume?year=2019&month=11
 */
async function getConsumePointList (params) {
  const data = {
    year: params.year,
    month: params.month
  }
  const url = `/expense/api/travel/get/integration/month/consume?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
export {
  getAllPointsList,
  getPointsInfo,
  getPointsDetailList,
  getPointsDetailListByYearMonth,
  getPointTravelTypeList,
  getConsumePointList
}
