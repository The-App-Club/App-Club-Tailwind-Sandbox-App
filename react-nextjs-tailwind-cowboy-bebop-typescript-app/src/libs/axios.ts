import Axios from 'axios'

import { env } from '@/config/env'
import { BackendResponseData } from '@/types/response'

export const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  timeout: 3000,
})

const neatError = (error: any): BackendResponseData => {
  if (error.response) {
    return error.response.data
  }
  return { message: error.message }
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const niceError = {
      ...error,
      response: {
        ...error.response,
        data: neatError(error),
      },
    }
    return Promise.reject(niceError)
  }
)
