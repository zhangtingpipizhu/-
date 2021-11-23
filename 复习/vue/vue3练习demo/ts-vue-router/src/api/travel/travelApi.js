/**
 * 差旅申请相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 获取差旅申请列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*单据类型ID} typeId
 * @param {*员工ID} employeeId
 * @param {*起始日期} dateFrom
 * @param {*截止日期} dateTo
 * @param {*状态} status （1001：编辑中、1002：审批中、1003：撤回、1004：审批通过、1005：审批驳回、2001：审核驳回、2002：审核通过）
 * @param {*搜索关键字*单据编号} documentNumber
 * @param {*编辑中  撤回，拒绝，撤回合并*} editor
 * @param {*角色类型} roleType
 */
async function getTravelList (params) {
  const url = '/expense/api/travel/application/header/query/condition?page=' + params.page +
    '&size=' + (params.size || 10) + '&typeId=' + (params.typeId || '') + '&dateFrom=' + (params.dateFrom || '') + '&editor=' + (params.editor || false) +
    '&dateTo=' + (params.dateTo || '') + '&employeeId=' + (params.employeeId || '') + '&status=' + (params.status || '') +
    '&amountFrom=' + (params.amountFrom || '') + '&amountTo=' + (params.amountTo || '') + '&remarks=' + (params.remarks || '') + '&documentNumber=' + (params.documentNumber || '') + '&roleType=TENANT'
  return http.get(url)
}

/**
 * 整单删除
 * @param {*} params
 * @param {is_url} 单据都ID
 */
async function deleteDoc (params) {
  const url = `/expense/api/travel/application/header/${params.headerId}?roleType=TENANT`
  return http.delete(url)
}

/**
 * TODO
 * 行删除
 * @param {*} params
 */
async function deleteLine (params) {
  const url = `/expense/api/travel/application/line/${params.id}`
  return http.delete(url)
}

/**
 * 创建差旅申请头类型列表
 */
async function getTravelType (params) {
  const url = `/expense/api/travel/application/type/query/all?setOfBooksId=${params.setOfBooksId}&enabled=true&roleType=${params.roleType || 'TENANT'}`
  return http.get(url)
}

/**
 * 获取差旅申请部门列表
 */
async function getTravelDepartment (params) {
  let data = {
    tenantId: params.tenantId,
    companyId: params.companyId,
    codeName: params.codeName,
    size: params.size,
    page: params.page
  }
  const url = `/mdata/api/company/associate/department/query/department/lov?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}

/**
 * 差旅头保存
 */
async function saveTravelHeader (params) {
  const data = {
    unitId: params.unitId,
    attachmentOid: params.attachmentOid,
    companyId: params.companyId,
    currencyCode: params.currencyCode,
    description: params.description,
    dimensions: params.dimensions,
    documentTypeId: params.documentTypeId,
    employeeId: params.employeeId,
    startDate: params.startDate,
    endDate: params.endDate,
    orderMode: params.orderMode,
    orderer: params.orderer,
    requisitionDate: params.requisitionDate,
    travelFromPlaceDTOS: [],
    travelPeopleDTOList: params.travelPeopleDTOList,
    travelToPlaceDTOS: [],
    positionId: params.positionId,
    setOfBooksId: params.setOfBooksId
  }
  const url = '/expense/api/travel/application/header?roleType=TENANT'
  return http.post(url, data)
}

/**
 * 差旅头更新
 */
async function updataHeader (data) {
  const url = '/expense/api/travel/application/header?roleType=TENANT'
  return http.put(url, data)
}

/**
 * 获取差旅头默认信息
 */
async function getTravelHeaderInfor (params) {
  const url = `/expense/api/travel/application/type/query/header/${params.documentId}?roleType=TENANT`
  return http.get(url)
}

/**
 * 查询差旅头信息
 */
async function getTravelHeader (params) {
  const url = `/expense/api/travel/application/header/${params.is_url}?roleType=TENANT`
  const res = await http.get(url)
  return res
}

/**
 * 查询编辑差旅头信息
 */
async function getTravelEditHeader (headerId) {
  const url = `/expense/api/travel/application/header/query?id=${headerId}&roleType=TENANT`
  return http.get(url)
}

/**
 * 订票人列表
 */
async function getTravelAssociatePeopleList (params) {
  const url = `/expense/api/travel/associate/people?headerId=${params.headerId}&fullName=${params.fullName || ''}&userCode=${params.userCode || ''}&size=1000&page=0&roleType=TENANT`
  const res = await http.get(url)
  return res
}
/**
 * 保存行程
 */
async function saveTrip (params, isNew) {
  // params.isNew判断是不是新建的
  const url = '/expense/api/travel/application/line?roleType=TENANT'
  if (!isNew) { // 保存查看修改的行程
    return http.put(url, params)
  } else {
    return http.post(url, params)
  }
}

/**
 *查询行程
 */
async function queryTripByHeaderIdAndLineId (params) {
  const url = `/expense/api/travel/application/line/query/info?headerId=${params.headerId}&lineId=${params.lineId}&isNew=${params.isNew}&roleType=TENANT`
  return http.get(url)
}

/**
 *申请类型查询
 * @param {*} params
 * @param {typeFlag} 0-申请类型  1-费用类型
 */
function getTravelApplyType (params) {
  const url = `/expense/api/expense/types/chooser/query/by/condition?setOfBooksId=${params.setOfBooksId}&typeFlag=${params.typeFlag}
&typeId=${params.typeId}&page=0&size=20&roleType=TENANT&enabled=true`
  return http.get(url)
}

/**
 *差旅行明细信息查询
 * @param {*} params
 * @param {}
 */
function getTravelLineInfo (params, extraParams = '') {
  const url = `/expense/api/travel/application/line/query/${params.headerId}?size=100&page=0&roleType=TENANT` + extraParams
  return http.get(url)
}

/**
 *差旅提交
 * @param {*} params
 * @param {}
 */
function travelSubmit (params) {
  // const data = {
  //   documentId: params.documentId,
  //   documentTypeId: params.documentTypeId
  // }
  const url = `/expense/api/travel/application/submit?ignoreWarningFlag=${params.ignoreWarningFlag}&warningFlag=${params.warningFlag}&warningMessage=${params.warningMessage}&roleType=TENANT`
  params.ignoreWarningFlag = undefined
  params.warningFlag = undefined
  return http.post(url, params)
}

/**
 *差旅行程行人员选择
 * @param {*} params
 * @param {}
 */
function travelAssociatePeople (params) {
  const url = `/expense/api/travel/associate/people?page=${params.page}&size=${params.size}&userCode=${params.userCode || ''}&fullName=${params.fullName || ''}
&headerId=${params.headerId || ''}&roleType=TENANT`
  return http.get(url)
}
/**
 * 获取头部公司列表
 */
async function getTripLineCompanyList (params) {
  const url = '/mdata/api/company/by/condition?page=0&size=1000&roleType=TENANT&setOfBooksId=' + (params.setOfBooksId || '')
  return http.get(url)
}

/**
 * 获取供应商列表
 * /expense/api/travel/vendor/query?travelType=1001&enabled=true&page=0&size=10&roleType=TENANT
 */
async function getTravelVendorList (params) {
  const url = `/expense/api/travel/vendor/query?travelType=${params.travelType}&enabled=${params.enabled}&page=${params.page}&size=${params.size}&roleType=TENANT`
  return http.get(url)
}
/**
 * 关闭差旅申请单行
 */
async function closeTraveLine (params) {
  const url = `/expense/api/travel/application/line/closed/${params.lineId}?headerId=${params.headerId}&message=${params.message}&roleType=TENANT`
  const param = {}
  return http.post(url, param)
}
/**
 * 关闭差旅申请单头
 */
async function closeTraveheader (params) {
  const url = '/expense/api/travel/application/header/closed?roleType=TENANT'
  const param = {
    headerIds: [params.headerId],
    messages: params.messages
  }
  return http.post(url, param)
}
/**
 * 差旅政策获取
 * /expense/api/travel/application/policy?roleType=TENANT
 */
async function getTravelPolicy (params) {
  const url = '/expense/api/travel/application/policy?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 差旅政策校验
 * /expense/api/travel/application/policy/check?roleType=TENANT
 */
async function checkTravelPolicy (params) {
  const url = '/expense/api/travel/application/policy/check?roleType=TENANT'
  return http.post(url, params)
}
export {
  getTravelList,
  deleteDoc,
  getTravelType,
  getTravelDepartment,
  saveTravelHeader,
  getTravelHeaderInfor,
  getTravelHeader,
  getTravelAssociatePeopleList,
  queryTripByHeaderIdAndLineId,
  saveTrip,
  getTravelApplyType,
  getTravelLineInfo,
  travelSubmit,
  deleteLine,
  travelAssociatePeople,
  updataHeader,
  getTravelEditHeader,
  getTripLineCompanyList,
  getTravelVendorList,
  closeTraveLine,
  closeTraveheader,
  getTravelPolicy,
  checkTravelPolicy
}
