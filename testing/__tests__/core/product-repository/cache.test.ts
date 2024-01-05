import Cache from "@/core/product-repository/cache"

describe("Cache", () => {
  it("should set and get a value successfully", () => {
    const cache = new Cache<number>(5)
    cache.set("key1", 1)
    expect(cache.get("key1")).toBe(1)
  })

  it("should set and get multiple values successfully", () => {
    const cache = new Cache<number>(5)
    cache.set("key1", 1)
    cache.set("key2", 2)
    cache.set("key3", 3)
    expect(cache.get("key1")).toBe(1)
    expect(cache.get("key2")).toBe(2)
    expect(cache.get("key3")).toBe(3)
  })

  it("should clear the cache successfully", () => {
    const cache = new Cache<number>(5)
    cache.set("key1", 1)
    cache.set("key2", 2)
    cache.clear()
    expect(cache.get("key1")).toBeUndefined()
    expect(cache.get("key2")).toBeUndefined()
  })

  it("should update the value if a key already exists", () => {
    const cache = new Cache<number>(5)
    cache.set("key1", 1)
    cache.set("key1", 2)
    expect(cache.get("key1")).toBe(2)
  })

  it("should evict the oldest values when maxItems limit is reached", () => {
    const cache = new Cache<number>(3)
    cache.set("key1", 1)
    cache.set("key2", 2)
    cache.set("key3", 3)
    cache.set("key4", 4)
    expect(cache.get("key1")).toBeUndefined()
    expect(cache.get("key2")).toBe(2)
    expect(cache.get("key3")).toBe(3)
    expect(cache.get("key4")).toBe(4)
  })

  it("should return undefined when getting a value with a key that does not exist", () => {
    const cache = new Cache<number>(5)
    cache.set("key1", 1)
    expect(cache.get("key2")).toBeUndefined()
  })
})
