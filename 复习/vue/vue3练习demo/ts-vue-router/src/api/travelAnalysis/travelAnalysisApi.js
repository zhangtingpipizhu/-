/**
 * 差旅报表相关API接口
 */
import http from '@/service/http'

/**
 * 筛选-公司
 * /mdata/api/company/available/by/setOfBooks/enable/dataAuth?page=0&size=10&keyword=99&setOfBooksId=1107884147185029121&roleType=TENANT
 */
async function getTravelAnalysisCompanyList (params) {
  const url = `/mdata/api/company/available/by/setOfBooks/enable/dataAuth?page=${params.page}&size=${params.size}&keyword=${params.keyword || ''}&setOfBooksId=${params.setOfBooksId || ''}&roleType=TENANT`
  return http.get(url)
}
/**
 * 筛选-部门
 * /mdata/api/DepartmentGroup/selectDept/enabled/enable/dataAuth?page=0&size=10&name=管&roleType=TENANT
 */
async function getTravelAnalysisDepartmentList (params) {
  const url = `/mdata/api/DepartmentGroup/selectDept/enabled/enable/dataAuth?page=${params.page}&size=${params.size}&name=${params.name || ''}&roleType=TENANT`
  return http.get(url)
}
/**
 * 图表数据
 * /expense/api/travel/analyze/reporter/query/detail?setOfBooksId=1107884147185029121&companyId=1107910958761644034&departmentId=1107913264341192705&dateFrom=2020-01-01&dateTo=2020-01-31&comPeopleId=1107918162780569602&roleType=TENANT
 */
async function getTravelAnalysisTableData (params) {
  // let url = `/expense/api/travel/analyze/reporter/query/detail?setOfBooksId=${params.setOfBooksId || ''}&companyId=${params.companyId || ''}&departmentId=${params.departmentId || ''}&dateFrom=${params.dateFrom || ''}&dateTo=${params.dateTo || ''}&comPeopleId=${params.comPeopleId || ''}&vendorCode=${params.vendorCode || ''}&destinationId=${params.destinationId || ''}&expenseTypeId=${params.expenseTypeId || ''}&roleType=TENANT`
  let url = '/expense/api/travel/analyze/reporter/query/detail?roleType=TENANT'
  if (params.setOfBooksId) {
    url += `&setOfBooksId=${params.setOfBooksId}`
  }
  if (params.companyId) {
    url += `&companyId=${params.companyId}`
  }
  if (params.departmentId) {
    url += `&departmentId=${params.departmentId}`
  }
  if (params.dateFrom) {
    url += `&dateFrom=${params.dateFrom}`
  }
  if (params.dateTo) {
    url += `&dateTo=${params.dateTo}`
  }
  if (params.comPeopleId) {
    url += `&comPeopleId=${params.comPeopleId}`
  }
  if (params.vendorCode) {
    url += `&vendorCode=${params.vendorCode}`
  }
  if (params.destinationId) {
    url += `&destinationId=${params.destinationId}`
  }
  if (params.expenseTypeId) {
    url += `&expenseTypeId=${params.expenseTypeId}`
  }
  return http.get(url)
}
/**
 * 差旅分析列表
 * /expense/api/travel/analyze/reporter/query?page=0&size=10&setOfBooksId=1107884147185029121&companyId=1107910958761644034&departmentId=1107913264341192705&dateFrom=2020-01-15&dateTo=2020-01-31&comPeopleId=1191918113710510081&roleType=TENANT
 */
async function getTravelAnalysisList (params) {
  // const url = `/expense/api/travel/analyze/reporter/query?page=${params.page}&size=${params.size}&setOfBooksId=${params.setOfBooksId || ''}&companyId=${params.companyId || ''}&departmentId=${params.departmentId || ''}&dateFrom=${params.dateFrom || ''}&dateTo=${params.dateTo || ''}&comPeopleId=${params.comPeopleId || ''}&vendorCode=${params.vendorCode || ''}&destinationId=${params.destinationId || ''}&expenseTypeId=${params.expenseTypeId || ''}&roleType=TENANT`
  let url = `/expense/api/travel/analyze/reporter/query?page=${params.page}&size=${params.size}&roleType=TENANT`

  if (params.setOfBooksId) {
    url += `&setOfBooksId=${params.setOfBooksId}`
  }
  if (params.companyId) {
    url += `&companyId=${params.companyId}`
  }
  if (params.departmentId) {
    url += `&departmentId=${params.departmentId}`
  }
  if (params.dateFrom) {
    url += `&dateFrom=${params.dateFrom}`
  }
  if (params.dateTo) {
    url += `&dateTo=${params.dateTo}`
  }
  if (params.comPeopleId) {
    url += `&comPeopleId=${params.comPeopleId}`
  }
  if (params.vendorCode) {
    url += `&vendorCode=${params.vendorCode}`
  }
  if (params.destinationId) {
    url += `&destinationId=${params.destinationId}`
  }
  if (params.expenseTypeId) {
    url += `&expenseTypeId=${params.expenseTypeId}`
  }
  return http.get(url)
}
export {
  getTravelAnalysisCompanyList,
  getTravelAnalysisDepartmentList,
  getTravelAnalysisTableData,
  getTravelAnalysisList
}
