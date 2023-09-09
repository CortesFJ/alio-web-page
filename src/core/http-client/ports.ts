import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios"

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NetworkError"
    // You can customize additional properties or behavior for network errors if needed.
  }
}

export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DataNotFoundError"
    // You can customize additional properties or behavior for data not found errors if needed.
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnauthorizedError"
    // You can customize additional properties or behavior for unauthorized access errors if needed.
  }
}

export interface HttpClient {
  get<T>(url: string): Promise<{ data: T }>
}
