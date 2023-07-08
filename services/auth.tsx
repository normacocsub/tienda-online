import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND



export async function apiRestGet(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}

    requestOptions.params = body
    const response = await axios.get(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestDelete(path: string, body = {}): Promise<any> {
  try {
    const requestOptions: any = {}

    requestOptions.params = body
    const response = await axios.delete(path, requestOptions)
    return response.data
  } catch (e) {
    return e
  }
}

export async function apiRestPost(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}
    const response = await axios.post(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPatch(
  path: string,
  body: any = {},
  headers?: any
): Promise<any> {
  try {
    const requestOptions: any = {}

    if (headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...headers,
      }
    }

    const response = await axios.patch(path, body, requestOptions)

    return response.data
  } catch (e) {
    return { error: e }
  }
}

export async function apiRestPut(path: string, body: any = {}): Promise<any> {
  try {
    const requestOptions: any = {}

    const response = await axios.put(path, body, requestOptions)
    return response.data
  } catch (e) {
    return { error: e }
  }
}