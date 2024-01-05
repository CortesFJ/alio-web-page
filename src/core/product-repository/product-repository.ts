import { HttpClient } from "../http-client/ports"
import { Product } from "./product"

class ProductRepository {
  private readonly apiVersion: string = "v1"
  constructor(private readonly httpClient: HttpClient) {}

  async fetchProductById(productId: string): Promise<Product> {
    try {
      const rawData = await this.httpClient.get(
        `/${this.apiVersion}/products/${productId}`
      )
      const product = this.transformRawData(rawData)
      return product
    } catch (error) {
      throw error
    }
  }
  private transformRawData(rawData: any): Product {
    return rawData.data
  }
}

export default ProductRepository
