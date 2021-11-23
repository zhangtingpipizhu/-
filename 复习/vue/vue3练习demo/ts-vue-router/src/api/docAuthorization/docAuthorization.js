import http from '@/service/http'
import { isEmpty, judgetFieldValue } from '@/utils/util'

/**
 * 获取我的委托人列表
*/
async function getDocAuthorizationList (params) {
  const url = `/mdata/api/authorize/form/personal/auth/pageByCondition?page=${params.page}&size=${params.size}&setOfBooksId=${params.setOfBooksId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 获取我的受托列表
*/
async function getTrusteeList (params) {
  const url = `/mdata/api/authorize/form/personal/auth/pageByBailee?page=${params.page}&size=${params.size}&setOfBooksId=${params.setOfBooksId}&userId=${params.userId}&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 获取转交人列表
 * @param {*} params
 * /workflow/api/workflow/transfer/agent/query?tab=authorizer&page=0&size=10&roleType=TENANT  没有任何查询条件是这样的
 */
async function getAgentList (params) {
  const url = `/workflow/api/workflow/transfer/agent/query?tab=${params.tab || ''}&page=${params.page}&size=10&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 委托人
*/
async function getEntrustPerson (params) {
  const url = `/mdata/api/DepartmentGroup/get/users/by/department/and/company?size=10&page=${params.pageNum}&companyName=${params.companyName || ''}&userCode=${params.userCode || ''}&userName=${params.userName || ''}&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 获取单据大类
 */
async function getDocumentCategory () {
  const url = '/base/api/custom/enumerations/template/by/type?type=SYS_APPROVAL_FORM_TYPE&roleType=TENANT'
  const res = await http.get(url)
  return res
}
/**
 * 获取单据类型
 */
async function getFormList (params) {
  let url = ''
  if (params.value === '801001') { // 对公报销单单据小类
    url = `/expense/api/expense/report/type/owner/all?authFlag=false&setOfBooksId=${params.setOfBooksId}&roleType=TENANT`
  } else if (params.value === '801002') { // 预算日记账
    url = `/budget/api/budget/journal/types/query/setOfBooksId?setOfBooksId=${params.setOfBooksId}&roleType=TENANT`
  } else if (params.value === '801003') { // 借款
    url = `/prepayment/api/cash/pay/requisition/types/queryByEmployeeId?userId=${params.userId}&authFlag=false&roleType=TENANT`
  } else if (params.value === '801004') { // 合同
    url = `/contract/api/contract/type/contract/type/by/user?companyId=${params.companyId}&authFlag=false&roleType=TENANT`
  } else if (params.value === '801005') { // 付款申请单
    url = `/payment/api/acp/request/type/${params.setOfBooksId}/${params.companyId}/query?authFlag=false&roleType=TENANT`
  } else if (params.value === '801006') { // 费用调整单
    url = '/expense/api/expense/adjust/types/queryExpenseAdjustType?authFlag=false&roleType=TENANT'
  } else if (params.value === '801008') { // 核算工单
    url = `/accounting/api/general/ledger/work/order/types/queryByEmployeeId?setOfBooksId=${params.setOfBooksId}&authFlag=false&roleType=TENANT`
  } else if (params.value === '801009') { // 费用申请单
    url = '/expense/api/expense/application/type/query/condition/user?authFlag=false&roleType=TENANT'
  } else if (params.value === '801010') { // 差旅申请单
    url = `/expense/api/travel/application/type/query/all?setOfBooksId=${params.setOfBooksId}&enabled=true&roleType=TENANT`
  } else if (params.value === '801011') { // 项目申请单
    url = '/contract/api/project/requisition/type/query/all?authFlag=false&roleType=TENANT'
  }
  if (!isEmpty(url)) {
    const res = await http.get(url)
    return res
  }
}
// 委托人保存
async function saveClient (params) {
  // const data = {
  //   baileeId: params.baileeId,
  //   documentCategory: params.documentCategory,
  //   endDate: params.endDate,
  //   formId: params.formId,
  //   mandatorId: params.mandatorId,
  //   startDate: params.startDate,
  //   tenantId: params.tenantId,
  //   versionNumber: params.versionNumber,
  //   id: params.id,
  //   setOfBooksId: params.setOfBooksId
  // }
  const url = '/mdata/api/authorize/form/personal/auth?roleType=TENAN'
  if (isEmpty(params.id)) {
    return http.post(url, params)
  } else {
    return http.put(url, params)
  }
}
/**
 * 获取审批流列表
*/

async function getWorkList (params) {
  const url = `/workflow/api/rule/custom/forms?documentCategory=${params.documentCategory}&booksID=${params.booksID}&cascadeApprovalChain=false&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 转交保存更新
 */
async function saveDeliver (params) {
  const data = {
    agentOid: params.agentOid,
    authorizerOid: params.authorizerOid,
    endDate: params.endDate,
    entityType: params.entityType,
    formOid: params.formOid,
    id: params.id,
    remark: params.remark,
    startDate: params.startDate,
    tenantId: params.tenantId
  }
  const url = '/workflow/api/workflow/transfer?roleType=TENANT'
  if (isEmpty(params.id)) {
    return http.post(url, data)
  } else {
    return http.put(url, data)
  }
}
/**
 * 被授权人列表
 * http://101.132.162.31:9081/mdata/api/contact/query/lov?onJob=true&size=10&page=0&roleType=TENANT
 */
function baileeList (params) {
  let data = {
    onJob: params.onJob,
    keyword: params.keyword,
    size: params.size,
    page: params.page
  }
  let url = `/mdata/api/contact/query/lov?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 单据大类列表
 * /base/api/custom/enumeration/system/by/type/condition?systemCustomEnumerationType=SYS_AUTH_FORM_TYPE&all=true&page=0&size=10&roleType=TENANT
 */
function categoryListList (params) {
  let url = `/base/api/custom/enumeration/system/by/type/condition?systemCustomEnumerationType=SYS_AUTH_FORM_TYPE&all=true&page=${params.page}&size=${params.size}&roleType=TENANT`
  return http.get(url)
}

/**
 * 工作流类型
 * /workflow/api/wfl/type?enabled=true&page=0&size=10&roleType=TENANT
 */
function workflowTypeList (params) {
  let data = {
    enabled: true,
    typeName: params.typeName,
    size: params.size,
    page: params.page
  }
  let url = `/workflow/api/wfl/type?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 选择工作流
 * /workflow/api/wfl/process/setting?enabled=true&page=0&size=10&codeOrName=www&roleType=TENANT
 */
function getWorkflowList (params) {
  let data = {
    enabled: true,
    size: params.size,
    page: params.page,
    codeOrName: params.codeOrName
  }
  let url = `/workflow/api/wfl/process/setting?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 保存我的转交
 * /workflow/api/workflow/transfer/agent?roleType=TENANT
 */
function saveMyTransfer (params) {
  let url = `/workflow/api/workflow/transfer/agent?roleType=TENANT`
  if (isEmpty(params.id)) {
    return http.post(url, params)
  } else {
    return http.put(url, params)
  }
}

/**
 * 查询我的转交详情
 * /workflow/api/workflow/transfer/agent/1232991688560807938?roleType=TENANT
 */
function getMyTransferDetail (params) {
  let url = `/workflow/api/workflow/transfer/agent/${params.id}?roleType=TENANT`
  return http.get(url)
}

export {
  getDocAuthorizationList,
  getTrusteeList,
  getAgentList,
  getEntrustPerson,
  getDocumentCategory,
  getFormList,
  saveClient,
  getWorkList,
  saveDeliver,
  baileeList,
  categoryListList,
  workflowTypeList,
  getWorkflowList,
  saveMyTransfer,
  getMyTransferDetail
}
