/**
 * 加班福利相关API接口
 */
import http from '@/service/http'

/**
 * 分页查询加班记录信息
 * @param {*当前页数} page
 * @param {*每页显示的条数} size
 */
function queryOvertimeRecord (params) {
  const url = `expense/api/overtime/record/query?page=${params.page}&size=${params.size}`
  return http.get(url)
}

/**
 * 根据记录ID查询加班奖励明细
 * @param {*加班记录ID} overtimeRecordId
 */
function queryOvertimeDetail (overtimeRecordId) {
  const url = `expense/api/overtime/record/detail/query/by/id?overtimeRecordId=${overtimeRecordId}`
  return http.get(url)
}

/**
 * 分页查询加班奖励明细信息
* @param {*当前页数} page
 * @param {*每页显示的条数} size
 */
function queryVoucherList (params) {
  const url = `expense/api/overtime/record/detail/query?page=${params.page}&size=${params.size}`
  return http.get(url)
}

/**
 * 创建加班记录
 */
function createOvertimeRecord (params) {
  let data = {
    'companyId': params.companyId,
    'departmentId': params.departmentId,
    'overtimeDate': params.overtimeDate,
    'overtimePlace': params.overtimePlace,
    'overtimePlaceLatitude': params.overtimePlaceLatitude,
    'overtimePlaceLongitude': params.overtimePlaceLongitude,
    'responsibilityCenterId': params.responsibilityCenterId,
    'setOfBooksId': params.setOfBooksId,
    'tenantId': params.tenantId,
    'userId': params.userId
  }
  const url = `expense/api/overtime/record/create`
  return http.post(url, data)
}

export {
  queryOvertimeRecord,
  queryOvertimeDetail,
  createOvertimeRecord,
  queryVoucherList
}
