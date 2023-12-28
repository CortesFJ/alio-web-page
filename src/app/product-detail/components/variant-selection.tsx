import { useEffect, useState, useRef } from "react"
import { Variants } from "@/types"

type VariantsDict = Record<string, string[]>

const buildVariantDictionary = (variantsList: Variants[]) => {
  const variantsDict = variantsList.reduce<VariantsDict>((acc, v) => {
    for (const [variantName, option] of Object.entries(v || {})) {
      if (!acc[variantName]) {
        acc[variantName] = [option]
      } else if (!acc[variantName].includes(option)) {
        acc[variantName].push(option)
      }
    }

    return acc
  }, {})

  return variantsDict
}

const displayOptions = (
  variantName: string,
  options: string[],
  manageState: Record<string, any>,
  availableOptions: string | string[]
) => {
  const myElementRef = useRef(null)
  // const [checkedOptions, setCheckedOptions] = useState({})

  // const checked = (
  //   SelectedVariants: any,
  //   variantName: string,
  //   option: string
  // ) => {
  //   if (Object.values(SelectedVariants).includes(option)) {
  //     if (checkedOptions[variantName] !== option) {
  //       const element = myElementRef.current
  //       if (element) {
  //         element.classList.add("border")
  //         element.classList.add("border-red-500")
  //         setTimeout(() => {
  //           element.classList.remove("border")
  //           element.classList.remove("border-red-500")
  //         }, 500)
  //       }
  //         setCheckedOptions({ ...checkedOptions, variantName: option })
  //     }
  //     return true
  //   }
  // }
  useEffect(() => {
    const element = myElementRef.current
    if (element) {
      element.classList.add("border")
      element.classList.add("border-red-500")
      setTimeout(() => {
        element.classList.remove("border")
        element.classList.remove("border-red-500")
      }, 500)
    }
  }, [])

  if (availableOptions === "none") {
    return
  }
  return (
    <li
      ref={myElementRef}
      key={variantName}
      className="transition-all duration-300 ease-in-out"
    >
      <h3>{variantName}</h3>
      {options.length === 1 ? (
        <span>{options[0]}</span>
      ) : (
        <ul>
          {" "}
          {options.map((option: string, i) =>
            availableOptions === "all" || availableOptions.includes(option) ? (
              <li key={option + i}>
                <label>
                  <input
                    type="radio"
                    name={variantName}
                    // disabled={
                    //   availableOptions === "all"
                    //     ? false
                    //     : !availableOptions.includes(option)
                    // }
                    onChange={() =>{
                      manageState.setVariant({
                        vName: variantName,
                        option,
                      })
                    }
                    }
                    checked={Object.values(
                      manageState.selectedVariants
                    ).includes(option)}
                  />
                  {option}
                </label>
              </li>
            ) : null
          )}
        </ul>
      )}
    </li>
  )
}
//     checked(
//     manageState.selectedVariants,
//     variantName,
//  )   option

export interface VariantSelectionProps {
  variantsList: Variants[]
  manageState: Record<string, any>
}

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variantsList,
  manageState,
}) => {
  const variantsDict = buildVariantDictionary(variantsList)

  return Object.keys(variantsDict).length !== 0 ? (
    <section>
      <h2>Variant Selection:</h2>
      <ul>
        {Object.entries(variantsDict).map(([variantName, options], ind) => {
          const availableOptions: string | string[] =
            ind === 0
              ? "all"
              : variantName in manageState.possibleOptions
              ? manageState.possibleOptions[variantName]
              : "none"

          return displayOptions(
            variantName,
            options,
            manageState,
            availableOptions
          )
        })}
      </ul>
    </section>
  ) : null
}
export default VariantSelection
