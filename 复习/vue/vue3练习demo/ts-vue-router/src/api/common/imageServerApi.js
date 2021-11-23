/**
 * 附件API接口
 */
import http from '@/service/http'
import formDataHttp from '@/service/formDataHttp'
import { Base64 } from 'js-base64'
// import { getLocalValue } from '@/utils/util'

/**
 * 附件查看
 * @param {*单据类型：费用申请单/借款单/报销单} docType
 * @param {*每个单据大类所需要的入参不同，具体参考具体单据} data
 */
async function getImgList (params) {
  let url = ''
  if (params.docType === 'apply') { // 费用申请
    url = '/expense/api/expense/application/header/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'prepayment') { // 借款单
    url = '/prepayment/api/cash/prepayment/requisitionHead/getHeadById?id=' + params.id + '&roleType=TENANT'
  } else if (params.docType === 'paymentRequsition') { // 付款申请单
    url = '/payment/api/acp/requisition/header/query/detail/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'taxRegister') { // 税务登记
    url = '/tax/api/tax/taxRegister/apply/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'clientInfo') { // 客户信息
    url = '/tax/api/tax/client/application/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'projectApply') { // 项目审批
    url = '/contract/api/project/requisition/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'contract') { // 合同
    url = '/contract/api/contract/header/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'transactionFlow') { // 交易流水
    url = '/tax/api/tax/invoice/apply/header/data/' + params.id + '?roleType=TENANT'
  } else if (params.docType === 'versionManage') { // 版本管理  /tax/api/tax/version/manage/inform/
    url = `/tax/api/tax/version/manage/inform/${params.id}?roleType=TENANT`
  } else if (params.docType === 'expense') { // 报销单
    url = '/expense/api/expense/report/header/by/id?expenseReportId=' + params.id + '&roleType=TENANT'
  } else if (params.docType === 'repaymentOrder') { // 还款单
    url = `/payment/api/cash/repayment/query/byId?id=${params.id}&roleType=TENANT`
  }
  return http.get(url)
}
function bridgeUploadFiles (id, imgPath, imgParams) {
  var params = {
    'method': 'post',
    'url': window.location.origin + '/base/api/upload/static/attachment',
    'headers': {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + window.vm.getLocalValue('token'),
      'X-Menu-Id': window.vm.getLocalValue('token')
    },
    'contentType': 'form',
    'files': {
      'file': window.vm.getQueryVariable(imgPath, 'path')
    },
    'body': {
      'pkName': imgParams.pkName,
      'pkValue': imgParams.pkValue,
      'attachmentType': imgParams.attachmentType ? imgParams.attachmentType : ''
    },
    'id': id.toString(),
    'sendProgressCallback': 'onSendProgressCallback',
    'sendTimeout': 15000,
    'receiveTimeout': 10000,
    'responseType': 'json'
  }
  console.log('桥接上传文件参数', params)

  var dict = {
    'className': 'BaseBridge',
    'function': 'httpRequest',
    'successCallBack': 'onBridgeSuccess',
    'failureCallBack': 'onBridgeError',
    'params': params
  }

  HandBridge.postMessage(JSON.stringify(dict))
}
/**
 * 附件上传
 * @param {*单据类型：费用申请单/借款单/报销单} attachmentType
 * @param {*每个单据大类所需要的入参不同，具体参考具体单据} imgData
 * @param {*头或行ID*} pkValue
 */
async function uploadImage (params, imgData, configs) {
  const formData = new FormData()
  // 1. 报销单头 EXP_REPORT_HEADER
  // 2. 报销单费用行EXP_REPORT_LINE
  // 3. 费用申请单头 EXP_APPLICATION_HEADER
  // 4. 我的账本 EXP_EXPENSE_BOOK
  // 5. 借款单头CSH_PAYMENT_REQUISITION_HEADER
  formData.append('attachmentType', '')
  formData.append('pkName', params.attachmentType)
  formData.append('pkValue', params.pkValue)
  formData.append('file', imgData.file, imgData.imageName)

  const url = '/base/api/upload/static/attachment'
  const config = {
    ...configs,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 20000
    }
  }
  return formDataHttp.post(url, formData, config)
}

async function newUploadImage (params, imgData, configs) {
  const formData = new FormData()
  // 1. 报销单头 EXP_REPORT_HEADER
  // 2. 报销单费用行EXP_REPORT_LINE
  // 3. 费用申请单头 EXP_APPLICATION_HEADER
  // 4. 我的账本 EXP_EXPENSE_BOOK
  // 5. 借款单头CSH_PAYMENT_REQUISITION_HEADER
  formData.append('attachmentType', params.attachmentType)
  formData.append('pkName', params.pkName)
  formData.append('pkValue', params.pkValue)
  formData.append('file', imgData.file, imgData.imageName)

  const url = '/base/api/upload/static/attachment'
  const config = {
    ...configs,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 20000
    }
  }
  return formDataHttp.post(url, formData, config)
}
/**
 * 获取安卓文件base64接口，仅用于企业微信
 */
async function getAndroidFileData (params, imgData, configs) {
  const data = {
    accessToken: Base64.encode(imgData.accessToken),
    mediaId: Base64.encode(imgData.mediaId),
    attachmentType: '',
    pkValue: params.pkValue,
    pkName: params.attachmentType
  }
  console.log('请求参数==>', data)
  // const apiName = 'getAndroidFileData'
  const url = '/peripheral/api/weChatWork/getFileByMediaId'
  return http.post(url, data, configs)
}

/**
 *根据附件ID查询发票附件
 * /base/api/attachments/copy/by/id?pkName=EXP_REPORT_LINE&pkValue=null&roleType=TENANT
 */
async function getInvoiceAttachmentByAttachId (params) {
  const url = `/base/api/attachments/copy/by/id?pkName=${params.pkName}&pkValue=${params.pkValue}&attachmentType=${params.attachmentType}&roleType=TENANT`
  return http.post(url, params.attachmentIdList)
}
async function uploadTaiFile (params) {
  const url = `/base/api/upload/peripheral/attachment`
  let data = {
    attachmentName: params.attachmentName || '',
    attachmentType: params.attachmentType || '',
    attachmentUrl: params.attachmentUrl || '',
    fileSrcSysCode: 'mobile',
    pkValue: params.pkValue,
    pkName: params.pkName
  }
  return http.post(url, data)
}
export {
  getImgList,
  uploadImage,
  getAndroidFileData,
  getInvoiceAttachmentByAttachId,
  uploadTaiFile,
  bridgeUploadFiles,
  newUploadImage
}
