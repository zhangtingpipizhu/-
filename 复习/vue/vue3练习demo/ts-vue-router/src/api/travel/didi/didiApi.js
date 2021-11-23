/**
 * 滴滴相关API接口
 */
import http from '@/service/http'
/**
 * 滴滴-单点跳转
 * /peripheral/didi/login
 */
function didiLoginJumpPage (params) {
  const url = '/peripheral/api/didi/login'
  return http.get(url)
}

export {
  didiLoginJumpPage
}
