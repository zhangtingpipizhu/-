import {invoiceCheckVerifyTrue} from '../expenseReport/expenseReport'
import {isEmpty} from '../../utils/util'

// 检验是否需要验真
function invoiceCheckVerifyTrues (invoiceTypeId, invoiceTypeFlagParam = null) {
  return new Promise(resolve => {
    if (!isEmpty(invoiceTypeFlagParam)) resolve(invoiceTypeFlagParam)
    let params = {
      invoiceTypeId: invoiceTypeId
    }
    let invoiceTypeFlag = false
    invoiceCheckVerifyTrue(params).then(res => {
      if (isEmpty(res.data.error)) {
        invoiceTypeFlag = res.data.invoiceType.invoiceTypeFlag
        resolve(invoiceTypeFlag)
      }
    }).catch(err => {
      console.error(err)
      // window.vm.showErrorMessage(err.response.data, '检查是否需要验真失败')
    }).finally(() => {
      resolve(invoiceTypeFlag)
    })
  })
}

export {
  invoiceCheckVerifyTrues
}
