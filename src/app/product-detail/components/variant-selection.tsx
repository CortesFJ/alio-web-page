import { Button } from "@/components/ui/button"
import { Variants } from "@/core/product-repository/product"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
interface OptionsProps {
  variantName: string
  options: string[]
  availableOptions: string | string[]
}
const Options: React.FC<OptionsProps> = ({
  variantName,
  options,
  availableOptions,
}) => {
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

  if (variantName === "cssColor") {
    return (
      <div className="flex items-center gap-4 w-fit mb-1">
        <strong>Color</strong>
        {options.map((option: string, i) => {
          if (availableOptions === "all" || availableOptions.includes(option)) {
            return (
              <label
                key={option + i}
                title={option}
                className={`h-3 w-3 rounded-full ${
                  searchParams.get(variantName) === option ? "w-5 shadow" : ""
                }
                  cursor-pointer hover:border-2 hover:border-gray-700`}
                style={{ backgroundColor: option }}
              >
                <input
                  className="hidden"
                  type="radio"
                  name={variantName}
                  onChange={() => {
                    handleVariantSelection(variantName, option)
                  }}
                />
              </label>
            )
          }
        })}
      </div>
    )
  }

  return (
    <p className="flex items-center gap-4 w-fit mb-1">
      <strong>{variantName}</strong>
      {options.length === 1 ? (
        <span>{options[0]}</span>
      ) : (
        <span>
          {options.map((option: string, i) => {
            if (
              availableOptions === "all" ||
              availableOptions.includes(option)
            ) {
              return (
                <label
                  key={option + i}
                  className={`${
                    searchParams.get(variantName) === option
                      ? "text-accent "
                      : ""
                  } mx-1 cursor-pointer hover:underline `}
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
              )
            }
          })}
        </span>
      )}
    </p>
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

  if (!variantsDict.length) {
    return
  }

  return (
    <div>
      {variantsDict.map(([variantName, options], ind) => {
        if (variantName === "Color") {
          return
        }

        const availableOptions: string | string[] =
          ind === 0
            ? "all"
            : variantName in possibleOptions
            ? possibleOptions[variantName]
            : "none"

        return (
          <Options
            key={ind}
            variantName={variantName}
            options={options}
            availableOptions={availableOptions}
          />
        )
      })}
    </div>
  )
}
export default VariantSelection
