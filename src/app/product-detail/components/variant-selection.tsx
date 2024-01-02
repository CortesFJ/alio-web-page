import { useRef } from "react"
import { Variants } from "@/types"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

const displayOptions = (
  variantName: string,
  options: string[],
  availableOptions: string | string[]
) => {
  const myElementRef = useRef(null)
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  function handleVariantSelection(variantName: string, selectedOption: string) {
    const params = new URLSearchParams(searchParams)

    params.set(variantName, selectedOption)

    replace(`${pathname}?${params.toString()}`)
  }

  if (availableOptions === "none" || options.length === 0) {
    return
  }

  return (
    <li ref={myElementRef} key={variantName}>
      <h3>{variantName}</h3>
      {options.length === 1 ? (
        <span>{options[0]}</span>
      ) : (
        <ul>
          {options.map((option: string, i) => {
            if (
              availableOptions === "all" ||
              availableOptions.includes(option)
            ) {
              return (
                <li key={option + i}>
                  <label
                    className={`${
                      searchParams.get(variantName) === option
                        ? "bg-rose-300"
                        : "bg-slate-200"
                    } p-1 rounded cursor-pointer hover:bg-slate-400 transition-colors duration-500 ease-in-out`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      name={variantName}
                      onChange={() => {
                        handleVariantSelection(variantName, option)
                      }}
                    />
                    {option}
                  </label>
                </li>
              )
            }
          })}
        </ul>
      )}
    </li>
  )
}

export interface VariantSelectionProps {
  variantsList: Variants[]
  possibleOptions: Record<string, any>
}

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variantsList,
  possibleOptions,
}) => {
  function buildVariantDictionary(variantsList: Variants[]) {
    type VariantDict = { [key: string]: string[] }

    const variantsDict = variantsList.reduce<VariantDict>((acc, v) => {
      for (const [variantName, option] of Object.entries(v || {})) {
        if (!acc[variantName]) {
          acc[variantName] = [option]
        } else if (!acc[variantName].includes(option)) {
          acc[variantName].push(option)
        }
      }

      return acc
    }, {})

    return Object.entries(variantsDict)
  }

  const variantsDict = buildVariantDictionary(variantsList)

  return variantsDict.length !== 0 ? (
    <ul>
      {variantsDict.map(([variantName, options], ind) => {
        const availableOptions: string | string[] =
          ind === 0
            ? "all"
            : variantName in possibleOptions
            ? possibleOptions[variantName]
            : []

        return displayOptions(variantName, options, availableOptions)
      })}
    </ul>
  ) : null
}
export default VariantSelection
