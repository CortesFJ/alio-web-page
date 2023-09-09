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

  private handleResponse<T>(response: AxiosResponse<T>): { data: T } {
    if (!response.data) {
      throw new DataNotFoundError("Product not found")
    }
    return { data: response.data }
  }

  private handleError<T>(error: AxiosError<T>): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access:", error.message)
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
