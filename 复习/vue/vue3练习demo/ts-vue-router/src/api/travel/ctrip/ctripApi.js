/**
 * 携程相关API接口
 */
import http from '@/service/http'

/**
 * 获取携程token
 */
function getxcTicket (params) {
  /* let url = `/r/api/ctrip/h5/login` */
  const url = '/peripheral/api/ctrip/h5/login'
  return http.get(url)
}

/**
 * 获取ticket，
 * 进行商旅身份认证获取Ticket（有效时间为2个小时。如2个小时内有使用该ticket, 那么有效时间将往后延迟2小时。如2小时之内未使用该ticket，则需要重新获取ticket.）
 */
async function getTicket () {
  const data = {
    appKey: `${$config.ctripAppKey}`,
    appSecurity: `${$config.ctripAppSecurity}`
  }
  const url = '/SwitchAPI/Order/Ticket'
  return http.post(url, data)
}

/**
 * 订单查询，
 * 根据查询条件获取订单信息
 *  @param {*开始时间} DateFrom
 *  @param {*结束时间} DateTo
 *  @param {*查询产品类别,默认为1} SearchType
 */
async function searchOrder (params) {
  const data = {
    request: {
      Auth: {
        AppKey: `${$config.ctripAppKey}`,
        Ticket: params.Ticket
      },
      OrderID: params.OrderID,
      DateFrom: params.dateFrom,
      DateTo: params.dateTo,
      SearchType: params.SearchType,
      JourneyNo: params.JourneyNo
    }
  }
  const url = '/switchapi/Order/SearchOrder'
  return http.post(url, data)
}

export {
  getTicket,
  searchOrder,
  getxcTicket
}
