import mockedProduct from "../../../mocks/core/product"
import ProductRepository from "@/core/product-repository/product-repository"

describe("ProductRepository Data Retrieval Interface", () => {
  let productRepository: ProductRepository
  let httpClientMock: { get: jest.Mock }

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    }
    productRepository = new ProductRepository(httpClientMock)
  })

  it("Fetch Product by ID", async () => {
    httpClientMock.get.mockResolvedValue({ data: mockedProduct })
    const product = await productRepository.fetchProductById(mockedProduct.id)
    expect(httpClientMock.get).toHaveBeenCalledWith(
      expect.stringContaining(mockedProduct.id)
    )
    expect(product).toEqual(mockedProduct)
  })

  it("Asynchronous Data Retrieval", async () => {
    const delayedResponse = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockedProduct })
      }, 1000)
    })
    httpClientMock.get.mockResolvedValueOnce(delayedResponse)
    const productPromise = productRepository.fetchProductById(mockedProduct.id)
    await expect(productPromise).resolves.toEqual(mockedProduct)
  })

  // it("Data Transformation", async () => {
  //   const rawProductData = {
  //     product_id: sampleProductId,
  //     product_name: "Sample Product",
  //     product_description: "A sample product description",
  //     product_price: 19.99,
  //     product_stock: 10,
  //   };
  //   const expectedTransformedData = {
  //     id: sampleProductId,
  //     name: "Sample Product",
  //     description: "A sample product description",
  //     price: 19.99,
  //     stock: 10,
  //   };
  //   httpClientMock.get.mockResolvedValue({ data: rawProductData });
  //   const product = await productRepository.fetchProductById(sampleProductId);
  //   expect(product).toEqual(expectedTransformedData);
  // });
})
