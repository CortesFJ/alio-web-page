import { Price } from "@/core/product-repository/product"

export  const updateCurrency = (
    price: Price,
    newCurrency?: Record<string, string>
  ) => {
    newCurrency = { currency: "COP", symbol: "$" }
    const newAmount = parseFloat(price.amount)

    return { newCurrency, newAmount }
  }
