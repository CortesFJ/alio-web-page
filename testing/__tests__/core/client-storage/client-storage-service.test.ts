import ClientStorageService from "@/core/client-storage/client-storage"

const localStorageService = ClientStorageService.localStorage
const sessionStorageService = ClientStorageService.sessionStorage

describe("ClientStorageService Consistency", () => {
  test("Test Case 1: Ensure Consistency across Storage Mechanisms", () => {
    const testData = {
      user: {
        name: "John",
        age: 30,
      },
      items: ["item1", "item2"],
    }

    sessionStorageService.save("session", testData)
    localStorageService.save("local", testData)

    const sessionData = sessionStorageService.get("session")
    const localData = localStorageService.get("local")

    expect(localData).toEqual(testData)
    expect(sessionData).toEqual(testData)
  })
})
