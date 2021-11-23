/**
 * 申请单相关API接口
 */
import http from '@/service/http'
/**
 * 获取单据列表(包含搜索和筛选)
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 * @param {*状态} status （1001：编辑中、1002：审批中、1003：撤回、1004：审批通过、1005：审批驳回、2001：审核驳回、2002：审核通过）
 * @param {*角色类型} roleType
 * http://101.132.162.31:9081/expense/api/expense/application/header/query/condition?page=0&size=10&typeId=1153218155048779778&dateFrom=2019-09-05&dateTo=2019-09-15&employeeId=1107950720074706946&status=1001&currencyCode=CNY&amountFrom=100&amountTo=200&remarks=eeee&roleType=TENANT
 */
async function getApplyList (params:any) {
  let url = `/expense/api/expense/book/header/query?&roleType=TENANT&page=${params.page}&size=${params.size}&tabStatus=0`
  url = encodeURI(url)
  return http.get(url)
}
/**
 * 账本-删除
 */
async function deleteBook (id:string) {
  const url = `/expense/api/expense/book/header/${id}?roleType=TENANT`
  return http.delete(url)
}

export {
  getApplyList,
  deleteBook
}
