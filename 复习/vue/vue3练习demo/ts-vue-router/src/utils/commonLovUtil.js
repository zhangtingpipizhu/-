/*
*公共的快速编码
* */

/**
 * @method 差旅类型快速编码
 * @param type 类型编码
 */
function getTravelTypeLov (type) {
  switch (type) {
    case '1':
      return window.vm.$t('Domestic')
    case '2':
      return window.vm.$t('International')
    case '0':
      return window.vm.$t('airTicketUnlimited')
    case '1001':
      return window.vm.$t('airTickets')
    case '1002':
      return window.vm.$t('Hotel')
    case '1003':
      return window.vm.$t('Train')
    case '1004':
      return window.vm.$t('Car')
    default:
      return ''
  }
}

/**
 * @method 单据价格单位
 * @param type 类型编码
 */
function getPriceUnitName (priceUnitName) {
  switch (priceUnitName) {
    case 'day':
      return window.vm.$t('Day')
    case 'ge':
      return window.vm.$t('Piece')
    case 'week':
      return window.vm.$t('Week')
    case 'month':
      return window.vm.$t('Month')
    case 'person':
      return window.vm.$t('People')
    case 'time':
      return window.vm.$t('Times1')
    default:
      return window.vm.$t('quantity')
  }
}

/**
 * @method 发票类型
 * @param code 类型编码
 */
function matchInvoiceType (code) {
  switch (code) {
    case '01':
      return 'INV001'
    case '04':
      return 'INV004'
    case '10':
      return 'INV005'
    case '11':
      return 'INV006'
    default:
      return code
  }
}

/**
 * @method 发票录入方式
 * @param createdMethod 编码
 */
function invoiceCreatedMethod (createdMethod) {
  switch (createdMethod) {
    case 'WECHAT':
      return window.vm.$t('weChatCardPackage')// '微信卡包'
    case 'ALIPAY':
      return window.vm.$t('alipayCardPackage')// '支付宝卡包'
    case 'BY_HAND':
      return window.vm.$t('manualInput1')// '手工创建'
    case 'SCAN':
      return window.vm.$t('scan1')// '扫描录入'
    default:
      return 'createdMethod'
  }
}

/**
 * @method 根据单据张台判断单据是否处于可编辑双胎
 * @param status 状态
 * GENERATE(1001,"编辑中")//编辑中
 , APPROVAL(1002,"审批中")//审批中
 , WITHDRAW(1003,"撤回") // 撤回
 , APPROVAL_PASS(1004,"审批通过") // 审批通过
 , APPROVAL_REJECT(1005,"审批驳回") // 审批驳回
 , AUDIT_PASS(2004, "复核通过")      //复核通过
 , AUDIT_REJECT(2005, "复核拒绝")    //复核拒绝
 */
function judgetDocIsEdit (status) {
  let str = status.toString()
  // str = str.length > 4 ? str.substring(0, 4) : str
  switch (str) {
    // case '100101': // 编辑中
    case '100102': // 编辑中
    case '100103': // 编辑中
    case '100104': // 编辑中
    case '100105': // 编辑中
    case '1001': // 编辑中
    case '1003': // 撤回
    case '1005': // 审批驳回
    case '2005': // 复核拒绝
      return true
    default:
      return false
  }
}
/**
 * @method 单据动态
 * @param code 类型编码
 */
function documentStatusTypeLov (code) {
  switch (code) {
    case 'APPROVAL':
      return window.vm.$t('processing')
    case 'APPROVAL_PASS':
    case 'AUDIT':
      return window.vm.$t('approved')
    case 'PAYED':
      return window.vm.$t('Paid')
    case 'WITHDRAW':
      return window.vm.$t('withdraw')
    case 'REJECT':
      return window.vm.$t('approvalRejected')
    case 'AUDIT_REJECT':
      return window.vm.$t('reviewRejected')
    case 'ALL':
      return window.vm.$t('payAll')
    case 'PART':
      return window.vm.$t('partialPaid')
    default:
      return code
  }
}
/**
 * @method 首页单据动态
 * (801009)申请单显示三种状态：创建（撤回、拒绝）-审批（审批中）-报销（已审批）
 (801010)差旅申请单显示三种状态：创建（撤回、拒绝）-审批（审批中）-订票（已审批）
 (801003)借款单显示三种状态：创建（撤回、拒绝）-审批（审批中）-支付（已审批）
 (801001)报销单显示显示四种状态：创建（撤回、拒绝）-审批（审批中）-审核（已审批）-支付（已审核）
 */
function judgetDocListStatus (documentType, code) {
  let list = [
    {
      statusLabel: window.vm.$t('Create'),
      isActive: (code === 'WITHDRAW' || code === 'REJECT' || code === 'AUDIT_REJECT')
    },
    {
      statusLabel: window.vm.$t('approval'),
      isActive: code === 'APPROVAL'
    }
  ]
  switch (documentType.toString()) {
    case '801009': // 申请单
      list.push({
        statusLabel: window.vm.$t('Report'),
        isActive: code === 'APPROVAL_PASS'
      })
      break
    case '801010': // 差旅申请单
      list.push({
        statusLabel: window.vm.$t('Book1'),
        isActive: code === 'APPROVAL_PASS'
      })
      break
    case '801003': // 借款单
      list.push({
        statusLabel: window.vm.$t('Pay'),
        isActive: (code === 'APPROVAL_PASS' || code === 'ALL' || code === 'PART')
      })
      break
    case '801001': // 报销单
      list.push({
        statusLabel: window.vm.$t('Check'),
        isActive: code === 'APPROVAL_PASS'
      })
      list.push({
        statusLabel: window.vm.$t('Pay'),
        isActive: (code === 'AUDIT' || code === 'ALL' || code === 'PART')
      })
      break
    default:
      list.push({
        statusLabel: window.vm.$t('Check'),
        isActive: code === 'APPROVAL_PASS'
      })
      break
  }
  let activeIndex = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i].isActive) {
      activeIndex = i + 1
      break
    }
  }
  return {
    activeIndex: activeIndex,
    statusList: list
  }
}
/**
 * @method 只允许添加一行发票行
 * @param code 类型编码
 */
function judgetInvoiceLineAddOnlyOne (code) {
  switch (code) {
    case 'INV012':
    case 'INV008':
    case 'INV003':
    case 'INV013':
    case 'INV014':
    case 'INV015':
    case 'INV016':
    case 'INV017':
      return false
    default:
      return true
  }
}
/**
 * @method 差旅供应商
 * @param code 类型编码
 */
function getSupplierNameByCode (code) {
  switch (code) {
    case 'supplyMeiYaService':
      return window.vm.$t('processing')
    case 'supplyTuniuService':
      return window.vm.$t('Tuniu')
    case 'cloudheliosFlightService':
      return '甄选机票'
    case 'supplyCtripService':
      return window.vm.$t('Ctrip')
    case 'supplyCtShoService':
      return '中旅'
    case 'supplyEtripService':
      return window.vm.$t('Etrip')
    case 'supplyAliTripService':
      return window.vm.$t('aliBusinessHotel')
    default:
      return ''
  }
}
export {
  getTravelTypeLov,
  getPriceUnitName,
  matchInvoiceType,
  invoiceCreatedMethod,
  judgetDocIsEdit,
  documentStatusTypeLov,
  judgetDocListStatus,
  judgetInvoiceLineAddOnlyOne,
  getSupplierNameByCode
}
