/**
 * 借款相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'
/**
 * 获取单据列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*单据类型ID} paymentReqTypeId
 * @param {*员工ID} employeeId
 * @param {*起始日期} requisitionDateFrom
 * @param {*截止日期} requisitionDateTo
 * @param {*状态} status （1001：编辑中、1002：审批中、1003：撤回、1004：审批通过、1005：审批驳回、2001：审核驳回、2002：审核通过）
 * @param {*搜索关键字} requisitionNumber
 * @param {*角色类型} roleType
 * http://101.132.162.31:9081/prepayment/api/cash/prepayment/requisitionHead/query?page=0&size=10&paymentReqTypeId=1165819260019150850&requisitionDateFrom=2019-09-06&requisitionDateTo=2019-09-25&status=1001&advancePaymentAmountFrom=100&advancePaymentAmountTo=200&description=2222dd&employeeId=1107918162780569602&roleType=TENANT
 */
async function getAdvancePaymentList (params) {
  let url = `/prepayment/api/cash/prepayment/requisitionHead/query?editor=${params.editor || false}&page=${params.page || 0}&size=${params.size || 10}
&status=${params.status}&requisitionNumber=${params.requisitionNumber || ''}
&paymentReqTypeId=${params.paymentReqTypeId || ''}&employeeId=${params.employeeId || ''}&requisitionDateFrom=${params.requisitionDateFrom || ''}
&requisitionDateTo=${params.requisitionDateTo || ''}&advancePaymentAmountFrom=${params.advancePaymentAmountFrom || ''}
&advancePaymentAmountTo=${params.advancePaymentAmountTo || ''}&description=${params.description || ''}&roleType=${params.roleType || ''}&passed=${params.passed || ''}`
  url = encodeURI(url)
  const res = await http.get(url)
  return res
}

/**
 * 根据ID获取借款单头信息
 * @param {*} params
 */
async function getAdvancePaymentHead (params) {
  const url = `/prepayment/api/cash/prepayment/requisitionHead/getHeadById?id=${params.id}&roleType=${params.roleType}`
  const res = await http.get(url)
  return res
}

/**
 * 根据ID获取借款单付款行信息
 * @param {*} params
 */
async function getPaymentInformation (params) {
  const url = `/prepayment/api/cash/prepayment/requisitionHead/getLineByHeadId?headId=${params.headId}&size=${params.size}&page=${params.page}&roleType=${params.roleType}`
  const res = await http.get(url)
  return res
}

/**
 * 整单删除
 * @param {*} params
 */
async function deleteHeaderAndLine (params) {
  const data = {
    headId: params.headId,
    roleType: params.roleType
  }
  const url = `/prepayment/api/cash/prepayment/requisitionHead/deleteHeadAndLineByHeadId?headId=${params.headId}&roleType=${params.roleType}`
  const res = await http.delete(url, data)
  return res
}

/**
 * 获取单据类型（包括新建头时和筛选列表时）
 * @param {*筛选：queryAll、新建：queryByEmployeeId} is_url
 * @param {*筛选需要} setOfBookId
 * @param {*新建需要} userId
 * @param {*新建需要} isEnabled
 * @param {*} roleType
 */
async function getAdvancePaymentType (params) {
  let url = ''
  if (params.is_url === 'queryByEmployeeId') {
    url = `/prepayment/api/cash/pay/requisition/types/queryByEmployeeId?userId=${params.userId}&isEnabled=${params.isEnabled}&roleType=${params.roleType}`
  } else {
    url = `/prepayment/api/cash/pay/requisition/types/queryAll?setOfBookId=${params.setOfBookId}&roleType=${params.roleType}`
  }
  const res = await http.get(url)
  return res
}

/***
 * TODO
 * 行删除
 * @param {*} params
 */
async function deleteLine (params) {
  const url = `/prepayment/api/cash/prepayment/requisitionHead/deleteLineById?lineId=${params.lineId}&roleType=TENANT`
  return http.delete(url)
}

/**
 * 公司查询接口
 * @param {*page} 当前页数
 * @param {*size} 每页显示的条数
 * @param {*} roleType
 */
async function getCompany (params) {
  const data = {
    page: params.page,
    size: params.size,
    setOfBooksId: params.setOfBooksId,
    roleType: params.roleType
  }
  const url = '/mdata/api/company/by/condition'
  const res = await http.get(url, data)
  return res
}

/**
 * 部门查询接口
 * @param {*page} 当前页数
 * @param {*size} 每页显示的条数
 * @param {*} roleType
 */
async function getDepartmentList (params) {
  const url = `/mdata/api/DepartmentGroup/selectDept/enabled?page=0&size=1000&tenantId=${params.tenantId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 * 借款单头保存修改接口
 */
async function saveLoanHeader (params) {
  const url = '/prepayment/api/cash/prepayment/requisitionHead?roleType=TENANT'
  const res = await http.post(url, params)
  return res
}
/**
 * 借款单头保存修改接口
 */
async function getReqClassificationList (params) {
  const url = `/expense/api/expense/types/transaction/class/getList?flag=false&setOfBooksId=${params.setOfBooksId}&expenseTypeId=${params.expenseTypeId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 获取用户默认信息
 * @param {*} params
 */
async function getUserDefault (param) {
  const url = `/mdata/api/users/oid/${param.is_url}?roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 * 获取申请人员列表
 * @param {*} params
 */
async function getApplaction (param) {
  const url = `/prepayment/api/cash/pay/requisition/types/users?payReqTypeId=${param.payReqTypeId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 *  获取借款类型（行内）
 * @param {*} is_url
 * @param {*} roleType
 */
async function getPaymentType (params) {
  // let url = `/api/custom/enumerations/template/by/type?type=ZJ_PAYMENT_TYPE&roleType=${params.roleType}`
  const url = '/prepayment/api/cash/pay/requisition/types/queryTransactionClassByTypeId/' + params.is_url + '?roleType=TENANT'
  const res = await http.get(url)
  return res
}

/**
 * 获取付款方式（行内）
 * @param {*} roleType
 */
async function getPayMethod (params) {
  const url = `/api/custom/enumerations/template/by/type?type=${params.type}&roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 *单据提交
 */
async function submitPayment (params) {
  const data = {
    documentId: params.documentId,
    documentTypeId: params.documentTypeId,
    versionNumber: params.versionNumber
  }
  const url = '/prepayment/api/cash/prepayment/requisitionHead/submit?roleType=TENANT'
  const res = await http.post(url, data)
  return res
}

/**
 * 获取收款方(员工)
 */
async function getEmpPayee (params) {
  const it = {
    page: params.page || 0,
    size: params.size || 10,
    name: params.name,
    code: params.code,
    companyId: params.companyId
  }
  const url = `/mdata/api/contact/account/by/name/code?roleType=TENANT${judgetFieldValue(it)}`
  return http.get(url)
}

/**
 * 获取收款方（供应商）
 */
async function getSupplierPayee (params) {
  const it = {
    page: params.page || 0,
    size: params.size || 10,
    name: params.name,
    code: params.code,
    companyId: params.companyId
  }
  const url = `/mdata/api/tk/vendor/assign/company/by/companyId/name/code?&vendorEnabled=true&roleType=TENANT${judgetFieldValue(it)}`
  return http.get(url)
}

/**
 * 关联申请单查询
 */
async function relationApply (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    applicationNumber: params.applicationNumber,
    applicationType: params.applicationType,
    prepaymentTypeId: params.prepaymentTypeId,
    companyId: params.companyId,
    unitId: params.unitId,
    applicantId: params.applicantId,
    currencyCode: params.currencyCode
  }
  const url = `/expense/api/expense/application/associated/by/prepayment?roleType=TENANT${judgetFieldValue(data)}`
  const res = await http.get(url)
  return res
}

/***
 * 关联合同查询
 */
async function getContracts (params) {
  let data = {
    page: params.page,
    size: params.size,
    companyId: params.companyId,
    partnerCategory: params.partnerCategory,
    partnerId: params.partnerId,
    documentType: params.documentType,
    currency: params.currency,
    contractNumber: params.contractNumber,
    contractName: params.contractName
  }
  const url = `/contract/api/contract/document/relations/associate/query?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 借款单行保存
 */
async function saveLine (params) {
  const url = '/prepayment/api/cash/prepayment/requisitionHead/insertOrUpdateLine?roleType=TENANT'
  const res = await http.post(url, params)
  return res
}

/**
 * 收款方银行信息（员工）
 */
async function getEmplyeeBankList (params) {
  const url = `/mdata/api/contact/bank/account/user/id?userID=${params.userID || ''}&roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 * 收款方银行信息（供应商）
 */
async function getSupplierBankList (params) {
  const it = {
    page: 0,
    size: 999,
    vendorInfoId: params.vendorInfoId,
    status: params.status,
    roleType: 'TENANT'
  }
  const url = `/mdata/api/ven/bank?roleType=TENANT${judgetFieldValue(it)}`
  return http.get(url)
}

/**
 * 获取行默认收款方式
 */
async function getLineDefaultPayWay (params) {
  const url = `/prepayment/api/cash/pay/requisition/types/${params.paymentReqTypeId}`
  const res = await http.get(url)
  return res
}

/**
 * 获取行默认收款方信息
 */
async function getLineDefaultReserverInfo (params) {
  const url = `/mdata/api/contact/bank/account/user/id?userID=${params.employeeId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 借款获取借款事项列表
 */
async function getBorrowingsList (params) {
  const url = `/expense/api/expense/report/type/section/req/type?roleType=TENANT&page=0&size=1000${judgetFieldValue(params)}`
  const res = await http.get(url)
  return res
}
/**
 * 借款费用类型
 */
async function getLoanExpType () {
  const url = `/expense/api/expense/types/category/query/book?typeFlag=1&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&page=0&size=9999&roleType=TENAN`
  const res = await http.get(url)
  return res
}
/**
 * 获取借款借款类型默认信息
 * @param {*} params
 */
async function getloanTypeDefault (params) {
  const url = `/expense/api/expense/types/category/by/categoryId?expenseTypeCategoryId=${params.expenseTypeCategoryId}&documentType=801003&configFlag=true&roleType=TENAN`
  const res = await http.get(url)
  return res
}
async function getBankList (params) {
  const url = `/mdata/api/bank/infos/search?roleType=TENAN${judgetFieldValue(params)}`
  const res = await http.get(url)
  return res
}
async function saveVender (params) {
  const url = `/mdata/api/tk/vendor/prePayment/schPaymentVendorFastRegister?roleType=TENANT`
  const res = await http.post(url, params)
  return res
}
export {
  getAdvancePaymentList,
  getAdvancePaymentHead,
  getPaymentInformation,
  deleteHeaderAndLine,
  deleteLine,
  getAdvancePaymentType,
  getCompany,
  getDepartmentList,
  saveLoanHeader,
  getUserDefault,
  getApplaction,
  getPaymentType,
  getPayMethod,
  submitPayment,
  getEmpPayee,
  getSupplierPayee,
  relationApply,
  getContracts,
  saveLine,
  getEmplyeeBankList,
  getSupplierBankList,
  getLineDefaultPayWay,
  getLineDefaultReserverInfo,
  getBorrowingsList,
  getReqClassificationList,
  getLoanExpType,
  getloanTypeDefault,
  getBankList,
  saveVender
}
