/**
 * 中航易购相关API接口
 */
import http from '@/service/http'
import { isEmpty } from '@/utils/util'

/**
 * 中航易购-单点跳转
 *
 * funCode 页面功能编码
    MenuFL01 首页
    MenuFL02 国内机票
    MenuFL03 国际机票
    MenuFL04 酒店
    MenuFL05 火车票
    MenuFl004 我的订单 MenuFl035 差旅规则
  *
  * 商旅出差申请单号 applyOrderNo,
  * 外部申请单号 outOrderNo
  */
function yeegoLoginJumpPage (params) {
  let url = '/peripheral/api/airChina/pc/login?loginJump=H5'
  if (!isEmpty(params.funCode)) {
    url += `&funCode=${params.funCode}`
  }
  // if (!isEmpty(params.applyOrderNo)) {
  //   url += `&funCode=${params.applyOrderNo}`
  // }
  // if (!isEmpty(params.outOrderNo)) {
  //   url += `&outOrderNo=${params.outOrderNo}`
  // }

  return http.get(url)
}

export {
  yeegoLoginJumpPage
}
