
/**
 * @method 调用支付发票的桥接
 * @param {*data值} data
 * @param {*授权场景：auth_invoice_info(插入发票管家) auth_invoice_per(获取发票)} scope
 */
function useAlipayBridge (data) {
  return new Promise((resolve, reject) => {
    let Base64 = require('js-base64').Base64
    let params = {
      h5Bridge: true,
      url: `https://authweb.alipay.com/auth?app_auth_token=${data.appAuthToken}&auth_type=PURE_OAUTH_SDK&app_id=${data.childAppId}&isv_app_id=${data.appid}&scope=${data.scope}&state=${Base64.encode('init')}`
    }

    console.log('调用支付发票的桥接参数：', params)
    // eslint-disable-next-line
    TKJSSDKInvoice.getInvoiceFromAli(params, 
      function (info) {
        console.log('这是返回的结果', info)
        console.log('这是转json', JSON.parse(info))
        resolve(JSON.parse(info))
      })
  })
}

export {
  useAlipayBridge
}
