import { Variants } from "@/types"
import { useEffect, useState } from "react"

export interface VariantSelectionProps {
  variantsList: Variants[]
  // variants: VariantsDict
  manageSelectedOption: Record<string, any>
}

type VariantsDict = Record<string, string[]>

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variantsList,
  manageSelectedOption,
}) => {
  const variantsDict = variantsList.reduce<VariantsDict>((acc, v) => {
    const variantNames = Object.entries(v || {})

    for (const [variantName, option] of variantNames) {
      if (!acc[variantName]) {
        acc[variantName] = [option]
      } else if (!acc[variantName].includes(option)) {
        acc[variantName].push(option)
      }
    }

    return acc
  }, {})

  const allVariantNames = Object.keys(variantsDict)

  return allVariantNames.length !== 0 ? (
    <div>
      <h2>Variant Selection:</h2>
      <ul>
        {Object.entries(variantsDict).map(([variantName, options]) =>
          variantName
            ? optionsF(options, manageSelectedOption, variantName, variantsList)
            : null
        )}
      </ul>
    </div>
  ) : null
}

export default VariantSelection
function optionsF(
  options: string[],
  manageSelectedOption: Record<string, any>,
  variantName: string,
  variantsList: Variants[]
) {
  const [disable, setDisable] = useState(false)
  const [available, setAvailable] = useState([""])
  // let available: string[] = []

  useEffect(() => {
    setAvailable(_ =>[])
    // available = []
    if (variantName === "Color") {
      return
    }
    const newColor = manageSelectedOption.selectedVariants.Color

    variantsList
      .filter((variant) => variant.Color === newColor)
      .forEach((variant) => {
        setAvailable(available => [...available, variant[variantName]])
      })
  }, [manageSelectedOption.selectedVariants])

  return (
    <li key={variantName}>
      <h3>{variantName}</h3>
      <p>Options:</p>
      <ul>
        {" "}
        {options.map((option: string, i) => (
          <li key={option + i}>
            <label>
              <input
                type="radio"
                name={variantName}
                disabled={
                  variantName === "Color" ? false : !available.includes(option)
                }
                onChange={() =>
                  manageSelectedOption.setVariant({
                    name: variantName,
                    option: option,
                  })
                }
                checked={Object.values(
                  manageSelectedOption.selectedVariants
                ).includes(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </li>
  )
}
