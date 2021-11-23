/**
 * 审批相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 获取代办列表信息
 * @param {*} params
 * /workflow/api/workflow/getApprovalToPendList?page=0&size=10&entityType=110400003&documentTypeName=333
 * &applicantId=1158920228690518017&beginDate=2020-02-19&endDate=2020-02-22&amountFrom=1&amountTo=100&remark=rrrr&roleType=TENANT
 */
async function getApproveToPendList (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    entityType: params.entityType,
    documentNumber: params.documentNumber,
    documentTypeName: params.documentTypeName,
    applicantId: params.applicantId,
    beginDate: params.beginDate,
    endDate: params.endDate,
    amountFrom: params.amountFrom,
    amountTo: params.amountTo,
    remark: params.remark,
    mobileApprovalFlag: true,
    orderAsc: params.orderAsc,
    roleType: 'TENANT'
  }
  let url = ``
  if (params.approveType === 'TKIFOL_MC') {
    url = `/workflow/api/workflow/getApprovalToPendListNew?toDoType=MC&roleType=TENANT${judgetFieldValue(data)}`
  } else if (params.approveType === 'TKIFOL_BP') {
    url = `/workflow/api/workflow/getApprovalToPendListNew?toDoType=BP&roleType=TENANT${judgetFieldValue(data)}`
  } else {
    url = `/workflow/api/workflow/getApprovalToPendList?roleType=TENANT${judgetFieldValue(data)}`
  }
  url = encodeURI(url)
  return http.get(url)
}

/**
 * 获取已办列表信息
 * @param {*} params
 * /workflow/api/workflow/myWorkDone?page=0&size=10&entityType=601002&documentTypeName=22
 * &subBeginDate=2020-02-01&subEndDate=2020-02-21&approvalBeginDate=2020-02-21&approvalEndDate=2020-02-21
 * &amountFrom=100&amountTo=200&applicantId=1158920228690518017&approvalNodeName=999&operation=2001&roleType=TENANT
 */
async function getMyWorkDone (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    entityType: params.entityType,
    documentNumber: params.documentNumber,
    documentTypeName: params.documentTypeName,
    subBeginDate: params.subBeginDate,
    subEndDate: params.subEndDate,
    approvalBeginDate: params.approvalBeginDate,
    approvalEndDate: params.approvalEndDate,
    amountFrom: params.amountFrom,
    amountTo: params.amountTo,
    applicantId: params.applicantId,
    approvalNodeName: params.approvalNodeName,
    operation: params.operation,
    remark: params.remark,
    mobileApprovalFlag: true,
    orderAsc: params.orderAsc,
    roleType: 'TENANT'
  }
  let url = `/workflow/api/workflow/myWorkDone?roleType=TENANT${judgetFieldValue(data)}`
  url = encodeURI(url)
  return http.get(url)
}
/**
 * 审批同意
 * @param {*} params
 */
async function pass (params) {
  const data = {
    entities: [
      {
        entityId: params.entityId,
        entityType: params.entityType,
        taskId: params.taskId
      }
    ],
    countersignApproverOids: params.countersignApproverOids || []
  }
  const url = '/workflow/api/workflow/pass?roleType=TENANT'
  const res = http.post(url, data)
  return res
}

/**
 * 审批驳回
 * @param {*} params
 */
async function reject (params, isReturn) {
  const data = {
    approvalTxt: params.approvalTxt,
    entities: [
      {
        entityId: params.entityId,
        entityType: params.entityType,
        taskId: params.taskId
      }
    ],
    rejectRule: null
  }
  let url = ``
  if (isReturn) {
    url = '/workflow/api/workflow/reject?roleType=TENANT'// 驳回
  } else {
    url = '/workflow/api/workflow/refuse?roleType=TENANT'// 退回
  }
  const res = http.post(url, data)
  return res
}

/**
 * 单据大类查询
 * @param {*} /workflow/api/wfl/type?enabled=true&page=0&size=-1&roleType=TENANT
 */
async function getDocumentTypeFilterTitleData () {
  const url = '/workflow/api/wfl/type?enabled=true&page=0&size=-1&roleType=TENANT&mobileApprovalFlag=true'
  return http.get(url)
}

/**
 * 单据小类查询
 * @param {*} params
 */
async function getSmallDocumentType (type) {
  let url = ''
  if (type === '801003') { // 借款单
    url = `/prepayment/api/cash/pay/requisition/types/query?page=0&size=1000&setOfBookId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '801009') { // 费用申请
    url = `/expense/api/expense/application/type/query?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '901008') { // 资金单据
    url = '/fund/api/setting/request/type/getAll?roleType=TENANT'
  } else if (type === '801001') { // 对公报销单
    url = `/expense/api/expense/report/type/query?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '801002') { // 预算日记账
    url = '/budget/api/budget/journals/query/headers/byInput?journalTypeId=&journalCode=&periodStrategy=&status=&page=0&size=1000&journalTypeId=undefined&roleType=TENANT'
  } else if (type === '801004') { // 合同
    url = `/contract/api/contract/type/query?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '801005') { // 付款申请单
    url = `/payment/api/acp/request/type/query/enable/dataAuth?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '801006') { // 费用调整单
    url = `/expense/api/expense/adjust/types/query?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === '801011') { // 项目申请审批
    url = `/contract/api/project/requisition/type/pageByCondition/enable/dataAuth?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  } else if (type === 'jx') { // 创建开票申请(交易流水) 905001 暂未开发
    // params = {
    //   'page': 0,
    //   'size': 1000,
    //   'setOfBooksId': window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId,
    //   'roleType': 'TENAN',
    // }
    // url = 'getTraFlowTypeList'
  } else if (type === '801010') { // 差旅申请单
    url = `/expense/api/travel/application/type/pageByCondition?page=0&size=1000&setOfBooksId=${window.vm.getBaseInfoOfStore('companyInfo').setOfBooksId}&roleType=TENANT`
  }
  const res = await http.get(url)
  return res
}

/**
 * 获取转交人接口-原（获取转交人列表接口）
 * @param {*} params
 */
function getDeliverList (params) {
  const url = `/mdata/api/users/v3/search?keyContact=${params.keyContact}&page=${params.page}&size=${params.size}&status=${params.status}`
  return http.get(url)
}

/**
 * 转交接口
 * @param {*} params
 * /workflow/api/workflow/transfer?roleType=TENANT
 */
function submitDeliver (params) {
  const data = {
    userId: params.userId,
    remark: params.remark,
    entityId: params.entityId,
    entityType: params.entityType,
    userCode: params.userCode,
    userName: params.userName,
    taskId: params.taskId
  }
  const url = '/workflow/api/workflow/transfer?roleType=TENANT'
  return http.post(url, data)
}

/**
 * TODO
 * 获取申请单行动态维度
 * @param {*} params
 */
function getApplicationColumn (params) {
  const url = `/expense/api/expense/application/line/column/${params.toString()}?roleType=TENANT`
  return http.get(url)
}

/**
 * 加签接口
 * @param {*} params
 * @param {remark} 加签理由
 * @param {approvalOrder} 审批顺序：0-按加签顺序审批 1-平行审批
 * @param {counterSignOrder} 加签顺序：0-之前 1-平行 2-之后
 * /workflow/api/workflow/plus/sign?roleType=TENANT
 */
function counterSign (params) {
  /* let addSignOrder = ''
  switch (params.counterSignOrder) {
    case '0':
      addSignOrder = 'BEFORE'
      break
    case '1':
      addSignOrder = 'PARALLEL'
      break
    case '2':
      addSignOrder = 'AFTER'
      break
    default:
      break
  }
  let data = {
    'addSignOrder': addSignOrder,
    'approveOrder': params.approveOrder,
    'userIds': params.userIds,
    'entityId': params.entityId,
    'entityType': params.entityType,
    'users': params.users,
    'taskId': params.taskId,
    'remark': params.remark,
  } */
  const data = {
    addSignOrder: params.addSignOrder,
    approveOrder: params.approveOrder,
    userIds: params.userIds,
    entityId: params.entityId,
    entityType: params.entityType,
    users: params.users,
    taskId: params.taskId,
    remark: params.remark
  }
  const url = '/workflow/api/workflow/plus/sign?roleType=TENANT'
  return http.post(url, data)
}

/**
 * 获取付款申请单头默认信息
 * @param {*} params
 */
function getPaymentApplicationHeader (params) {
  const url = `/payment/api/acp/requisition/header/query/detail/${params.headerId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取手工开票申请审批信息
 * @param {*} params
 */
function getVatManualHeadInfo (params) {
  const url = `/tax/api/tax/vat/manual/header/dto/page/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取红冲发票申请审批头信息
 * @param {*} params
 */
function getTaxVatReverseHeadInfo (params) {
  const url = `/tax/api/tax/vat/reverse/apply/header/dto/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取项目审批详细信息
 * @param {*} params
 */
function getProjectContractInfo (params) {
  const url = `/contract/api/project/requisition/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取项目申请审批中的合同信息
 * @param {*} params
 */
function getContractInfo (params) {
  const url = `/contract/api/project/requisition/contract/query/by/pro/req/id/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 销项发票作废审批头行查询
 */
function querySalesHeaderLineCondition (params) {
  const url = '/tax/api/tax/vat/cancel/apply/header/query/headerLineCondition?id=' + params.documentId + '&roleType=TENANT'
  return http.post(url)
}

/**
 * 销项发票查询
 */
function getTaxVatInvoiceDetail (params) {
  const url = '/tax/api/tax/vat/invoice/query/invoice/detail?id=' + params.invoiceHeaderId + '&roleType=TENANT'
  return http.post(url)
}

/**
 * 税务登记查询
 */
function getTaxRegistDetail (params) {
  const url = `/tax/api/tax/taxRegister/apply/${params.headerId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 客户信息查询
 */
function getClientDetail (params) {
  const url = `/tax/api/tax/client/application/${params.headerId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 交易流水详情查询
 */
function getTraFlowDetail (params) {
  const url = `/tax/api/tax/invoice/apply/header/data/${params.headerId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取合同头信息
 */
function getContractHeader (params) {
  const url = `/contract/api/contract/header/${params.contractId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取合同行资金计划信息
 */
function getContractFundPlanLine (params) {
  const url = `/contract/api/contract/line/herder/${params.contractHeaderId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取版本管理信息
 * @param params
 */
function getVersionManageHeader (params) {
  const url = `/tax/api/tax/version/manage/inform/${params.id}?&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取版本管理报表列表
 * @param id
 */
function getVersionRepFormList (id) {
  const url = `/tax/api/tax/all/version/detail/queryVersionDetail?versionId=${id}&roleType=TENANT`
  return http.get(url)
}

/**
 * 版本号详情
 * @param params
 */
function getVersionNumber (params) {
  const url = `/tax/api/tax/draft/data/initDataPage?templateId=${params.templateId}&versionDetailId=${params.versionDetailId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取表格数据
 * @param params
 */
function getTableData (params) {
  const url = '/tax/api/tax/draft/data/queryNormalData?roleType=TENANT'
  return http.post(url, params)
}

/**
 * 获取税费申报表审批头信息
 */
function getTaxDeclareFormHeaderInfo (params) {
  const url = `/tax/api/tax/declare/form/header/dto/list/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取税收申报报表数据
 */
function queryTaxDeclarationFormReportData (params) {
  const url = '/tax/api/tax/declare/form/set/queryReportData?declareReportId=' + params.templateCode + '&batchId=' + params.headerId + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 判断加签转交按钮是否显示
 * /workflow/api/workflow/current/node?documentId=1229693079590924289&entityType=801001&taskId=1229693343059582977&roleType=TENANT
 */
function getAddSignableAndTransferableFlag (params) {
  const url = `/workflow/api/workflow/current/node?documentId=${params.documentId}&entityType=${params.entityType}&taskId=${params.taskId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 获取资金调拨单头行信息
 */
function getTransferApplyHeadLine (params) {
  const url = `/fund/api/cp/transfer/appl/line/getTransferApplLine/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取资金付款单头信息
 */
function getFundPaymentBaseInfo (params) {
  const url = `/fund/api/payment/baseInfo/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 获取资金付款行信息
 */
function queryFundPaymentLineInfo (params) {
  const url = `/fund/api/payment/lineInfo/query?page=${params.page}&size=${params.size}&paymentBaseId=${params.paymentBaseId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 新获取审批历史
 * 报销单
 * /expense/api/expense/operation/record/query/by/businessId?businessId=1205067976447553538&businessType=EXP_REPORT&entityType=801001&roleType=TENANT
 * 申请单
 * /expense/api/expense/operation/record/query/by/businessId?businessId=1241915302715498498&entityType=801009&roleType=TENANT
 * 借款单
 * /prepayment/api/prepayment/operation/record/query/by/businessId?businessId=1241917852372230145&entityType=801003&roleType=TENANT
 * 合同（801004）、项目申请单（801011）
 * /contract/api/contract/operation/record/query/by/businessId?businessId=1235888887956602881&entityType=801004&roleType=TENANT
 *  预算日记账 得不到接口
 */
function getApproveHistory (params) {
  let url = ''
  switch (params.entityType.toString()) {
    case '801001': // 报销单
      url = `/expense/api/expense/operation/record/query/by/businessId?businessId=${params.entityId}&businessType=${params.entityType}&entityType=${params.entityType}&roleType=TENANT`
      break
    case '801009': // 费用申请单
      url = `/expense/api/expense/operation/record/query/by/businessId?businessId=${params.entityId}&entityType=${params.entityType}&roleType=TENANT`
      break
    case '801003': // 借款单
      url = `/prepayment/api/prepayment/operation/record/query/by/businessId?businessId=${params.entityId}&entityType=${params.entityType}&roleType=TENANT`
      break
    case '801010': // 差旅申请单
      url = `/expense/api/expense/operation/record/query/by/businessId?businessId=${params.entityId}&entityType=${params.entityType}&roleType=TENANT`
      break
    case '801004': // 合同
    case '801011': // 项目申请单
      url = `/contract/api/contract/operation/record/query/by/businessId?businessId=${params.entityId}&entityType=${params.entityType}&roleType=TENANT`
      break
    default:
      url = `/workflow/api/workflow/approval/history?entityType=${params.entityType}&entityId=${params.entityId}&roleType=TENANT`
      break
  }
  return http.get(url)
}

/**
 * 通知
 */
function notification (params) {
  const data = {
    userIds: params.userIds,
    body: {
      title: params.title,
      messages: params.messages
    }
  }
  const url = '/peripheral/api/messages/send'
  return http.post(url, data)
}

/**
 * 获取节点
 */
function getNodeList (params) {
  const url = `/workflow/api/workflow/back/backable/nodes?entityId=${params.entityId}&entityType=${params.entityType}&taskId=${params.taskId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 回退节点
 */
function backNodes (params) {
  const url = `/workflow/api/workflow/back/node?roleType=TENANT`
  return http.post(url, params)
}
/**
 * 获取审阅列表
 */
function getapproveReadList (param, unitIds, applyids) {
  let url = ``
  if (param.documentType === 801001) {
    url = `/expense/api/expense/report/query/review/head?roleType=TENANT${judgetFieldValue(param)}${unitIds}${applyids}`
  } else {
    url = `/prepayment/api/cash/prepayment/requisitionHead/query/review/head?roleType=TENANT${judgetFieldValue(param)}${unitIds}${applyids}`
  }
  return http.get(url)
}
/**
 * 已阅
 */
function readApprove (params) {
  let url = `/prepayment/api/cash/prepayment/requisitionHead/do/review?roleType=TENANT`
  return http.post(url, params)
}
export {
  getApproveToPendList,
  getMyWorkDone,
  pass,
  reject,
  getSmallDocumentType,
  getDocumentTypeFilterTitleData,
  getDeliverList,
  submitDeliver,
  getApplicationColumn,
  counterSign,
  getPaymentApplicationHeader,
  getTaxVatReverseHeadInfo,
  querySalesHeaderLineCondition,
  getTaxVatInvoiceDetail,
  getTaxRegistDetail,
  getClientDetail,
  getTraFlowDetail,
  getTaxDeclareFormHeaderInfo,
  queryTaxDeclarationFormReportData,
  getAddSignableAndTransferableFlag,
  getTransferApplyHeadLine,
  getFundPaymentBaseInfo,
  queryFundPaymentLineInfo,
  getApproveHistory,
  notification,
  getVatManualHeadInfo,
  getProjectContractInfo,
  getContractInfo,
  getContractHeader,
  getContractFundPlanLine,
  getVersionManageHeader,
  getVersionRepFormList,
  getVersionNumber,
  getTableData,
  getNodeList,
  backNodes,
  getapproveReadList,
  readApprove
}
