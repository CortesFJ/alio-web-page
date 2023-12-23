import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios"

import {
  NetworkError,
  DataNotFoundError,
  UnauthorizedError,
  HttpClient,
} from "./ports"

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL })
  }

  private handleResponse(response: AxiosResponse): { data: any  } {
    if (!response.data) {
      throw new DataNotFoundError("Product not found")
    }
    try {
      return { data: response.data }
    } catch (error: any) {
      throw new Error(`Failed to parse response data: ${error.message}`)
    }
  }

  private handleError(error: AxiosError): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new UnauthorizedError("Unauthorized access")
      }
      console.error("Network request failed:", error.message)
      throw new NetworkError("Network request failed")
    }
    console.error("Unhandled error:", error.message)
    throw error
  }

  async get<T>(url: string): Promise<{ data: T }> {
    try {
      const response = await this.axiosInstance.get<T>(url)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
}
export default AxiosHttpClient
