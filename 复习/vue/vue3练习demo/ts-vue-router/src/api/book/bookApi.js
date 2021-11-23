/**
 * 账本相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 获取账本列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*金额从*} amountFrom
 * @param {*金额至*} amountTo
 * @param {*日期开始*} dateFrom
 * @param {*日期结束*} dateTo
 * @param {*币种*} currencyCode
 * @param {*费用项目*} expenseTypeId
 */
async function getBookList (params) {
  const url = `/expense/api/expense/book/query?page=${params.page}&size=${params.size}&expenseTypeId=${params.expenseTypeId || ''}
&dateFrom=${params.dateFrom || ''}&dateTo=${params.dateTo || ''}&currencyCode=${params.currencyCode || ''}&amountFrom=${params.amountFrom || ''}
&amountTo=${params.amountTo || ''}&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取账本列表
 * @param {*账本id数组集合}
 */
async function getExpenseTypeList (params) {
  const url = '/expense/api/expense/report/own/condition/expenseBook?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 一键报销
 * @param {*账本id数组集合} expenseBookIds
 * @param {*报销单单据类型id*} expenseReportTypeId
 */
async function createFromBookList (params) {
  const data = {
    expenseBookIds: params.expenseBookIds,
    expenseReportTypeId: params.expenseReportTypeId,
    invoiceDTOS: params.invoiceDTOS,
    ignoreContinuation: params.ignoreContinuation
  }
  const url = '/expense/api/expense/report/header/auto/create?roleType=TENANT'
  return http.post(url, data)
}

/**
 *费用类型查询
 * @param {*} params
 * @param {typeFlag} 0-申请类型  1-费用类型
 */
function getExpenseTypes (params) {
  const url = `/expense/api/expense/types/chooser/query?page=0&size=1000&setOfBooksId=${params.setOfBooksId}&typeFlag=${params.typeFlag}&roleType=TENANT`
  return http.get(url)
}

/**
 *获取币种列表
 * @param {*} params
 * @param {enable}
 * @param {setOfBooksId}
 * @param {tenantId}
 */
function getCurrencyList (params) {
  const url = `/mdata/api/currency/rate/list?enable=${params.enable || ''}&setOfBooksId=${params.setOfBooksId || ''}&tenantId=${params.tenantId || ''}&roleType=TENANT`
  return http.get(url)
}

/**
 * 账本行-报销类型
 */
async function getBookLineExpTypeList (params) {
  const url = '/expense/api/expense/types/' + params.setOfBooksId + '/query?typeFlag=1&page=0&size=1000&typeCategoryId=' + params.typeCategoryId + '&name=' + params.name
  return http.get(url)
}

/**
 * 账本行-保存账本行
 */
async function saveBookInfo (params, isEdit) {
  let res
  const url = '/expense/api/expense/book'
  if (isEdit) {
    res = await http.put(url, params)
  } else {
    res = await http.post(url, params)
  }
  return res
}

/**
 * TODO
 * 账本行-自动匹配
 */
async function autoMatch (params) {
  const url = '/expense/api/expense/report/invoice/auto/match?roleType=TENANT'
  return http.post(url, params)
}

/**
 * TODO
 * 报销单类型列表
 */
async function invoiceMatchExpList (params) {
  const url = '/expense/api/expense/report/own/condition/invoice?roleType=TENANT'
  return http.post(url, params)
}

/**
 * TODO
 * 选择申请类型
 */
async function selectExpMatchType (params) {
  const url = '/expense/api/expense/types/chooser/query/by/login?page=0&size=1000&roleType=TENANT'
  return http.post(url, params.dataList)
}

/**
 * 账本-删除
 */
async function deleteBook (id) {
  // const url = `/expense/api/expense/book/${id}?roleType=TENANT`
  const url = `/expense/api/expense/book/header/${id}?roleType=TENANT`
  return http.delete(url)
}

/**
 * 自动创建账本
 */
async function autoCreateBooks (params) {
  const url = '/expense/api/expense/report/books/auto/create?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 删除账本行发票
 * /expense/api/expense/book?expenseBookId=1182233452214685698&invoiceHeadId=1212990267610562561&invoiceLineId=1212990267686060033&roleType=TENANT
 */
async function deleteBookLineInvoice (params) {
  const url = `/expense/api/expense/book?expenseBookId=${params.expenseBookId}&invoiceHeadId=${params.invoiceHeadId}&invoiceLineId=${params.invoiceLineId}&roleType=TENANT`
  return http.delete(url)
}
/**
 * 自动报销OCR
 * /expense/api/invoice/head/get/by/ocr/and/check/verification?tenantId=1083751703623680001&setOfBooksId=1083762150064451585&roleType=TENANT
 */
async function autoBookOcrDiscern (params) {
  const url = `/expense/api/invoice/head/get/by/ocr/and/check/verification?tenantId=${params.tenantId}&setOfBooksId=${params.setOfBooksId}&roleType=TENAN`
  return http.post(url, params.dataList)
}
/**
 * 自动报销手工录入
 * /expense/api/invoice/head/check/verification?roleType=TENANT
 */
async function autoBookManual (params) {
  const url = '/expense/api/invoice/head/check/verification?roleType=TENANT'
  return http.post(url, params)
}
/**
 *获取账本未关联列表
 */
async function getUncorrelatedList (params) {
  let url = ``
  if (params.tabStatus === 0) {
    url = `/expense/api/expense/book/header/query?&roleType=TENANT${judgetFieldValue(params)}`
  } else {
    url = `/expense/api/expense/book/authorities/query/for/authorities?&roleType=TENANT${judgetFieldValue(params)}`
  }
  return http.get(url)
}
/**
 *获取账本已关联列表
 */
async function getAssociatedList (params) {
  const url = `/expense/api/expense/report/header/my?&editor=true&fromBookFlag=true&roleType=TENANT${judgetFieldValue(params)}`
  return http.get(url)
}

/**
 * 获取费用事项列表
 */
async function getBookExpenseList (param) {
  let url = ``
  let data = {}
  if (param.listType === 'headerType') {
    data = {
      typeFlag: 1,
      setOfBooksId: param.setOfBooksId,
      page: 0,
      size: 9999,
      name: param.name,
      forConfigFlag: true,
      documentType: 801001
    }
    url = `/expense/api/expense/types/category/query/book?roleType=TENANT${judgetFieldValue(data)}`
    return http.get(url)
  } else {
    data = {
      typeFlag: 1,
      setOfBooksId: param.setOfBooksId,
      page: 0,
      size: 9999,
      name: param.name,
      configFlag: true,
      typeCategoryId: param.typeCategoryId
    }
    url = `/expense/api/expense/types/chooser/query/by/login?roleType=TENANT${judgetFieldValue(data)}`
    return http.post(url)
  }
}
/**
 * 账本头辅助字段
 */
async function getRuleList (param) {
  let url = `/expense/api/invoice/head/getRule?expenseTypeCategoryId=${param.expenseTypeCategoryId}&roleType=TENANT`
  return http.get(url)
}
/**
 * 账本头辅助字段列表
 */
async function getRuleTypeList (params) {
  let url = `/base/api/custom/enumerations/template/by/type?type=${params.type}&roleType=TENANT`
  return http.get(url)
}
// 获取系统来源
async function getSysSource () {
  // /base/api/custom/enumerations/template/by/type?type=BOOK_SOURCE_SYSTEM&roleType=TENANT
  let url = `/base/api/custom/enumerations/template/by/type?type=BOOK_SOURCE_SYSTEM&roleType=TENANT`
  return http.get(url)
}
/**
 * 账本行保存
 */
async function saveBook (params) {
  // let url = `/expense/api/expense/book/header/save?roleType=TENANT`
  let url = ``
  if (params.length === 1) {
    url = `/expense/api/expense/book/header/save?roleType=TENANT`
    return http.post(url, params[0])
  } else {
    url = `/expense/api/expense/book/header/batch/save`
    return http.post(url, params)
  }
}
/**
 * 账本行的行列表查询
 */
async function queryLineByHeaderId (headerId) {
  let url = `/expense/api/expense/book/line/queryByHeaderId/${headerId}?page=0&size=100&roleType=TENANT`
  return http.get(url)
}
/**
 * 获取账本头信息
 */
async function getBookHeader (id) {
  let url = `/expense/api/expense/book/header/${id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 获取单据大类详细信息
 *
 */
async function getBookCarotyDetail (id) {
  let url = `/expense/api/expense/types/book/list/query?typeCategoryId=${id}&roleType=TENANT`
  return http.get(url)
}
async function getDefaultReportConfig (expenseTypeCategoryId) {
  let url = `/expense/api/expense/book/header/getDefaultReportConfig`
  return http.get(url, {params: {expenseTypeCategoryId: expenseTypeCategoryId}})
}
/**
 * 批量匹配发票数据生成账本行
 */
async function getAutoExpenseList (params) {
  let url = `/expense/api/invoice/head/check/invoice/batch`
  return http.post(url, params.invoiceList, {params: {
    expenseTypeCategoryId: params.expenseTypeCategoryId,
    additionIndexValue: params.additionIndexValue
  }})
}
/**
 * 发起报销
 */
async function createFromBook (list) {
  let url = `/expense/api/expense/report/header/create/from/book?roleType=TENANT`
  return http.post(url, list)
}
/**
 *
 * @param {*} params
 * 已关联未提交更新账本
 */
async function uplateBook (id) {
  let url = `/expense/api/expense/book/header/${id}?roleType=TENANT`
  return http.get(url)
}
async function uplateBookToExport (expenseBookHeaderId, expenseReportHeaderId) {
  let url = `/expense/api/expense/report/header/update/from/book?expenseBookHeaderId=${expenseBookHeaderId}&expenseReportHeaderId=${expenseReportHeaderId}&roleType=TENANT`
  return http.post(url)
}
/**
 * 获取账本行默认责任中心
 */
async function getDefaultResponsibilityCenter (params) {
  let url = `/expense/api/expense/accrual/lines/getDefaultResponsibilityCenter`
  return http.get(url, {params: {
    companyId: params.companyId,
    unitId: params.unitId
  }})
}
/***
 * 公务卡查询
 */
async function getBusinessList (params) {
  let url = `/prepayment/api/bcTransaction/query/detail?page=${params.page}&size=${params.size}&expenseBookId=${params.expenseBookId}&roleType=TENANT`
  return http.get(url)
}
/**
 * 公务卡保存
 */
async function saveBusiness (params) {
  let url = `/expense/api/expense/bc/relation/batchupdate/bc/bcTransation/relation?roleType=TENA`
  return http.post(url, params)
}
async function authBook (params) {
  let url = `/expense/api/expense/book/authorities/do/authorities?roleType=TENANT`
  return http.post(url, params)
}
async function bookApprove (params, type) {
  let url = ''
  if (type === 'agree') {
    url = `/expense/api/expense/book/authorities/approve/authorities?roleType=TENANT`
  } else {
    url = `/expense/api/expense/book/authorities/refuse/authorities?roleType=TENANT`
  }
  return http.post(url, params)
}
// async function bookRefuse (params) {
//   let
//   return http.post(url, params)
// }
/**
 * 检查发票
 */
async function checkTicket (params) {
  let url = `/expense/api/invoice/head/check/invoice/repeat`
  return http.post(url, params)
}
/**
 * 检查账本是否可以聚合报销
 */
async function checkBook (params) {
  let url = `/expense/api/expense/book/header/check`
  return http.post(url, params)
}
// 获取附件缺失列表
async function getAttachmentEmty (params) {
  let url = ``
  if (params.type === 'export') {
    url = `/expense/api/expense/report/attchment/empty/description/getListById?headerId=${params.headerId}&roleType=TENANT`
  } else {
    url = `/expense/api/expense/attchment/empty/description/getListById?headerId=${params.headerId}&roleType=TENANT`
  }
  return http.get(url)
}

// 获取附件缺失原因列表
async function getAttachmentResonList () {
  let url = `/base/api/custom/enumerations/template/by/type?type=ATTCHMENT_EMPTY_DESC_TYPE&roleType=TENANT`
  return http.get(url)
}
export {
  getBookList,
  getExpenseTypeList,
  createFromBookList,
  getExpenseTypes,
  getCurrencyList,
  getBookLineExpTypeList,
  saveBookInfo,
  deleteBook,
  autoMatch,
  invoiceMatchExpList,
  selectExpMatchType,
  autoCreateBooks,
  deleteBookLineInvoice,
  autoBookOcrDiscern,
  autoBookManual,
  getUncorrelatedList,
  getAssociatedList,
  getBookExpenseList,
  getRuleList,
  getRuleTypeList,
  getSysSource,
  saveBook,
  queryLineByHeaderId,
  getBookHeader,
  getBookCarotyDetail,
  getDefaultReportConfig,
  getAutoExpenseList,
  createFromBook,
  getDefaultResponsibilityCenter,
  getBusinessList,
  saveBusiness,
  authBook,
  bookApprove,
  checkTicket,
  checkBook,
  getAttachmentEmty,
  getAttachmentResonList,
  uplateBook,
  uplateBookToExport
}
