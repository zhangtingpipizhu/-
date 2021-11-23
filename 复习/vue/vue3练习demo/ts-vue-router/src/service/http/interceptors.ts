import { getLocalValue, isEmpty, removeLocalValue } from '@/utils/util'
// import hmapLogin from '../../platform/hmap/login'
// import Vue from 'vue'

const requestBefore = (request:any) => {
  if (!isEmpty(getLocalValue('token'))) {
    request.headers.common.Authorization = 'Bearer ' + getLocalValue('token')
    request.headers.common['X-Menu-Id'] = getLocalValue('xMenuId')
  }
  return request
}

// 请求时出错的处理函数
const requestError = (error:any) => Promise.reject(error)

// 请求返回之后的预处理函数：若返回状态码为200，但实际请求未完成，将异常处理统一到错误处理
// const responseAfter = response => response.data.success ? response.data : Promise.reject(response)
// 若项目接口无 response.data.success 状态字段，注释上一行，使用下行
const responseAfter = (response:any) => response
// 状态码信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
// 检查状态
const checkStatus = (response:any) => {
  if (response.status > 400) {
    // 401表示密码已经过期或无效，应该退出应用

    // const errorMessage = codeMessage[response.status] || response.statusText
    // if (response.status === 401) {
    //   // if(getLocalValue('loginType')==='taikang'){

    //   // }else{

    //   // }
    //   window.Vue.$vux.confirm.show({
    //     title: '提示',
    //     content: '用户身份验证过期，将退出应用！',
    //     showCancelButton: false,
    //     onConfirm: () => {
    //       switch (getLocalValue('loginType')) {
    //         case 'dingTalk':// 钉钉退出
    //           console.error('钉钉接口401，此处应该退出')
    //           window.vm.dd().biz.navigation.close({
    //             onSuccess: function (result) {},
    //             onFail: function (err) { console.log(err) }
    //           })
    //           // 清除所有缓存
    //           localStorage.clear()
    //           break
    //         case 'WechatApplet':// 小程序
    //           console.error(`=小程序退出到登录页面=`)
    //           removeLocalValue('token')
    //           // location.reload()
    //           window.vmwx.miniProgram.redirectTo({url: 'pages/index/index'})
    //           break
    //         case 'webapp':// flutter
    //           let data = {
    //             className: 'BaseBridge',
    //             function: 'logout',
    //             successCallBack: 'onSuccess',
    //             failureCallBack: 'onError'
    //           }
    //           console.log(`=flutter退出=`)
    //           HandBridge.postMessage(JSON.stringify(data))
    //           localStorage.clear()
    //           break
    //         case 'EnterpriseWeChat':// 企业微信
    //           localStorage.clear()
    //           window.vm.wx.closeWindow()
    //           break
    //         case 'taikang':
    //           localStorage.clear()
    //           // eslint-disable-next-line
    //           TKJSSDKWebViewUI.closeWebView({'animated': 0})
    //           break
    //         default: // app或者企业微信
    //           console.log('暂无操作')
    //           break
    //       }
    //     }
    //   })
    // } else if (response.status === 403) {
    //   window.Vue.$vux.confirm.show({
    //     title: '提示',
    //     content: `请求错误 ${response.status}: ${errorMessage}`,
    //     showCancelButton: false,
    //     onConfirm: () => {
    //       if (getLocalValue('loginType') === 'webapp') {
    //         console.error(`=flutter退出=`)
    //         let data = {
    //           className: 'BaseBridge',
    //           function: 'logout',
    //           successCallBack: 'onSuccess',
    //           failureCallBack: 'onError'
    //         }
    //         console.log(`=flutter退出=`)
    //         HandBridge.postMessage(JSON.stringify(data))
    //       }
    //     }
    //   })
    // }
    // else if (response.status === 500) {
    //   console.log('500了===>', response)
    //   if (getLocalValue('loginType') === 'webapp') {
    //     window.Vue.$vux.confirm.show({
    //       title: '提示',
    //       content: `请求错误 ${response.status}: ${errorMessage}`,
    //       showCancelButton: false,
    //       onConfirm: () => {
    //         console.error(`=flutter退出=`)
    //         let data = {
    //           className: 'BaseBridge',
    //           function: 'closeWebView',
    //           successCallBack: 'onSuccess',
    //           failCallBack: 'onError'
    //         }
    //         HandBridge.postMessage(JSON.stringify(data))
    //       }
    //     })
    //   }
    // }
    // alert(`请求错误 ${response.status}: ${errorMessage}`)
    console.error(`请求错误 ${response.status}:`)
  }
}

// 请求返回时出错的处理函数
const responseError = (error:any) => {
  if (error && error.response) {
    checkStatus(error.response)
  }
  return Promise.reject(error)
}

// form-data类型请求返回之后的预处理函数bywuqing
const responseFormDataAfter = (response:any) => response.data
export { requestBefore, requestError, responseAfter, responseError, responseFormDataAfter }
