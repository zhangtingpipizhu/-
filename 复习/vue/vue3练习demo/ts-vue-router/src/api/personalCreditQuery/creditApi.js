/**
 * 个人信用查询相关API接口
 */
import http from '@/service/http'
/**
 * 个人信用图表详情
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /workbench/api/credit/contact/userId?userId=1106394313905852417
 */
async function getCreditTableDetail (params) {
  const url = `/workbench/api/credit/contact/userId?userId=${params.userId || ''}`
  return http.get(url)
}
/**
 * 个人信用详情
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*id*} id
 * /workbench/api/credit/contact/detail?id=1190076772172804097&page=0&size=10&roleType=TENANT
 */
async function getCreditDetail (params) {
  const url = `/workbench/api/credit/contact/detail?id=${params.id || ''}&page=${params.page}&size=${params.size}&roleType=TENANT`
  return http.get(url)
}
/**
 * 个人信用列表
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*userId*} userId
 * /workbench/api/credit/contact?page=0&size=10&setOfBooksId=1083762150064451585&userId=1083751705402064897&roleType=TENANT
 */
// async function getCreditList (params) {
//   const url = `/workbench/api/credit/contact?page=${params.page}&size=${params.size}&setOfBooksId=${params.setOfBooksId || ''}&userId=${params.userId || ''}&roleType=TENANT`
//   return http.get(url)
// }
export {
  getCreditDetail,
  getCreditTableDetail
}
