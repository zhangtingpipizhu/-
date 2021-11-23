import { getCropWxToken } from 'api/common/commonApi'
import { Base64 } from 'js-base64'
import { getLocalValue, setLocalValue } from '../../utils/util'
import http from '@/service/http'
import formDataHttp from '@/service/formDataHttp'

// 微信配置初始化
async function initWxConfig (refresh, count) {
  console.log('这是企业sdk', window.vm.wx)
  let url = window.location.href
  // 防止页面url增加#字符串
  if (url.indexOf('#')) {
    url = url.split('#')[0]
  }
  url = Base64.encode(url)
  let cropWxToken = {}

  cropWxToken = await getCropWxToken(url, refresh)
  console.log('cropWxToken===>', cropWxToken)
  const params = {
    appId: cropWxToken.data.appId,
    timestamp: cropWxToken.data.timestamp,
    nonceStr: cropWxToken.data.nonceStr,
    signature: cropWxToken.data.signature
  }
  setLocalValue('wxParams', params)

  // 微信权限注入
  window.vm.wx.config({
    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: getLocalValue('wxParams').appId, // 必填，企业微信的corpID
    timestamp: getLocalValue('wxParams').timestamp, // 必填，生成签名的时间戳
    nonceStr: getLocalValue('wxParams').nonceStr, // 必填，生成签名的随机串
    signature: getLocalValue('wxParams').signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: [
      'closeWindow',
      'scanQRCode',
      'chooseInvoice',
      'chooseImage',
      'previewImage',
      'getLocalImgData',
      'openDefaultBrowser',
      'onMenuShareAppMessage',
      'uploadImage'
    ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  })
  window.vm.wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    console.log('微信JSDK注入成功.....')
  })
  window.vm.wx.error(function (res) {
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // console.log('微信JSDK注入失败.....')
    count++
    console.log(res)
    if (count < 3) {
      // removeLocalValue('wxParams')
      initWxConfig(true, count)
    } else {
      window.vm.$toast.show({
        type: 'error',
        content: '微信JSDK注入失败'
      })
    }
  })
}

// 分享转发
function shareToWechat (params) {
  console.log('$config.type--->' + $config.type)
  if ($config.type === 'online' && getLocalValue('loginType') !== 'dingTalk') {
    const protocol = window.location.protocol // 协议
    const host = window.location.host// IP和端口
    let redirectUri = protocol + '//' + host
    redirectUri = encodeURIComponent(redirectUri)
    console.log('redirectUri--->' + redirectUri)
    const link = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwce7bf2196be87575&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=1107839525171277825/${params.routerName}/${params.documentId}/${params.taskId}/${params.entityType}#wechat_redirect`
    console.log('link--->' + link)
    console.log('documentTitle---->' + params.documentTitle)
    // 禁用右上角菜单按钮
    // wx.hideOptionMenu();
    window.vm.wx.onMenuShareAppMessage({
      title: params.documentTitle + '审批', // 分享标题
      desc: params.documentTitle, // 分享描述_this.header.headerDesc
      link: link, // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
      imgUrl: require('../../assets/pic_logo.png'), // 分享图片
      success: function () { // 用户确认分享后执行的回调函数
        console.log('分享转发调用成功')
      },
      cancel: function () { // 用户取消分享后执行的回调函数
        console.log('分享转发调用取消')
      },
      fail: function (error) { // 报错
        console.error(JSON.stringify(error))
      }
    })
  }
}

// 判断是否绑定————小程序专用
function BindingWechatApplet () {
  // let data = getLocalValue('openid')
  const url = `/peripheral/api/weChat/binding?openid=${getLocalValue('openid')}`
  return http.get(url)
}

/**
 * 获取企业微信acess_token
 */
function getAccessToken (refresh) {
  const url = '/peripheral/api/weChatWork/getToken?refresh=' + (refresh | false)
  return http.get(url)
}

/**
 * 企业微信查询发票信息
 */
function getqyInvoiceInfo (params) {
  const data = {
    item_list: params.item_list
  }
  const url = '/cgi-bin/card/invoice/reimburse/getinvoiceinfobatch?access_token=' + params.access_token
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 20000
  }
  return window.axios.post(url, data, config)
}

/**
 * 更改微信电子票状态
 * INVOICE_REIMBURSE_INIT  发票初始状态，未锁定
 * INVOICE_REIMBURSE_LOCK  发票已锁定
 */
function loackWxTicket (params) {
  let url = ''
  const data = {
    openid: params.openid, // 用户唯一标志,
    reimburse_status: params.reimburse_status,
    invoice_list: params.invoice_list
  }

  console.log('锁定发票参数===>', data)
  if ($config.type === 'online' && getLocalValue('loginType') !== 'webapp') {
    url = '/cgi-bin/card/invoice/reimburse/updatestatusbatch?access_token=' + params.access_token
  } else {
    url = '/peripheral/api/weChat/updateStatus'
  }
  return http.post(url, data)
}

/**
 * 微信获取授权页ticket
 * 商户在调用授权页前需要先获取一个7200s过期的授权页ticket，在获取授权页接口中，该ticket作为参数传入，加强安全性。
 */
function getWxTicket (param) {
  let url = `/cgi-bin/ticket/getticket?access_token=${param.access_token}&type=wx_card`
  return formDataHttp.get(url)
}

/**
 * 微信获取授权页面链接
 * @param {*开票平台在微信的标识号，商户需要找开票平台提供} s_pappid
 * @param {*订单id，在商户内单笔开票请求的唯一识别号} order_id
 * @param {*订单金额，以分为单位} money
 * @param {*时间戳} timestamp
 * @param {*开票来源，app：app开票，web：微信h5开票，wxa：小程序开发票，wap：普通网页开票} source
 * @param {*授权成功后跳转页面。本字段只有在source为H5的时候需要填写，引导用户在微信中进行下一步流程。app开票因为从外部app拉起微信授权页，授权完成后自动回到原来的app，故无需填写。} redirect_url
 * @param {*通过getWxTicket获取} ticket
 * @param {*授权类型，0：开票授权，1：填写字段开票授权，2：领票授权} type
 */
function getTicketUrl (param) {
  let data = {
    's_pappid': param.s_pappid,
    'order_id': param.order_id,
    'money': param.money,
    'timestamp': param.timestamp,
    'source': param.source,
    'redirect_url': param.redirect_url,
    'ticket': param.ticket,
    'type': param.type
  }
  let url = `/card/invoice/getauthurl?access_token=${param.access_token}`
  return formDataHttp.post(url, data)
}

/**
 * 判断微信是否授权
 * @param {*开票申请的单据编号} orderId
 */
function getWeChatAuthData (orderId) {
  let url = `peripheral/api/weChat/getAuthData?orderId=${orderId}`
  return http.get(url)
}

/**
 * 微信授权接口
 * @param {*开票申请的单据编号} orderId
 * @param {*发票总金额} money
 */
function getWeChatAuthURL (params) {
  let data = {
    'order_id': params.order_id,
    'money': params.money
  }
  let url = `peripheral/api/weChat/getAuthURL`
  return http.post(url, data)
}
/**
 * 电子发了PDF上传接口
 * 商户在调用授权页前需要先获取一个7200s过期的授权页ticket，在获取授权页接口中，该ticket作为参数传入，加强安全性。
 * @param {*weChat微信类型} invoiceType
 * @param {*必输，附件url} invoiceUrl
 * @param {*非必输，用户id，支付宝需要} userId
 * @param {*非必输，发票编号，支付宝需要} invoiceCode
 * @param {*非必输，发票号码，支付宝需要} invoiceNo
 */
function ElectInvoicePDFupload (data) {
  let url = `/peripheral/api/down/invoice`
  return http.post(url, data)
}

export {
  initWxConfig,
  shareToWechat,
  BindingWechatApplet,
  getAccessToken,
  getqyInvoiceInfo,
  loackWxTicket,
  getWxTicket,
  getTicketUrl,
  getWeChatAuthData,
  getWeChatAuthURL,
  ElectInvoicePDFupload
}
