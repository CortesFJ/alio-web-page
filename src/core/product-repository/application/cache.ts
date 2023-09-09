class Cache<T> {
  private cache: Map<string, T> = new Map()
  private insertionOrder: string[] = []

  constructor(private readonly maxItems: number) {}

  private evictOldest(): void {
    if (this.insertionOrder.length >= this.maxItems) {
      const oldestKey = this.insertionOrder.shift()
      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }
  }

  set(key: string, value: T): void {
    this.evictOldest()
    this.cache.set(key, value)
    this.insertionOrder.push(key)
  }

  get(key: string): T | undefined {
    return this.cache.get(key)
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  clear(): void {
    this.cache.clear()
    this.insertionOrder = []
  }
}

export default Cache
