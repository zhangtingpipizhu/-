// https://cn.vuejs.org/v2/api/#Vue-filter
/**
 * 内置过滤器支持的过滤函数
 */
// import Vue from 'vue'
import { isNumber, datetimeDay, format, isValidDate, isEmpty, dateFormat } from './util'
import { numberComma } from 'vux'

// 将时间戳转化为xxxx-xx-xx 的时间格式
window.Vue.filter('datetimeDay', timestamp => {
  datetimeDay(timestamp)
})

// 发票格式化格式十位时间戳
window.Vue.filter('datetimeTaxDay', timestamp => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date()
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  return `${YYYY}-${format(MM)}-${format(DD)}`
})

// 金额格式化为货币币种+保留两位小数
window.Vue.filter('formatMoney', (value) => {
  if (isNumber(value)) {
    return numberComma(Number(value).toFixed(2))
  }
  return '0.00'
})

// 保留两位小数
window.Vue.filter('keepDecimal', (value, decimal = 2) => {
  value = isNaN(parseFloat(value)) ? value : parseFloat(value).toFixed(2)
  return value
})

// 时间转换
window.Vue.filter('dateFormat', (time, format = 'yyyy-MM-dd') => {
  if (!isEmpty(time)) return dateFormat(time, format)
})
// 附件分类
window.Vue.filter('attachmentClass', (fileType) => {
  switch (fileType) {
    case 'PDF':
      return require('@/assets/fkimg/expenseReport/pdf3.svg')
    case 'DOCX':
    case 'DOC':
      return require('@/assets/fkimg/expenseReport/word3.svg')
    case 'XLSX':
    case 'XLS':
      return require('@/assets/fkimg/expenseReport/excel3.svg')
    case 'PPT':
    case 'PPTX':
      return require('@/assets/fkimg/expenseReport/ppt3.svg')
    case 'ZIP':
      return require('@/assets/fkimg/expenseReport/zip.svg')
    default:
      return require('@/assets/fkimg/expenseReport/unknow.svg')
  }
})
// 时间转换
window.Vue.filter('formatTime', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      let hh = date.getHours()
      let mm = date.getMinutes()
      if (hh.toString().length < 2) hh = '0' + hh
      if (mm.toString().length < 2) mm = '0' + mm
      return `${hh}:${mm}`
    }
  }
  return time
})

// 转化为中文日期格式，如1月3日
window.Vue.filter('formatDateToChineseMd', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      const date = new Date(time)
      let MM = date.getMonth() + 1
      let DD = date.getDate()

      return `${MM}月${DD}日`
    }
    return ''
  }
})

// 时间转换YYYY-MM-dd HH:mm:ss
window.Vue.filter('formatDateAndTime', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      const YYYY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()
      let ss = date.getSeconds()

      if (MM.toString().length < 2) MM = '0' + MM
      if (DD.toString().length < 2) DD = '0' + DD
      if (hh.toString().length < 2) hh = '0' + hh
      if (mm.toString().length < 2) mm = '0' + mm
      if (ss.toString().length < 2) ss = '0' + ss

      return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    }
  }
  return ''
})

// 时间转换YYYY-MM-dd HH:mm:ss
window.Vue.filter('formatDateAndTime2', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      const YYYY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()

      if (MM.toString().length < 2) MM = '0' + MM
      if (DD.toString().length < 2) DD = '0' + DD
      if (hh.toString().length < 2) hh = '0' + hh
      if (mm.toString().length < 2) mm = '0' + mm

      return `${YYYY}-${MM}-${DD} ${hh}:${mm}`
    }
  }
  return ''
})

// 转化为中文日期格式，如2019年1月
window.Vue.filter('formatDateToChinese', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      const date = new Date(time)
      const YYYY = date.getFullYear()
      let MM = date.getMonth() + 1

      return `${YYYY}年${MM}月`
    }
    return ''
  }
})

// 时间转换YYYY.MM.dd
window.Vue.filter('rjhFormatDate', time => {
  if (!isEmpty(time)) {
    const date = new Date(time)
    if (isValidDate(date)) {
      const YYYY = date.getFullYear()
      let MM = date.getMonth() + 1
      let DD = date.getDate()

      if (MM.toString().length < 2) MM = '0' + MM
      if (DD.toString().length < 2) DD = '0' + DD

      return `${YYYY}.${MM}.${DD}`
    }
  }
  return ''
})

// 发票截取*号中间的字符串显示
window.Vue.filter('goodsNameSubstr', goodsName => {
  if (!isEmpty(goodsName) && goodsName.indexOf('*') !== -1) {
    let str = goodsName.substring(goodsName.indexOf('*') + 1, goodsName.length)
    if (str.indexOf('*') !== -1) return str.substring(0, str.indexOf('*'))
  }
  return goodsName
})

// 单据列表状态图标
/* GENERATE(1001,"编辑中")//编辑中
  , APPROVAL(1002,"审批中")//审批中
  , WITHDRAW(1003,"撤回") // 撤回
  , APPROVAL_PASS(1004,"审批通过") // 审批通过
  , APPROVAL_REJECT(1005,"审批驳回") // 审批驳回
  , AUDIT_PASS(2004, "复核通过")      //复核通过
  , AUDIT_REJECT(2005, "复核拒绝")    //复核拒绝 */
window.Vue.filter('documentStatusIconFilter', (documentStatus, closedFlag = '', isApplication = false) => {
  if (!isEmpty(documentStatus)) {
    switch (documentStatus.toString()) {
      case '100101': // 预算检验中
      case '100102': // 预算检验中
      case '100103': // 预算检验中
      case '100104': // 预算检验中
        return require('../assets/budgetChecking.svg')
      case '100105': // 编辑中
      case '1001': // 编辑中
        // @/assets/fkimg/expenseReport/editing.svg
        return require('../assets/fkimg/expenseReport/editing.svg')
      case '1002': // 审批中
      case '1008':
        // return '@/assets/fkimg/expenseReport/approving.svg'
        return require('../assets/fkimg/expenseReport/approving.svg')
      case '1003': // 撤回
        // return '@/assets/fkimg/redoNew.svg'
        return require('../assets/fkimg/redoNew.svg')
      case '1004': // 审批通过
      case '2004': // 复核通过
      case '1009':
      case '1010':
        // return '@/assets/fkimg/expenseReport/approved.svg'
        switch (closedFlag) {
          case 'CLOSED': // 已关闭
            return require('../assets/fkimg/expenseReport/closed.svg')
          case 'NOT_CLOSED': // 部分关闭
            return isApplication ? require('../assets/fkimg/expenseReport/approved.svg') : require('../assets/fkimg/expenseReport/partClose.svg')
          default: // 未关闭NOT_CLOSED
            if (documentStatus.toString() === '1010') {
              return require('../assets/fkimg/expenseReport/partClose.svg')
            } else {
              return require('../assets/fkimg/expenseReport/approved.svg')
            }
        }
        // return require('../assets/fkimg/expenseReport/approved.svg')
      case '1005': // 审批驳回
      case '1006':
      case '-1':
      case '1011':
      case '2005': // 复核拒绝
        // return '@/assets/fkimg/expenseReport/refuse.svg'
        return require('../assets/fkimg/expenseReport/refuse.svg')
      default:
        return ''
    }
  }
  return ''
})

// 单据列表状态
window.Vue.filter('documentStatusFilter', (documentStatus, approverList) => {
  if (!isEmpty(documentStatus)) {
    switch (documentStatus.toString()) {
      case '100101': // 预算检验中
      case '100102': // 预算检验中
        return window.vm.$t('budgetChecking')
      case '100103': // 预算警告
        return window.vm.$t('budgetWarning')
      case '100104': // 预算错误
        return window.vm.$t('budgetError')
      case '100105': // 编辑中
      case '1001': // 编辑中
        return window.vm.$t('edit')
      case '1002': // 审批中
        let list = (approverList && approverList.length > 0) ? approverList : window.vm.$t('processing')
        return list
      case '1003': // 撤回
        return window.vm.$t('withdraw')
      case '1004': // 审批通过
        return window.vm.$t('approved')// '审批通过'
      case '2004': // 复核通过
        return '复核通过'
      case '1005': // 审批驳回
        return window.vm.$t('approvalRejected')
      case '2005': // 复核拒绝
        return '复核拒绝'
      case '1006':
        return '审批拒绝'
      case '-1':
        return '删除'
      default:
        return documentStatus
    }
  }
  return ''
})

// 单据列表状态
window.Vue.filter('documentStatusClosedFlagFilter', (documentStatus, approverList, closedFlag) => {
  if (!isEmpty(documentStatus)) {
    switch (documentStatus.toString()) {
      case '1001': // 编辑中
        return window.vm.$t('edit')
      case '1011': //
        return '还款失败'
      case '1008': //
        return '还款中'
      case '1009': //
        return '还款成功'
      case '1002': // 审批中
        let list = (approverList && approverList.length > 0) ? approverList : window.vm.$t('processing')
        return list
      case '1003': // 撤回
        return window.vm.$t('withdraw')
      case '1004': // 审批通过
      case '2004': // 复核通过
        switch (closedFlag) {
          case 'CLOSED': // 已关闭
            return '已关闭'
          case 'PARTIAL_CLOSED': // 部分关闭
            return '部分关闭'
          case 'NOT_CLOSED':
            return window.vm.$t('approved')// '审批通过'
          default: // 未关闭NOT_CLOSED
            return '未关闭'
        }
      case '1010':
        return '部分还款'
      case '1005': // 审批驳回
        return window.vm.$t('approvalRejected')
      case '2005': // 复核拒绝
        return '复核拒绝'
      default:
        return documentStatus
    }
  }
  return ''
})

// 差旅单据类型
window.Vue.filter('travelTypeFiler', (travelType) => {
  switch (travelType) {
    case '1001': // 机票
      return window.vm.$t('airTickets')
    case '1002': // 酒店
      return window.vm.$t('Hotel')
    case '1003': // 火车
      return window.vm.$t('Train')
    case '1004': // 用车
      return window.vm.$t('Car')
    default: // 其他
      return '其他'
  }
})

// GENERATE(1001,"编辑中")//编辑中
//   , APPROVAL(1002,"审批中")//审批中
//   , WITHDRAW(1003,"撤回") // 撤回
//   , APPROVAL_PASS(1004,"审批通过") // 审批通过
//   , APPROVAL_REJECT(1005,"审批驳回") // 审批驳回
//   , TRANSFER //转交
//   , ADD_SIGN  //加签
//   , AUDIT_PASS(2004, "复核通过")      //复核通过
//   , AUDIT_REJECT(2005, "复核拒绝")    //复核拒绝
window.Vue.filter('approveStatusByCode', (code) => {
  switch (code) {
    case 'APPROVAL':
      return window.vm.$t('processing')
    case 'WITHDRAW':
      return window.vm.$t('withdraw')
    case 'APPROVAL_PASS':
      return window.vm.$t('approved')
    case 'APPROVAL_REJECT':
      return window.vm.$t('approvalRejected')
    case 'TRANSFER':
      return window.vm.$t('transfer')
    case 'ADD_SIGN':
      return window.vm.$t('signUp')
    case 'GENERATE':
      return window.vm.$t('edit')
    // case 'AUDIT_PASS':
    //   return '复核通过'
    // case 'AUDIT_REJECT':
    //   return '复核拒绝'
    default:
      return ''
  }
})

window.Vue.filter('approveStatusIconFiltter', (code) => {
  switch (code) {
    case 'APPROVAL_PASS':
      return require('@/assets/approveStatus/agree.svg')
    case 'APPROVAL_REJECT':
      return require('@/assets/approveStatus/refuse.svg')
    case 'TRANSFER':
      return require('@/assets/approveStatus/deliver.svg')
    case 'ADD_SIGN':
      return require('@/assets/approveStatus/addTag.svg')
    default:
      return require('@/assets/approveStatus/agree.svg')
  }
})

// 推送状态值列表详情
window.Vue.filter('pushStatusFilter', (pushStatus) => {
  switch (pushStatus) {
    case 'NO_PUSH': // 未推送
      return '未推送'
    case 'PUSH_SUCCESSFULLY': // 推送成功
      return '未推送'
    case 'PUSH_FAILURE': // 推送失败
      return '推送失败'
    default: // 其他
      return '未推送'
  }
})

// 发票状态
// <!--（1）如果发票状态为已开具，红冲标识为红冲，取已红冲；-->
// <!--（2）发票状态为已开具，已作废，取已作废。-->
// <!--（3）若发票状态为已作废或已红冲不允许再次作废或红冲；-->
window.Vue.filter('invoiceStatusFilter', (invoiceStatusName, invoiceType, reverseFlag, reverseFlagName) => {
  if (reverseFlag === 'Y') {
    // 发票红冲后返回的发票的红冲状态，若为专票，则红冲状态为已红冲。若为普票或电子票，区分全额红冲和部分红冲
    return invoiceType === 'SPECIAL_INVOICE' ? '已红冲' : reverseFlagName
  } else {
    return invoiceStatusName
  }
})

window.Vue.filter('invoiceCodeFilter', (invoiceStatus) => {
  switch (invoiceStatus) {
    case 'N':
      return window.vm.$t('Unissued')
    case 'P':
      return window.vm.$t('Unissued')
    case 'Y':
      return '已开具'
    case 'E':
      return window.vm.$t('issuingFailed')
    case 'C':
      return window.vm.$t('abolished')
    default:
      return ''
  }
})

// 语言对应中文过滤
window.Vue.filter('languageFilter', language => {
  switch (language) {
    case 'en_us': // 英语
      return 'English'
    case 'zh_cn': // 推送成功
      return '简体中文'
    case 'zh_tw': // 推送失败
      return '繁体中文'
    default: // 其他
      return ''
  }
})

// createdMethod 编码
window.Vue.filter('createdMethodFilter', (createdMethod) => {
  switch (createdMethod) {
    case 'ALIPAY':
      return window.vm.$t('alipayCardPackage') // '支付宝卡包'
    case 'WECHAT':
      return window.vm.$t('weChatCardPackage')// '微信卡包'
    case 'BY_HAND':
      return window.vm.$t('manualInput1')// '手工创建'
    case 'SCAN':
      return window.vm.$t('scan1')// '扫描录入'
    default:
      return '-'
  }
})
