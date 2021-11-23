import http from '@/service/http'
/**
 * 邮寄列表
*/
async function mailList (params) {
  // params.applicant_id = '1132965208329228289'
  let url = ''
  if (params.status === 'GENERATE') { // 待邮寄
    url = `/peripheral/api/peripheral/courier/get/nomail?applicant_id=${params.applicant_id}&status=${params.status}&page=${params.page}&size=${params.size}&roleType=TENANT`
  } else {
    url = `/peripheral/api/peripheral/courier/get/inthemail?applicant_id=${params.applicant_id}&status=${params.status}&page=${params.page}&size=${params.size}&roleType=TENANT`
  }
  const res = await http.get(url)
  return res
}
/**
 * 获取地址列表
 */
async function getAddressList (params) {
  // ?emplyee_id=${params.emplyee_id}
  const url = `/peripheral/api/peripheral/courier/get/selectaddress?id=${params.emplyee_id}&page=${params.page}&size=${params.size}`
  const res = await http.get(url)
  return res
}
/**
 * 保存地址
 */
async function saveAddress (params) {
  const data = {
    name: params.userName,
    postCode: params.postCode,
    prov: params.province,
    city: params.city,
    county: params.county,
    address: params.detailAddress,
    description: '',
    employeeId: params.employeeId
  }
  if (params.fixPhone) {
    data.phone = params.fixPhone
  }
  if (params.phoneNumber) {
    data.mobile = params.phoneNumber
  }
  if (params.addressId) {
    data.id = params.addressId
  }
  const url = '/peripheral/api/peripheral/courier/post/address'
  const res = await http.post(url, data)
  return res
}
/**
 * 删除地址
 */
async function deleteAddress (params) {
  const id = params.addressId.toString()
  console.log('数据类型==========', typeof id)
  const url = '/peripheral/api/peripheral/courier/delete/deleteress?id=' + id
  const res = await http.delete(url)
  return res
}
/**
 * 获取地址详情
 */
async function getAddressDetail (params) {
  const url = `/peripheral/api/peripheral/courier/get/selectress?id=${params.id}`
  const res = await http.get(url)
  return res
}

/**
 * 获取物流信息
 */
function getLogisticsInfo (params) {
  const url = `/peripheral/api/peripheral/courier/get/status?orderId=${params.orderId}`
  return http.get(url)
}
/**
 * 获取收件寄件地址信息
 */
async function getPackageAdressDetail (params) {
  const url = `/peripheral/api/peripheral/courier/get/details?id=${params.id}`
  const res = await http.get(url)
  return res
}
/**
 * 服务类型
 */
async function getServiceType () {
  const url = '/peripheral/api/peripheral/courier/service/type?code=LOG_ SERVICE_TYPE'
  const res = await http.get(url)
  return res
}
/**
 * 保存订单
 */
async function savePackage (params) {
  const url = '/peripheral/api/peripheral/courier/post/addtheorder'
  const res = await http.post(url, params)
  return res
}
/**
 * 提交订单
*/
async function submitPackage (params) {
  const url = '/peripheral/api/peripheral/courier/confirm/post'
  const res = await http.post(url, params)
  return res
}
/**
 * 删除订单
 *
 */
async function deletePackage (params) {
  const url = `/peripheral/api/peripheral/courier/del/email?id=${params.id}`
  const res = await http.delete(url, params)
  return res
}
/**
 * 维值列表查询
*/
async function getDemisionList () {
  const url = '/peripheral/api/peripheral/courier/get/dimension'
  const res = await http.get(url)
  return res
}

export {
  mailList,
  getAddressList,
  saveAddress,
  deleteAddress,
  getAddressDetail,
  getLogisticsInfo,
  getPackageAdressDetail,
  getServiceType,
  savePackage,
  submitPackage,
  deletePackage,
  getDemisionList
}
