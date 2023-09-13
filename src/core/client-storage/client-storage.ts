type ClientStorageValue = any

interface StorageDriver {
  save(key: string, value: ClientStorageValue): void
  get(key: string): ClientStorageValue | null
  remove(key: string): void
}

function createStorageDriver(storage: Storage): StorageDriver {
  return {
    save(key: string, value: ClientStorageValue): void {
      try {
        storage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(
          `Error saving data to ${storage.constructor.name}:`,
          error
        )
      }
    },
    get(key: string): ClientStorageValue | null {
      try {
        const item = storage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(
          `Error retrieving data from ${storage.constructor.name}:`,
          error
        )
        return null
      }
    },
    remove(key: string): void {
      try {
        storage.removeItem(key)
      } catch (error) {
        console.error(
          `Error removing data from ${storage.constructor.name}:`,
          error
        )
      }
    },
  }
}

const localStorageDriver = createStorageDriver(localStorage)
const sessionStorageDriver = createStorageDriver(sessionStorage)

const ClientStorageService = {
  localStorage: localStorageDriver,
  sessionStorage: sessionStorageDriver,
}

export default ClientStorageService
