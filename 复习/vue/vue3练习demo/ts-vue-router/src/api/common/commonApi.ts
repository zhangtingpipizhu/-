import http from '@/service/http'
import formDataHttp from '@/service/formDataHttp'
async function getCompanyInfo () {
  const url = '/mdata/api/my/companies?roleType=TENANT'
  return http.get(url)
}
export {
  getCompanyInfo
}