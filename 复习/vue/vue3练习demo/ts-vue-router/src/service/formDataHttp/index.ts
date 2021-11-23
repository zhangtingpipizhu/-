import axios from 'axios'
import { requestError, responseError, requestBefore, responseFormDataAfter } from '../http/interceptors'

// http defaults configs
const formDatahttp = axios.create({
  baseURL: '',
  timeout: 10000
})

// http interceptors configs
formDatahttp.interceptors.request.use(requestBefore, requestError)
formDatahttp.interceptors.response.use(responseFormDataAfter, responseError)

export default formDatahttp
