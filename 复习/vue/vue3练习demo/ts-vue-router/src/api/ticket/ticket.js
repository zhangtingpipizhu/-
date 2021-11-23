/**
 * 票夹相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * TODO
 * 获取发票列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*发票代码*} invoiceCode
 * @param {*发票号码*} invoiceNo
 * @param {*日期开始*} invoiceDateFrom
 * @param {*日期结束*} invoiceDateTo
 * @param {*销售方名称*} salerName
 * @param {*是否验真*} checkResult
 * @param {*发票类型*} invoiceTypeId
 */
async function getInvoiceList (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    createdBy: params.createdBy,
    invoiceCode: params.invoiceCode,
    invoiceNo: params.invoiceNo,
    invoiceDateFrom: params.invoiceDateFrom,
    invoiceDateTo: params.invoiceDateTo,
    salerName: params.salerName,
    checkResult: params.checkResult,
    invoiceTypeId: params.invoiceTypeId,
    orderByCreateDate: params.orderByCreateDate,
    orderByInvoiceDate: params.orderByInvoiceDate,
    totalAmountFrom: params.totalAmountFrom,
    totalAmountTo: params.totalAmountTo
  }
  const url = `/expense/api/invoice/head/query/invoice/all/by/cond?roleType=TENANT${judgetFieldValue(data)}`
  //   const url = `/expense/api/invoice/head/query/invoice/all/by/cond?createdBy=${judgetFieldValue(params.createdBy)}&page=${params.page || 0}&size=${params.pageSize || 10}
  // &invoiceTypeId=${judgetFieldValue(params.invoiceTypeId)}&invoiceCode=${judgetFieldValue(params.invoiceCode)}&invoiceNo=${judgetFieldValue(params.invoiceNo)}
  // &invoiceDateFrom=${judgetFieldValue(params.invoiceDateFrom)}&salerName=${judgetFieldValue(params.salerName)}&invoiceDateTo=${judgetFieldValue(params.invoiceDateTo)}&checkResult=${judgetFieldValue(params.checkResult)}
  // &orderByCreateDate=${judgetFieldValue(params.orderByCreateDate)}&orderByInvoiceDate=${judgetFieldValue(params.orderByInvoiceDate)}&totalAmountFrom=${judgetFieldValue(params.totalAmountFrom)}&totalAmountTo=${judgetFieldValue(params.totalAmountTo)}&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取票夹列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*发票代码*} invoiceCode
 * @param {*发票号码*} invoiceNo
 * @param {*日期开始*} invoiceDateFrom
 * @param {*日期结束*} invoiceDateTo
 * @param {*是否验真*} checkResult
 * @param {*发票类型*} invoiceTypeId
 */
async function getTicketList (params) {
  const it = {
    page: params.page || 0,
    size: params.size || 10,
    createdBy: params.createdBy,
    invoiceCode: params.invoiceCode,
    invoiceNo: params.invoiceNo,
    invoiceDateFrom: params.invoiceDateFrom,
    invoiceDateTo: params.invoiceDateTo,
    totalAmountFrom: params.totalAmountFrom, // 价税合计金额从
    totalAmountTo: params.totalAmountTo, //  价税合计金额到
    checkResult: params.checkResult,
    invoiceTypeId: params.invoiceTypeId,
    orderByCreateDate: params.orderByCreateDate,
    orderByInvoiceDate: params.orderByInvoiceDate
  }
  const url = `/expense/api/invoice/head/query/by/cond?roleType=TENANT${judgetFieldValue(it)}`
  //   const url = `/expense/api/invoice/head/query/by/cond?createdBy=${judgetFieldValue(params.createdBy)}&page=${params.page || 0}&size=${params.size || 10}&invoiceTypeId=${judgetFieldValue(params.invoiceTypeId)}
  // &invoiceCode=${judgetFieldValue(params.invoiceCode)}&invoiceNo=${judgetFieldValue(params.invoiceNo)}&invoiceDateFrom=${judgetFieldValue(params.invoiceDateFrom)}&invoiceDateTo=${judgetFieldValue(params.invoiceDateTo)}&totalAmountFrom=${judgetFieldValue(params.totalAmountFrom)}
  // &totalAmountTo=${judgetFieldValue(params.totalAmountTo)}&checkResult=${judgetFieldValue(params.checkResult)}&orderByCreateDate=${judgetFieldValue(params.orderByCreateDate)}&orderByInvoiceDate=${judgetFieldValue(params.orderByInvoiceDate)}&roleType=TENANT`
  return http.get(url)
}

/**
 * 删除发票
 * @param {*} headIds 发票头ID
 */
async function deleteTicket (headIds) {
  const url = '/expense/api/invoice/head/delete/invoice/by/headIds?roleType=TENANT'
  const res = await http.delete(url, { data: [headIds] })
  return res
}

/**
 * 获取发票类型列表
 */
async function getInvoiceTypeList (params) {
  const url = `/mdata/api/invoice/type/query/for/invoice?tenantId=${params.tenantId}&setOfBooksId=${params.setOfBooksId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 票夹-获取发票详情通过发票头id
 */
async function getInvoiceInfoByHeaderId (params) {
  const url = `/expense/api/invoice/head/${params.invoiceHeaderId}?roleType=TENANT`
  return http.get(url)
}

// 获取微信token
function getWxToken (type) {
  let url = '/peripheral/api/weChat/getToken'
  if (type) {
    url += '?type=' + type
  }
  return http.get(url)
}

// 获取微信电子票详细信息
// item_list= + params.item_list
function getTicketInfo (params) {
  const url = '/peripheral/api/weChat/getInvoiceBatch'
  const data = {
    item_list: params.item_list
  }
  return http.post(url, data)
}

/**
 * 票夹-保存发票
 */
async function saveInvoice (params) {
  const url = '/expense/api/invoice/head/insert/invoice?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 票夹-查看附件
 */
async function tickertQueryAttachment (invoiceId) {
  const url = `/expense/api/invoice/head/queryAttachment?invoiceId=${invoiceId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 票夹-查询发票关联报销单
 * /expense/api/invoice/head/query/invoice/line/expense/by/headId
 */
async function tickertRelateReport (headId) {
  const url = `/expense/api/invoice/head/query/invoice/line/expense/by/headId?page=0&size=10&headId=${headId}&roleType=TENANT`
  return http.get(url)
}
export {
  getInvoiceList,
  getTicketList,
  deleteTicket,
  getWxToken,
  getInvoiceInfoByHeaderId,
  getTicketInfo,
  getInvoiceTypeList,
  saveInvoice,
  tickertQueryAttachment,
  tickertRelateReport
}
