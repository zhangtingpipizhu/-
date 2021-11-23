import wx from 'weixin-js-sdk'
/**
 * @method 微信官方JSDK->拉起微信电子票
 * @param {*wxParams值} wxParams
 */
function chooseInvoice (wxParams) {
  return new Promise((resolve, reject) => {
    wx.invoke(
      'chooseInvoice',
      {
        timestamp: wxParams.timestamp, // 卡券签名时间戳
        nonceStr: wxParams.nonceStr, // 卡券签名随机串
        signType: 'SHA1', // 签名方式，默认'SHA1'
        cardSign: wxParams.cardSign // 卡券签名
      },
      function (res) {
        // 这里是回调函数
        console.log('sdk回调===>', res)
        if (res.err_code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    )
  })
}

/**
 * @method 独立APP桥接->拉起微信电子票
 * @param {*wxParams值} wxParams
 */
function chooseInvoiceTicket (wxParams) {
  return new Promise((resolve, reject) => {
    const params = {
      appid: wxParams.appid, // 企业id
      timestamp: wxParams.timestamp, // 卡券签名时间戳
      nonceStr: wxParams.nonceStr, // 卡券签名随机串
      signType: 'SHA1', // 签名方式，默认'SHA1'
      cardSign: wxParams.cardSign, // 卡券签名
      canMultiSelect: true // 是否多选
    }
    console.log(params, '这是最后的参数')
    // eslint-disable-next-line
    TKJSSDKInvoice.getInvoiceFromWx(params, function (info) {
      console.log(info, '这是泰家园桥接返回的信息9999')
      const wxobj = JSON.parse(info)
      console.log(wxobj, '123456i')

      resolve(wxobj)
    })
    // const dict = {
    //   className: 'BaseBridge',
    //   function: 'chooseInvoiceTicket',
    //   params: params,
    //   successCallBack: 'ACallBack',
    //   failureCallBack: 'bCallBack'
    // }
    // console.log('微信电子票桥接调用：------>执行下一步')
    // HandBridge.postMessage(JSON.stringify(dict))

    // // 成功回调
    // window.ACallBack = function (str) {
    //   resolve(JSON.parse(str))
    // }

    // // 失败回调
    // window.bCallBack = function (message) {
    //   reject(message)
    // }
  })
}

/**
 * @method 独立APP桥接->更新微信插入发票
 * @param {*wxParams值} wxParams
 * @param {*authUrl:授权页链接} authUrl
 */
function insertInvoiceTicket (wxParams) {
  return new Promise((resolve, reject) => {
    const params = {
      appid: wxParams.appid, // 企业id
      authUrl: wxParams.authUrl
    }
    const dict = {
      className: 'BaseBridge',
      function: 'insertInvoiceTicket',
      params: params,
      successCallBack: 'ACallBack',
      failureCallBack: 'bCallBack'
    }
    HandBridge.postMessage(JSON.stringify(dict))
    // 成功回调
    window.ACallBack = function (str) {
      resolve(JSON.parse(str))
    }

    // 失败回调
    window.bCallBack = function (message) {
      reject(message)
    }
  })
}

export {
  chooseInvoice,
  chooseInvoiceTicket,
  insertInvoiceTicket
}
