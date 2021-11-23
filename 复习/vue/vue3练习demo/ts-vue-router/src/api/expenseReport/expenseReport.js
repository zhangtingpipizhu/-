/**
 * 报销单相关API接口
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
 * http://101.132.162.31:9081/expense/api/expense/report/header/my?page=0&size=10&documentTypeId=1111557853846159361&requisitionDateFrom=2019-09-06&requisitionDateTo=2019-09-06&applicantId=1159994297180131329&status=1001&currencyCode=CNY&amountFrom=100&amountTo=200&remark=iiiiii&allForm=false&roleType=TENANT
 */
async function getExpenseReportList (params) {
  let url = '/expense/api/expense/report/header/my?page=' + (params.page || 0) + '&size=' + (params.size || 10) +
    '&editor=' + (params.editor || false) + '&status=' + (params.status || '') + '&allForm=' + (params.allForm || false) +
    '&documentTypeId=' + (params.documentTypeId || '') + '&applicantId=' + (params.applicantId || '') + '&requisitionDateFrom=' + (params.requisitionDateFrom || '') +
    '&requisitionDateTo=' + (params.requisitionDateTo || '') + '&amountFrom=' + (params.amountFrom || '') + '&amountTo=' + (params.amountTo || '') +
    '&remark=' + (params.remark || '') + '&requisitionNumber=' + (params.requisitionNumber || '') + '&passed=' + (params.passed || '') + '&roleType=TENANT'
  url = encodeURI(url)
  return http.get(url)
}

/**
 * 整单删除
 * @param {*单据id} is_url
 * @param {*} roleType
 */
async function deleteExpense (params) {
  const url = '/expense/api/expense/report/header/delete/' + params.is_url + '?roleType=TENANT'
  return http.delete(url)
}

/**
 * 创建报销单头类型列表
 */
async function getExpenseHeaderTypeList (params) {
  const url = '/expense/api/expense/report/type/owner/all?setOfBooksId=' + params.setOfBooksId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取申请人列表信息
 */
async function getExpApplyerInfoList (params) {
  const url = '/expense/api/expense/report/type/users?expenseReportTypeId=' + params.expenseReportTypeId + '&size=1000&page=0&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取报销单头数据查询
 */
async function getExpenseHeader (params) {
  const url = `/expense/api/expense/report/header/by/id?expenseReportId=${params.expenseReportId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取头默认信息
 */
async function getExpHeaderDefaultInfo (params) {
  const url = '/expense/api/expense/report/type/properties/detail?expenseReportTypeId=' + params.expenseReportTypeId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 收款方类型
 */
async function getPayeeTypeList (params) {
  const url = '/base/api/custom/enumerations/template/by/type?type=' + params.type
  return http.get(url)
}

/**
 * 银行列表
 */
async function getVenBankList (params) {
  let url = ''
  if (params.payeeType === 'VENDER') {
    url = '/mdata/api/ven/bank?page=' + params.page + '&size=' + params.size + '&vendorInfoId=' + (params.userId || '') + '&status=' + params.status + '&roleType=TENANT'
  } else {
    url = `/mdata/api/contact/bank/account/user/id?userID=${params.userId}&roleType=TENANT`
  }
  return http.get(url)
}

/**
 * 报销单头保存
 */
async function saveExpHeader (params) {
  const url = '/expense/api/expense/report/header/save?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 获取报销单行数据查询
 */
async function getExpenseLine (params) {
  const url = '/expense/api/expense/report/line/query/by/headerId?page=' + (params.page || 0) + '&size=' + (params.size || 100) + '&reportHeaderId=' + params.reportHeaderId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取报销单付款行数据查询
 */
async function getPaymentSchedule (params) {
  const url = '/expense/api/expense/report/payment/schedule/query?page=' + (params.page || 0) + '&size=' + (params.size || 100) + '&reportHeaderId=' + params.reportHeaderId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取付款方式（计划付款行）
 * @param {*} roleType
 */
async function getPayMethod (params) {
  const url = '/api/custom/enumerations/template/by/type?type=' + params.type + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取付款用途列表（计划付款行）
 */
async function getPaymentUse (params) {
  const url = '/expense/api/expense/report/type/section/cash/transaction/class?page=0&size=1000&expenseReportTypeId=' + params.expenseReportTypeId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 报销单行保存
 */
async function saveExpenseLine (params) {
  const url = '/expense/api/expense/report/line/save'
  return http.post(url, params)
}

/**
 * 报销单--行删除
 */
async function deleteExpLine (params) {
  const url = '/expense/api/expense/report/line/delete/' + params.is_url + '?roleType=TENANT'
  return http.delete(url)
}
/**
 * 编辑报销单头详情
 */
async function getExpEditHeaderDetail (params) {
  let data = {
    expenseReportTypeId: params.expenseReportTypeId,
    headerId: params.headerId
  }
  const url = `/expense/api/expense/report/type/properties/detail?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 获取头全部默认信息-查看
 */
async function queryExpHeaderDefaultInfo (params) {
  const url = `/expense/api/expense/report/header/by/id?expenseReportId=${params.expenseReportId || ''}&roleType=TENANT`
  return http.get(url)
}

/**
 * 报销单费用类型列表
 */
async function getCostTypeList (params) {
  const url = '/expense/api/expense/report/type/section/expense/type?expenseReportTypeId=' + (params.expenseReportTypeId || '') + '&companyId=' + (params.companyId || '') + '&departmentId=' + (params.departmentId || '') + '&employeeId=' + (params.employeeId || '') + '&page=0&size=1000&typeCategoryId=' + (params.typeCategoryId || '') + '&name=' + (params.name || '') + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 报销单行地点选择
 */
async function selectPlace (params) {
  // console.log('this.componetParams.params--->' + JSON.stringify(params))
  const data = {
    chinaFlag: true,
    containCity: params.containCity,
    containCountry: params.containCountry,
    containRegion: params.containRegion,
    containState: params.containState,
    page: params.page,
    size: params.size,
    description: params.description
  }
  const url = `/mdata/api/location/search/cities?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 报销单 - 付款信息 - 行删除
 * @param {*单据id} is_url
 * @param {*} roleType
 */
async function expReportDeletePaymentLine (params) {
  const url = '/expense/api/expense/report/payment/schedule/delete/' + params.is_url + '?roleType=TENANT'
  return http.delete(url)
}

/**
 * 报帐单提交
 */
async function expReportBgtControl (params) {
  const url = '/expense/api/expense/report/submit?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 获取付款行信息的默认配置
 */
async function getPayLineDefaultSetting (params) {
  const url = '/expense/api/expense/report/type/properties/detail?expenseReportTypeId=' + params.expenseReportTypeId + '&headerId=' + params.headerId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 收款方银行信息（员工）
 */
async function getEmplyeeBankList (params) {
  const url = '/mdata/api/contact/bank/account/user/id?userID=' + params.userID + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 收款方银行信息（供应商）
 */
async function getSupplierBankList (params) {
  const url = '/mdata/api/ven/bank?page=0&size=1000&vendorInfoId=' + params.vendorInfoId + '&status=' + params.status + '&roleType=roleType'
  return http.get(url)
}

/**
 * 付款行信息保存
 */
async function savePaymentLine (params) {
  const url = '/expense/api/expense/report/payment/schedule/save?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 借款核销列表
*/
async function getPrePaymentList (params) {
  const url = '/payment/api/payment/cash/write/off/query?tenantId=' + params.tenantId + '&companyId=' + params.companyId + '&partnerCategory=' + params.partnerCategory + '&partnerId=' + params.partnerId + '&formId=' + (params.formId || '') + '&exportHeaderId=' + params.exportHeaderId + '&documentLineId=' + params.documentLineId + '&currencyCode=' + params.currencyCode + '&writeOffAmount=' + params.writeOffAmount + '&amount=' + params.amount + '&page=' + params.page + '&size=' + params.size + '&documentType=PUBLIC_REPORT&roleType=TENANT'
  return http.get(url)
}

/**
 * 借款核销确认
 */
async function prePaymentCancellation (params) {
  const url = '/payment/api/payment/cash/write/off/do?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 获取分摊行公司列表
 */
async function getApportionmentCompanyList (params) {
  const url = '/expense/api/expense/report/type/dist/setting/query/company/by/expenseTypeId?page=0&size=1000&expenseTypeId=' + params.expenseTypeId + '&companyId=' + params.companyId + '&departmentId=' + params.departmentId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取分摊行部门列表
 */
async function getApportionmentDepartmentList (params) {
  const url = '/expense/api/expense/report/type/dist/setting/query/department/by/expenseTypeId?page=0&size=1000&departmentCode=' + params.departmentCode + '&departmentName=' + params.departmentName + '&expenseTypeId=' + params.expenseTypeId + '&companyId=' + params.companyId + '&departmentId=' + params.departmentId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取分摊行责任中心列表
 */
async function getApportionmentRespCenterList (params) {
  const url = '/expense/api/expense/report/type/dist/setting/query/respCenter/by/expenseTypeId?page=0&size=1000&expenseTypeId=' + params.expenseTypeId + '&companyId=' + params.companyId + '&departmentId=' + params.departmentId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取分摊行动态字段列表值
 */
async function getApportionmentDemensionList (params) {
  const url = '/mdata/api/dimension/item/list/By/dimensionId/companyId/unitId/userId?dimensionId=' + params.dimensionId + '&enabled=true&userId=' + params.userId + '&companyId=' + params.companyId + '&unitId=' + params.unitId + '&roleType=TENANT'
  return http.get(url)
}

/**
* 获取分摊行动态字段列表值
*/
async function getApportionmentApplyList (params) {
  const url = '/expense/api/expense/application/release?expenseTypeId=' + params.expenseTypeId + '&currencyCode=' + params.currencyCode + '&expReportHeaderId=' + params.expReportHeaderId + '&documentNumber=' + params.documentNumber + '&page=' + params.page + '&size=' + params.size + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 查看费用行详情
 */
async function queryReportLineDetail (params) {
  const url = '/expense/api/expense/report/line/query/by/id?id=' + params.lineId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 查看分摊行列表
 */
async function queryApportionmentList (params) {
  const url = '/expense/api/expense/report/dist/query/by/lineId?lineId=' + params.lineId + '&page=0&size=1000&roleType=TENANT'
  return http.get(url)
}

/**
 * 获取发票类型列表
 * /expense/api/invoice/type/query/for/book?tenantId=1115423660382261250&setOfBooksId=1115880952584667138&roleType=TENANT
 */
async function getInvoiceTypeList (type = false) {
  const url = type ? `/mdata/api/invoice/type/query/for/book?tenantId=${window.vm.getBaseInfoOfStore('companyInfo').tenantId}&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT` : '/mdata/api/invoice/type/sob/tenant/query?roleType=TENANT'
  return http.get(url)
}

/**
 * 发票验真
 */
async function invoiceVerifyTrue (params) {
  const data = {
    invoiceHead: params,
    attachmentUrl: params.attachmentUrl
  }
  console.log('发票验真调用参数')
  console.log(data)
  const url = '/expense/api/invoice/head/invoicecheck/returndetail'
  return http.post(url, data)
}

/**
 * 账本自动报销-手工录入
 */
// async function autoBookInvoiceManual (params) {
//   const data = {
//     invoiceHead: params,
//     attachmentUrl: params.attachmentUrl,
//   }
//   console.log('发票验真调用参数')
//   console.log(data)
//   const url = '/expense/api/invoice/head/invoicecheck/returndetail'
//   return http.post(url, data)
// }

/**
 * 删除发票
 */
async function deleteInvoice (params) {
  const url = '/expense/api/expense/report/line/delete/invoice?invoiceLineId=' + params.invoiceLineId + '&lineId=' + params.lineId + '&roleType=TENANT'
  return http.delete(url)
}

/**
 * 获取发票详情信息
 */
async function getInvoiceDetail (params) {
  const url = '/expense/api/invoice/head/query/by/reportLineId/' + params.is_url + '?roleType=TENANT'
  return http.get(url)
}

/**
 * 获取账本列表
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*费用类型} expenseTypeName
 * @param {*金额从} amountFrom
 * @param {*金额至} amountTo
 * @param {*日期从} requisitionDateFrom
 * @param {*日期至} requisitionDateTo
 * http://101.132.162.31:9081/expense/api/expense/book/release?page=0&size=10&expenseReportTypeId=1136092144937144322&currencyCode=CNY&requisitionDateFrom=CNY&requisitionDateTo=CNY&roleType=TENANT
 */
async function getExpenseBookList (params) {
  // const url = '/expense/api/expense/book/release?page=' + params.page + '&size=' + params.size +
  //   '&expenseTypeName=' + (params.expenseTypeName || '') + '&amountFrom=' + (params.amountFrom || '') +
  //   '&amountTo=' + (params.amountTo || '') + '&expenseReportTypeId=' + (params.expenseReportTypeId || '') +
  //   '&requisitionDateFrom=' + (params.requisitionDateFrom || '') + '&requisitionDateTo=' + (params.requisitionDateTo || '') +
  //   '&currencyCode=' + (params.currencyCode || '') + '&roleType=TENANT'
  const url = `/expense/api/expense/book/header/query?associationFlag=false&roleType=TENANT${judgetFieldValue(params)}`
  return http.get(url)
}

/**
 * 从账本导入
 * @param {*账本列表id组合的数组} params
 */
async function createFromBook (params) {
  const url = '/expense/api/expense/book/header/impotReportLine?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 费用政策校验
 * @param {*报销单头id} id
 */
async function checkPolicy (params) {
  const url = '/expense/api/expense/report/submit/check/policy?id=' + params.id + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 税率列表
 */
async function getTaxRateList () {
  const url = '/api/custom/enumerations/template/by/type?type=TAX_RATE&roleType=TENANT'
  return http.get(url)
}

/**
 * 常用报销单类型查询
 */
async function getNormalDoctype () {
  const url = '/expense/api/expense/report/type/query/common'

  return http.get(url)
}

/**
 * 获取单据动态
 * @queryStatus {*需要查询的状态，PAYED:已付款/APPROVAL:审批中/APPROVAL_PASS:已审批/AUDIT:已审核/ALL:全部}
 * http://101.132.162.31:9081/expense/api/expense/report/personal/document/query?queryStatus=ALL
 */
async function getDocDynamic (queryStatus) {
  const url = '/expense/api/expense/report/personal/document/query?queryStatus=' + queryStatus
  return http.get(url)
}

/**
 * 发票保存
 * @params 发票信息 /expense/api/invoice/head/check/invoice
 *
 */
async function expInvoiceSave (params) {
  const url = '/expense/api/invoice/head/check/invoice'
  return http.post(url, params)
}
/**
 * warning政策原因保存
 * @params /expense/api/expense/policy/check/info/save?roleType=TENANT
 *
 */
async function policyReaconSave (params) {
  const url = '/expense/api/expense/policy/check/info/save?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 发票关闭
 * @params /expense/api/expense/report/close/invoice?documentId=1206784027623100418&ignoreWarningFlag=true&roleType=TENANT
 *
 */
async function invoiceCloseSubmit (params) {
  const url = `/expense/api/expense/report/close/invoice?documentId=${params.documentId || ''}&ignoreWarningFlag=${params.ignoreWarningFlag}&roleType=TENANT`
  return http.post(url, params.invoiceHeads)
}
/**
 * 分摊行责任中心默认值
 * @params /mdata/api/department/sob/responsibility/query/default/responsibility/center?companyId=1106384489674678274&departmentId=1166259951985803266&roleType=TENANT
 *
 */
async function getResCenterDefaultInfo (params) {
  // const url = `/mdata/api/department/sob/responsibility/query/default/responsibility/center?companyId=${params.companyId || ''}&departmentId=${params.departmentId || ''}&roleType=TENANT`
  let url = `/expense/api/expense/accrual/lines/getDefaultResponsibilityCenter`
  return http.get(url, {params: {
    companyId: params.companyId,
    unitId: params.departmentId
  }})
  // return http.get(url)
}
/**
 * 自定义范围：分摊行公司部门责任中心-CUSTOM_RANGE
 * @params /expense/api/expense/report/type/dist/setting/1161484746683510786?roleType=TENANT
 *
 */
async function getCustomRangeList (params) {
  const url = `/expense/api/expense/report/type/dist/setting/${params.reportTypeId || ''}?roleType=TENANT`
  return http.get(url)
}
/**
 * 账套下所有公司/本公司及下属公司/下属公司：分摊行公司列表-其他范围集合
 *账套下所有公司：ALL_COM_IN_SOB（/mdata/api/company/by/condition?page=0&size=10&setOfBooksId=1083762150064451585&name=55&roleType=TENANT）
 *本公司及下属公司：CURRENT_COM_&_SUB_COM（/mdata/api/company/get/children/by/id?page=0&size=10&companyId=1156484480271224833&includeOneself=true&roleType=TENANT&companyName=11）
 *下属公司：SUB_COM（/mdata/api/company/get/children/by/id?page=0&size=10&companyId=1156484480271224833&roleType=TENANT&companyName=11）
 */
async function getCompanyOtherRangeList (params) {
  let url = ''
  switch (params.companyDistRange) {
    case 'ALL_COM_IN_SOB':
      url = `/mdata/api/company/by/condition?page=${params.page || 0}&size=${params.size || 10}&setOfBooksId=${params.setOfBooksId || ''}&name=${params.name || ''}&roleType=TENANT`
      break
    case 'CURRENT_COM_&_SUB_COM':
      url = `/mdata/api/company/get/children/by/id?page=${params.page || 0}&size=${params.size || 10}&companyId=${params.companyId || ''}&companyName=${params.name || ''}&includeOneself=true&roleType=TENANT`
      break
    case 'SUB_COM':
      url = `/mdata/api/company/get/children/by/id?page=${params.page || 0}&size=${params.size || 10}&companyId=${params.companyId || ''}&companyName=${params.name || ''}&roleType=TENANT`
      break
  }
  return http.get(url)
}
/**
 * 部门分摊范围
 *租户下所有部门：ALL_DEP_IN_TENANT(/mdata/api/DepartmentGroup/selectDept/enabled?page=0&size=10&companyId=1083751704185716737&roleType=TENANT&name=看看)
 *公司下所有部门：ALL_DEP_IN_COM(/mdata/api/company/associate/department/query/department/lov?page=0&size=10&companyId=1106384489674678274departmentName=66&roleType=TENANT)
 */
async function getDepOtherRangeList (params) {
  let url = ''
  // switch (params.departmentDistRange) {
  //   case 'ALL_DEP_IN_TENANT':
  url = `/mdata/api/DepartmentGroup/selectDept/enabled?page=${params.page || 0}&size=${params.size || 10}&companyId=${params.companyId || ''}&name=${params.departmentName || ''}&roleType=TENANT`
  // break
  //   case 'ALL_DEP_IN_COM':
  //     url = `/mdata/api/company/associate/department/query/department/lov?page=${params.page || 0}&size=${params.size || 10}&companyId=${params.companyId || ''}&departmentName=${params.departmentName || ''}&roleType=TENANT`
  //     break
  // }
  return http.get(url)
}
/**
 * 责任中心分摊范围
 *部门对应责任中心：DEP_RES_CENTER(/mdata/api/company/associate/department/query/responsibility?page=0&size=10&codeName=33&companyId=&departmentId=1120524877464854529&roleType=TENANT)
 */
async function getResOtherRangeList (params) {
  // const url = `/mdata/api/company/associate/department/query/responsibility?page=${params.page || 0}&size=${params.size || 10}&codeName=${params.codeName || ''}&companyId=${params.companyId || ''}&departmentId=${params.departmentId || ''}&roleType=TENANT`
  // return http.get(url)
  // let data = {
  //   companyId: params.companyId,
  //   departmentId: params.departmentId,
  //   name: params.codeName,
  //   size: params.size,
  //   page: params.page
  // }
  const url = `/mdata/api/responsibilityCenter/query/by/company/department?roleType=TENANT${judgetFieldValue(params)}`
  return http.get(url)
}

/**
 * 报销单头币种接口变更
 * /mdata/api/currency/rate/list?enable=true&setOfBooksId=1107884147185029121&tenantId=1107839525171277825&roleType=TENANT
 */
async function getExpHeaderCurrencyList (params) {
  const url = `/mdata/api/currency/rate/list?enable=true&setOfBooksId=${params.setOfBooksId || ''}&roleType=TENANT`
  return http.get(url)
}

/**
 * 发票验重
 * /expense/api/invoice/head/check/invoiceCode/invoiceNo?invoiceCode=031001800304&invoiceNo=43738215&roleType=TENANT
 */
async function invoiceCheckRepeat (params) {
  const url = `/expense/api/invoice/head/check/invoiceCode/invoiceNo?invoiceCode=${params.invoiceCode}&invoiceNo=${params.invoiceNo}&roleType=TENANT`
  return http.get(url)
}

/**
 * 发票是否已验真
 * /mdata/api/invoice/type/mould/query/1161486308352913409?roleType=TENANT
 */
async function invoiceCheckVerifyTrue (params) {
  const url = `/mdata/api/invoice/type/mould/query/${params.invoiceTypeId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 关联资产卡片列表
 * 报销单头公司=资产卡片使用公司(HEADER_COM)：/expense/api/expense/report/type/query/assetInfo/byAssetBasis?page=0&size=10&assetNumber=11&assetName=22&tagNumber=33&costFrom=44&costTo=55&companyId=1107911826009493506&setOfBooksId=1107884147185029121&expenseCategoryId=1108298681346232322&expenseTypeId=1108299599785562113&roleType=TENANT
 * 报销单头部门=资产卡片使用部门(HEADER_DEPARTMENT)：/expense/api/expense/report/type/query/assetInfo/byAssetBasis?page=0&size=10&assetNumber=11&assetName=22&tagNumber=33&costFrom=44&costTo=55&departmentId=1107914485642825730&setOfBooksId=1107884147185029121&expenseCategoryId=1108298681346232322&expenseTypeId=1108299599785562113&roleType=TENANT
 * 报销单头公司+头部门=资产卡片使用公司+使用部门(COM_DEP)：/expense/api/expense/report/type/query/assetInfo/byAssetBasis?page=0&size=10&companyId=1107911826009493506&departmentId=1107914485642825730&setOfBooksId=1107884147185029121&expenseCategoryId=1108298681346232322&expenseTypeId=1108299599785562113&roleType=TENANT
 * 报销单头申请人=资产卡片使用人(HEADER_EMPLOYEE)：/expense/api/expense/report/type/query/assetInfo/byAssetBasis?page=0&size=10&userId=1107918162780569602&setOfBooksId=1107884147185029121&expenseCategoryId=1108298681346232322&expenseTypeId=1108299599785562113&roleType=TENANT
 */
async function relateAssetCardList (params) {
  const it = {
    page: params.page || 0,
    size: params.size || 10,
    assetNumber: params.assetNumber,
    assetName: params.assetName,
    tagNumber: params.tagNumber,
    costFrom: params.costFrom,
    costTo: params.costTo,
    companyId: params.companyId, // HEADER_COM
    departmentId: params.departmentId, // HEADER_DEPARTMENT
    userId: params.userId, // HEADER_EMPLOYEE
    setOfBooksId: params.setOfBooksId,
    expenseCategoryId: params.expenseCategoryId,
    expenseTypeId: params.expenseTypeId
  }
  const url = `/expense/api/expense/report/type/query/assetInfo/byAssetBasis?roleType=TENANT${judgetFieldValue(it)}`
  return http.post(url, [])
}

/**
 * 取消提交
 * /expense/api/expense/report/submit/cancel?id=1263438622455668738&roleType=TENANT
 */
async function submitCancel (params) {
  const url = `/expense/api/expense/report/submit/cancel?id=${params.id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 查询报销单头币种
 */
async function getHeaderCurrencyList () {
  const url = `/mdata/api/currency/base/enable/all?roleType=TENANT`
  return http.get(url)
}
/**
 * 查询报默认币种
 */
async function getDefaultCurrency (setOfBooksId) {
  const url = `/mdata/api/setOfBooks/${setOfBooksId}?roleType=TENANT`
  return http.get(url)
}
/**
 * 获取公务卡金额
 *
 */
async function getBusinessCardAmount (id) {
  const url = `/expense/api/expense/report/get/report/need/without/bccard/amount/${id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 获取公务卡原因列表
 */
async function getBusinessCardResonList () {
  const url = `/base/api/custom/enumerations/template/by/type?type=NO_BC_REASON&roleType=TENANT`
  return http.get(url)
}
/**
 * 获取公务卡列表
 */
async function getCardLisd (id) {
  const url = `/expense/api/expense/report/get/report/without/bccard/reason?page=0&size=100&expReportHeaderId=${id}&roleType=TENANT`
  return http.get(url)
}
/**
 * 删除公务卡原因
 */
async function deleteBusinessReson (id) {
  const url = `/expense/api/expense/report/delete/report/without/bccard/reason/${id}?roleType=TENANT`
  return http.delete(url)
}
/**
 * 保存公务卡原因
 */
async function saveBusinesREson (param) {
  const url = `/expense/api/expense/report//update/report/without/bccard/reason?roleType=TENAN`
  return http.post(url, param)
}
async function saveVender (params) {
  const url = `/mdata/api/tk/vendor/report/schPaymentVendorFastRegister?roleType=TENANT`
  const res = await http.post(url, params)
  return res
}
/**
 * 公务卡列表
 */
async function getUseBussinesCardList (params) {
  const url = `/expense/api/expense/bc/relation/detail/selectReportBcTransactionRelation?roleType=TENANT${judgetFieldValue(params)}`
  return http.get(url)
}
export {
  getExpenseReportList,
  deleteExpense,
  getExpenseHeaderTypeList,
  getExpApplyerInfoList,
  getExpHeaderDefaultInfo,
  getPayeeTypeList,
  saveExpHeader,
  getExpenseHeader,
  getExpenseLine,
  getPaymentSchedule,
  getPayMethod,
  getPaymentUse,
  saveExpenseLine,
  deleteExpLine,
  getExpEditHeaderDetail,
  queryExpHeaderDefaultInfo,
  expReportDeletePaymentLine,
  getPayLineDefaultSetting,
  getEmplyeeBankList,
  getSupplierBankList,
  expReportBgtControl,
  getCostTypeList,
  selectPlace,
  savePaymentLine,
  getPrePaymentList,
  prePaymentCancellation,
  getApportionmentCompanyList,
  getApportionmentDepartmentList,
  getApportionmentRespCenterList,
  getApportionmentDemensionList,
  getApportionmentApplyList,
  queryReportLineDetail,
  queryApportionmentList,
  getInvoiceTypeList,
  invoiceVerifyTrue,
  deleteInvoice,
  getInvoiceDetail,
  getExpenseBookList,
  createFromBook,
  checkPolicy,
  getTaxRateList,
  getNormalDoctype,
  getVenBankList,
  getDocDynamic,
  expInvoiceSave,
  policyReaconSave,
  invoiceCloseSubmit,
  getResCenterDefaultInfo,
  getCustomRangeList,
  getCompanyOtherRangeList,
  getDepOtherRangeList,
  getResOtherRangeList,
  getExpHeaderCurrencyList,
  invoiceCheckRepeat,
  invoiceCheckVerifyTrue,
  relateAssetCardList,
  submitCancel,
  getHeaderCurrencyList,
  getDefaultCurrency,
  getBusinessCardAmount,
  getBusinessCardResonList,
  getCardLisd,
  deleteBusinessReson,
  saveBusinesREson,
  saveVender,
  getUseBussinesCardList
}
