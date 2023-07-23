import { UrlUtil } from "../utils/url"

interface HttpClientProps {
  path: string
  method: string
  params?: Record<string, string[]>
  body?: string | FormData
  headers?: HeadersInit
}

const API_BASE_URL = 'http://localhost:8080'

export const httpClient = {
  request: async ({ 
    path, 
    method, 
    params = {}, 
    body = '', 
    headers = {} 
  }: HttpClientProps) => {
    const _settings = {
      method,
      headers
    }
  
    if (Object.keys(params).length) {
      path += "?" + UrlUtil.parseToUrlParams(params)
    }
  
    try {
      const response = await fetch(API_BASE_URL.concat(path), _settings)
  
      if (response.ok) {
        const _data = await response.json()
        return _data
      }
  
    } catch (err) {
      console.error(err)
    }
  }
}