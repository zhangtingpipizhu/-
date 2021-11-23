/**
 * 还款单相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 获取列表
 * /payment/api/cash/repayment/query/list?page=0&size=10&requisitionDateFrom=2020-04-15&requisitionDateTo=2020-04-17&status=1001&employeeId=1233369017066627073&amountFrom=10&amountTo=10&description=5201214&roleType=TENANT
 */
async function getDataList (params) {
  let data = {
    page: params.page,
    size: params.size,
    requisitionDateFrom: params.requisitionDateFrom,
    requisitionDateTo: params.requisitionDateTo,
    status: params.status,
    employeeId: params.employeeId,
    amountFrom: params.amountFrom,
    amountTo: params.amountTo,
    description: params.description,
    documentNumber: params.documentNumber,
    editor: params.editor
  }
  if (params.status === '1008') {
    data = {
      page: params.page,
      size: params.size,
      requisitionDateFrom: params.requisitionDateFrom,
      requisitionDateTo: params.requisitionDateTo,
      status: params.status,
      employeeId: params.employeeId,
      amountFrom: params.amountFrom,
      amountTo: params.amountTo,
      description: params.description,
      documentNumber: params.documentNumber
    }
  }
  let url = `/payment/api/cash/repayment/query/list?roleType=TENANT${judgetFieldValue(data)}`
  url = encodeURI(url)
  return http.get(url)
}
/**
 * 获取申请人列表
 * /payment/api/cash/repayment/users?size=10&page=0&roleType=TENANT
 */
async function getRepaymentApplyerList (params) {
  const data = {
    page: params.page,
    size: params.size
  }
  const url = `/payment/api/cash/repayment/users?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 保存头
 * /payment/api/cash/repayment/save?roleType=TENANT
 */
async function saveRepaymentHeader (params) {
  const url = '/payment/api/cash/repayment/save?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 删除单据
 * /payment/api/cash/repayment/delete/head/byId?id=1250606578012573697&roleType=TENANT
 */
async function deleteRepaymentOrder (params) {
  const url = `/payment/api/cash/repayment/delete/head/byId?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 查询头信息
 * /payment/api/cash/repayment/query/byId?id=1250607841634734082&roleType=TENANT
 */
async function getRepaymentHeaderById (params) {
  const url = `/payment/api/cash/repayment/query/byId?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 查询行信息列表
 * /payment/api/cash/repayment/query/line/byId?page=0&size=5&id=1242733395955986434&roleType=TENANT
 */
async function getRepaymentLinesListById (params) {
  const url = `/payment/api/cash/repayment/query/line/byId?page=${params.page}&size=${params.size}&id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 新建行信息时添加还款信息列表
 * /payment/api/cash/repayment/query/detail/byId?page=0&size=10&documentNumber=jsjjs&payDateFrom=2020-04-16&id=1242733395955986434&roleType=TENANT
 */
async function getAddRepaymentInfoList (params, type) {
  const data = {
    page: params.page,
    size: params.size,
    documentNumber: params.documentNumber,
    payDateFrom: params.payDateFrom,
    id: params.id
  }
  let url = ``
  if (type === '1') {
    url = `/payment/api/cash/repayment/query/detail/byId/for/business?roleType=TENANT${judgetFieldValue(data)}`
  } else {
    url = `/payment/api/cash/repayment/query/detail/byId?roleType=TENANT${judgetFieldValue(data)}`
  }

  return http.get(url)
}
/**
 * 添加还款信息后保存
 * /payment/api/cash/repayment/save/detail/byId?id=1242733395955986434&roleType=TENANT
 */
async function saveAddRepaymentInfo (params) {
  const url = `/payment/api/cash/repayment/save/part/detail?roleType=TENANT`
  return http.post(url, params)
}
/**
 * 还款信息编辑保存
 * /payment/api/cash/repayment/line/save?roleType=TENANT
 */
async function saveEditRepaymentInfo (params) {
  const url = `/payment/api/cash/repayment/line/save?roleType=TENANT&documentNumber=${params.documentNumber}`
  return http.post(url, params)
}
/**
 * 行删除
 * /payment/api/cash/repayment/line/delete/byId?id=1250610646160297985&roleType=TENANT
 */
async function deleteRepaymentLineById (params) {
  const url = `/payment/api/cash/repayment/line/delete/byId?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 还款单提交前校验
 * /payment/api/cash/repayment/choose/contact/notes?id=1242733395955986434&roleType=TENANT
 */
async function beforeSubmitOrderCheck (params) {
  const url = `/payment/api/cash/repayment/choose/contact/notes?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 还款单提交
 * /payment/api/cash/repayment/submit?id=1242996554896674817&roleType=TENANT
 */
async function submitRepaymentOrder (params) {
  const url = `/payment/api/cash/repayment/submit?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 还款单筛选-申请人列表
 * /mdata/api/select/user/by/name/or/code/enable/dataAuth?page=0&size=10&setOfBooksId=1083762150064451585&roleType=TENANT
 */
async function getFilterApplyerList (params) {
  const data = {
    page: params.page,
    size: params.size,
    keyword: params.keyword,
    setOfBooksId: params.setOfBooksId
  }
  const url = `/mdata/api/select/user/by/name/or/code/enable/dataAuth?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 收款方银行账户
 * /payment/api/CompanyBank/selectByCompanyId?companyId=1083751704185716737&currency=CNY&roleType=TENANT
 */
async function getDraweeAccountNumberList (params) {
  const url = `/payment/api/CompanyBank/selectByCompanyId?companyId=${params.companyId}&currency=${params.currency}&roleType=TENANT`
  return http.get(url)
}
/**
 * 获取原支付信息
 * /payment/api/cash/transaction/details/getDetailById?id=1251090751681466369&roleType=TENANT
 */
async function getOriginalPayInfo (params) {
  const url = `/payment/api/cash/transaction/details/getDetailById?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
export {
  getDataList,
  getRepaymentApplyerList,
  saveRepaymentHeader,
  deleteRepaymentOrder,
  getRepaymentHeaderById,
  getRepaymentLinesListById,
  getAddRepaymentInfoList,
  saveAddRepaymentInfo,
  saveEditRepaymentInfo,
  deleteRepaymentLineById,
  beforeSubmitOrderCheck,
  submitRepaymentOrder,
  getFilterApplyerList,
  getDraweeAccountNumberList,
  getOriginalPayInfo
}
