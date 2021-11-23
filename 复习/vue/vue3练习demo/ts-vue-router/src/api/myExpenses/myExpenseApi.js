/**
 * 我的费用相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 获取指定时间区间已报销的金额集合
 * /expense/api/expense/report/get/sum/of/functionAmount/by/date/range?startDay=2020-02-01&endDay=2020-03-30
 */
async function getHasReportAmountByDateRange (params) {
  const data = {
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/report/get/sum/of/functionAmount/by/date/range?roleType=TENANT${judgetFieldValue(data)}`
  return http.post(url, params.idList)
}
/**
 * 根据月份和费用类型ID获取指定月份的已报销金额以及费用类型集合
 * /expense/api/expense/report/get/expenseType/and/functionAmount?expenseTypeId=1144055453070704642&startDay=2020-03-01&endDay=2020-03-30&page=1&size=5
 */
async function getHasReportAndTypeList (params) {
  const data = {
    page: params.page,
    size: params.size,
    expenseTypeId: params.expenseTypeId,
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/report/get/expenseType/and/functionAmount?roleType=TENANT${judgetFieldValue(data)}`
  return http.post(url, params.idList)
}
/**
 * 获取未报销金额-费用
 * /expense/api/expense/book/query/top/three?startDay=2020-04-01&endDay=2020-04-30&roleType=TENANT
 */
async function getUnReportList (params) {
  const data = {
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/book/query/top/three?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 获取币种列表
 * /expense/api/expense/report/get/currency/and/setOfBooksIds?roleType=TENANT
 */
async function getReportCurrencyList () {
  const url = '/expense/api/expense/report/get/currency/and/setOfBooksIds?roleType=TENANT'
  return http.get(url)
}
/**
 *获取费用类型费用列表
 * /expense/api/expense/report/get/ranking/of/expenseLineFunctionAmount?startDay=2020-04-01&endDay=2020-04-30&roleType=TENANT
 */
async function getExpenseAmountTypeList (params) {
  const data = {
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/report/get/ranking/of/expenseLineFunctionAmount?roleType=TENANT${judgetFieldValue(data)}`
  return http.post(url, params.idList)
}
/**
 *获取已报销金额
 * /expense/api/expense/report/get/sum/of/expenseLineFunctionAmount?startDay=2020-04-01&endDay=2020-04-30&roleType=TENANT
 */
async function getHasExpenseAmount (params) {
  const data = {
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/report/get/sum/of/expenseLineFunctionAmount?roleType=TENANT${judgetFieldValue(data)}`
  return http.post(url, params.idList)
}
/**
 *获取已付款金额
 * /expense/api/expense/report/get/amount/paid?startDay=2020-04-01&endDay=2020-04-30&roleType=TENANT
 */
async function getHaspaidAmount (params) {
  const data = {
    startDay: params.startDay,
    endDay: params.endDay
  }
  const url = `/expense/api/expense/report/get/amount/paid?roleType=TENANT${judgetFieldValue(data)}`
  return http.post(url, params.idList)
}
export {
  getHasReportAmountByDateRange,
  getHasReportAndTypeList,
  getUnReportList,
  getReportCurrencyList,
  getExpenseAmountTypeList,
  getHasExpenseAmount,
  getHaspaidAmount
}
