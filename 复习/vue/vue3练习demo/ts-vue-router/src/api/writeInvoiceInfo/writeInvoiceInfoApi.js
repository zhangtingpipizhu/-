/**
 * 开票申请相关API接口
 */
import http from '@/service/http'
import { judgetFieldValue } from '@/utils/util'

/**
 * 交易流水开票申请列表数据
 * /tax/api/tax/invoice/apply/header/data/query?invoiceType=&applyNumber=&applyStatus=&page=0&size=5&roleType=TENANT
 */
async function getStreamApplyList (params) {
  const data = {
    invoiceType: params.invoiceType,
    applyNumber: params.applyNumber,
    applyStatus: params.applyStatus,
    page: params.page || 0,
    size: params.size || 10,
    invoiceAmountFrom: params.invoiceAmountFrom,
    invoiceAmountTo: params.invoiceAmountTo,
    createdDateFrom: params.createdDateFrom,
    createdDateTo: params.createdDateTo
  }
  const url = `/tax/api/tax/invoice/apply/header/data/query?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 *手工开票申请列表数据
 * /tax/api/tax/vat/manual/header/pageByCondition?page=0&size=5&roleType=TENANT
 */
async function getManualApplyList (params) {
  const data = {
    page: params.page || 0,
    size: params.size || 10,
    totalAmountFrom: params.totalAmountFrom,
    totalAmountTo: params.totalAmountTo,
    createdDateFrom: params.createdDateFrom,
    createdDateTo: params.createdDateTo,
    roleType: 'TENANT'
  }
  const url = `/tax/api/tax/vat/manual/header/pageByCondition?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 *红冲开票申请列表数据
 * /tax/api/tax/vat/reverse/apply/header/data/query?applyDateFrom=2020-03-11&applyDateTo=2020-03-31&page=0&size=5&roleType=TENANT
 */
async function getRedRushApplyList (params) {
  const data = {
    applyDateFrom: params.applyDateFrom,
    applyDateTo: params.applyDateTo,
    totalAmountFrom: params.totalAmountFrom,
    totalAmountTo: params.totalAmountTo,
    page: params.page || 0,
    size: params.size || 10
  }
  const url = `/tax/api/tax/vat/reverse/apply/header/data/query?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 作废申请申请列表数据
 * /tax/api/tax/vat/cancel/apply/header/apply/query/condition?applyDateFrom=2020-03-11&applyDateTo=2020-03-13&page=0&size=10&roleType=TENANT
 */
async function getTaxCancelApplyList (params) {
  const data = {
    applyDateFrom: params.applyDateFrom,
    applyDateTo: params.applyDateTo,
    totalAmountFrom: params.totalAmountFrom,
    totalAmountTo: params.totalAmountTo,
    page: params.page || 0,
    size: params.size || 10
  }
  const url = `/tax/api/tax/vat/cancel/apply/header/apply/query/condition?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 待开票交易流水列表数据-待开票
 * /tax/api/tax/vat/tran/invoice/detail/data/query?tranDateStart=2020-03-11&tranDateEnd=2020-03-13&mayInvoiceAmountFrom=100&mayInvoiceAmountTo=200&page=0&size=5&roleType=TENANT
 */
async function getVatTranInvoiceList (params) {
  const data = {
    tranDateStart: params.tranDateStart,
    tranDateEnd: params.tranDateEnd,
    mayInvoiceAmountFrom: params.mayInvoiceAmountFrom,
    mayInvoiceAmountTo: params.mayInvoiceAmountTo,
    page: params.page || 0,
    size: params.size || 10,
    taxpayerNumber: params.taxpayerNumber,
    mayInvoiceAmountGtZeroFlag: 'Y', // 过滤掉可开票金额为0的数据
    invoiceType: params.invoiceType,
    invoiceTitle: params.invoiceTitle,
    separateRuleId: params.separateRuleId
  }
  const url = `/tax/api/tax/vat/tran/invoice/detail/data/query?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 已开票销项发票查询列表数据-待开票
 * /tax/api/tax/vat/invoice/query/sale/condition?issueDateFrom=2020-03-12&issueDateTo=2020-03-13&amountFrom=10&amountTo=100&page=0&size=5&roleType=TENANT&invoiceStatusYCFlag=Y

 */
async function getHasOpenInvoiceList (params) {
  const data = {
    issueDateFrom: params.issueDateFrom,
    issueDateTo: params.issueDateTo,
    amountFrom: params.amountFrom,
    amountTo: params.amountTo,
    page: params.page || 0,
    size: params.size || 10,
    // TAX_VAT_INVOICE_STATUS: params.TAX_VAT_INVOICE_STATUS,
    invoiceStatusYCFlag: 'Y' // 查询出已开具和已作废的发票数据
  }
  const url = `/tax/api/tax/vat/invoice/query/sale/condition?roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 开票中删除
 * /tax/api/tax/invoice/apply/header/delete/1134071751397408770?roleType=TENANT
 * /tax/api/tax/vat/manual/header/delete/1238011737048723458?roleType=TENANT
 */
async function deleteOpeningInvoice (params) {
  let url = ''
  switch (params.type) {
    case 'stream':
      url = `/tax/api/tax/invoice/apply/header/delete/${params.id}?roleType=TENANT`
      return http.delete(url)
    case 'manual':
      url = `/tax/api/tax/vat/manual/header/delete/${params.id}?roleType=TENANT`
      return http.delete(url)
    case 'redrush':
      url = `/tax/api/tax/vat/reverse/apply/header/delete/${params.id}?roleType=TENANT`
      return http.delete(url)
    case 'cancellation':
      url = `/tax/api/tax/vat/cancel/apply/header/delete?headerId=${params.id}&roleType=TENANT`
      return http.post(url)
    default:
      break
  }
}
/**
 * 创建红票申请-查找对应蓝字号码
 * /tax/api/tax/vat/reverse/apply/header/query/blue/invoice?invoiceType=&invoiceCode=555204951805&clientName=1111&invoiceNumber=71283198&size=10&page=0&roleType=TENANT
 */
async function getGetBlueTicketInfo (params) {
  // let data = {
  //   invoiceType: '',
  //   invoiceCode: params.invoiceCode,
  //   clientName: params.clientName,
  //   invoiceNumber: params.invoiceNumber,
  //   page: params.page || 0,
  //   size: params.size || 10,
  // }
  // const url = `/tax/api/tax/vat/reverse/apply/header/query/blue/invoice?roleType=TENANT${judgetFieldValue(data)}`
  const url = `/tax/api/tax/vat/reverse/apply/header/query/blue/invoice?invoiceType=&invoiceCode=${params.invoiceCode}&invoiceNumber=${params.invoiceNumber}&size=10&page=0&roleType=TENANT`
  return http.get(url)
}
/**
 * 创建红票申请-保存
 * /tax/api/tax/vat/reverse/apply/header/dto/save?roleType=TENANT
 */
async function saveReverseApply (params) {
  const url = '/tax/api/tax/vat/reverse/apply/header/dto/save?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 创建红票申请-提交
 * /tax/api/tax/vat/reverse/apply/header/submit?roleType=TENANT
 */
async function submitReverseApply (params) {
  const url = '/tax/api/tax/vat/reverse/apply/header/submit?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 发票作废
 * /tax/api/tax/vat/cancel/apply/header/create/headerline?roleType=TENANT
 */
async function cancelApply (params) {
  const url = '/tax/api/tax/vat/cancel/apply/header/create/headerline?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 交易明细查询
 * /tax/api/tax/vat/invoice/data/sale/tran/1239492840973967361?roleType=TENANT
 */
async function tranDetail (params) {
  const url = `/tax/api/tax/vat/invoice/data/sale/tran/${params.id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 已开票详情查询
 * /tax/api/tax/vat/invoice/data/sale/1239492840973967361?roleType=TENANT
 */
async function hasWriteInvoiceDetail (params) {
  const url = `/tax/api/tax/vat/invoice/data/sale/${params.id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 待开票交易流水创建开票申请（移动端点击下一步）
 * /tax/api/tax/vat/tran/invoice/detail/create/application?roleType=TENANT
 */
async function createWriteInvoiceApply (params) {
  const url = '/tax/api/tax/vat/tran/invoice/detail/create/application?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 开具电子发票获取详情
 * /tax/api/tax/invoice/apply/header/data/1239862381896867842?roleType=TENANT
 */
async function getElecWriteInvoiceDetail (params) {
  const url = `/tax/api/tax/invoice/apply/header/data/${params.id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 开具电子发票提交
 * /tax/api/tax/invoice/apply/header/submit?roleType=TENANT
 */
async function commitElecInvoice (params) {
  const url = '/tax/api/tax/invoice/apply/header/submit?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 销项发票详情
 * /tax/api/tax/vat/cancel/apply/header/query/headerLineCondition?id=1240106676251860993&roleType=TENANT
 */
async function getCancelDetail (params) {
  const url = `/tax/api/tax/vat/cancel/apply/header/query/headerLineCondition?id=${params.id}&roleType=TENANT`
  return http.post(url, {})
}
/**
 * 红冲发票详情查询
 * /tax/api/tax/vat/reverse/apply/header/dto/1239859818107576321?roleType=TENANT
 */
async function getReverseDetail (params) {
  const url = `/tax/api/tax/vat/reverse/apply/header/dto/${params.id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 手工开票申请发票详情查询
 * /tax/api/tax/vat/manual/header/dto/page/1240245645996163074?roleType=TENANT
 */
async function getManualDetail (params) {
  const url = `/tax/api/tax/vat/manual/header/dto/page/${params.id}?roleType=TENANT`
  return http.get(url)
}
/**
 * 查询增值税的税率接口
 * /tax/api/tax/rate/pageByCondition?taxCategoryCode=VAT&enabled=Y&page=0&size=10
 */
async function getTaxRateList () {
  const url = '/tax/api/tax/rate/pageByCondition?taxCategoryCode=VAT&enabled=Y&page=0&size=1000'
  return http.get(url)
}
/**
 * 查询商品编码接口
 * /tax/api/tax/commodity/pageByCondition?size=10&page=0&roleType=TENANT
 */
async function getGoodsNameList () {
  const url = '/tax/api/tax/commodity/pageByCondition?size=1000&page=0&roleType=TENANT'
  return http.get(url)
}
/**
 * 客户信息查询
 * /tax/api/tax/client/query/condition?page=0&size=10&roleType=TENANT&credentialsNumber=12330&taxpayerNumber=440300319701888
 */
async function queryClientInfoList (params) {
  const data = {
    clientName: params.clientName,
    credentialsNumber: params.credentialsNumber,
    taxpayerNumber: params.taxpayerNumber
  }
  const url = `/tax/api/tax/client/query/condition?page=0&size=20&roleType=TENANT${judgetFieldValue(data)}`
  return http.get(url)
}
/**
 * 开票信息保存接口
 *  /tax/api/tax/vat/manual/header/dto/save
 */
async function saveWriteInvoiceData (params) {
  const url = '/tax/api/tax/vat/manual/header/dto/save'
  return http.post(url, params)
}
/**
 * 开票信息提交接口
 * /tax/api/tax/vat/manual/header/submit?roleType=TENANT
 */
async function submitWriteInvoiceData (params) {
  const url = '/tax/api/tax/vat/manual/header/submit?roleType=TENANT'
  return http.post(url, params)
}
/**
 * 发票作废提交
 * /tax/api/tax/vat/cancel/apply/header/submit?headerId=1242736605444100097&roleType=TENANT
 */
async function submitInvoiceCancel (params) {
  const url = `/tax/api/tax/vat/cancel/apply/header/submit?headerId=${params.headerId}&roleType=TENANT`
  return http.post(url, {})
}
/**
 * 交易流水创建-查询默认电话号码或邮件
 * /tax/api/tax/client/1235398046579265537?roleType=TENANT
 */
async function createTranFlowGetDefaultInfo (params) {
  const url = `/tax/api/tax/client/${params.clientId}?roleType=TENANT`
  return http.get(url)
}
/**
 * 待开票-动态扫码识别
 * /tax/api/tax/vat/tran/invoice/detail/detailed/{id}
 */
async function getDynamicTaxQRCodeMsg (params) {
  const url = `/tax/api/tax/vat/tran/invoice/detail/detailed/${params.id}`
  return http.get(url)
}
/**
 * 待开票-静态扫码识别
 * /tax/api/tax/qr/code/statics/header/getQRCodeMsg/{id}
 */
async function getStaticTaxQRCodeMsg (params) {
  const url = `/tax/api/tax/qr/code/statics/header/getQRCodeMsg/${params.id}`
  return http.get(url)
}
/**
 * 待开票交易流水保存接口
 * /tax/api/tax/invoice/apply/header/update?roleType=TENANT
 */
async function updateTaxInvoiceApply (params) {
  const url = `/tax/api/tax/invoice/apply/header/update?roleType=TENANT`
  return http.post(url, params)
}
/**
 * 手工开票，头新建
 * /tax/api/tax/vat/manual/header
 */
async function createManualInvoiceHead (params) {
  const url = `/tax/api/tax/vat/manual/header`
  return http.post(url, params)
}

export {
  getStreamApplyList,
  getManualApplyList,
  getRedRushApplyList,
  getTaxCancelApplyList,
  getVatTranInvoiceList,
  getHasOpenInvoiceList,
  deleteOpeningInvoice,
  getGetBlueTicketInfo,
  saveReverseApply,
  submitReverseApply,
  cancelApply,
  tranDetail,
  hasWriteInvoiceDetail,
  createWriteInvoiceApply,
  getElecWriteInvoiceDetail,
  commitElecInvoice,
  getCancelDetail,
  getReverseDetail,
  getManualDetail,
  getTaxRateList,
  getGoodsNameList,
  queryClientInfoList,
  saveWriteInvoiceData,
  submitWriteInvoiceData,
  submitInvoiceCancel,
  createTranFlowGetDefaultInfo,
  getStaticTaxQRCodeMsg,
  getDynamicTaxQRCodeMsg,
  updateTaxInvoiceApply,
  createManualInvoiceHead
}
