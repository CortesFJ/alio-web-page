import { HttpClient } from "../../http-client/ports"
import Cache from "./cache"
import { Product } from "../../types"

class ProductRepository {
  private readonly apiVersion: string = "v1"
  private readonly cache: Cache<Product> = new Cache<Product>(10)
  constructor(private readonly httpClient: HttpClient) {}

  async fetchProductById(productId: string): Promise<Product> {
    try {
      const rawData = await this.httpClient.get(
        `/${this.apiVersion}/products/${productId}`
      )
      const product = this.transformRawData(rawData)
      this.cache.set(productId, product)
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
