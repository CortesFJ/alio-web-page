import { VariantsDict } from "./page"

export interface VariantSelectionProps {
  variants: VariantsDict | undefined
  manageSelectedOption: Record<string, any>
}

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variants,
  manageSelectedOption,
}) =>
  variants ? (
    <div>
      <h2>Variant Selection:</h2>
      <ul>
        {Object.entries(variants).map(([variantName, options]) =>
          variantName ? (
            <li key={variantName}>
              <h3>{variantName}</h3>
              <p>Options:</p>
              <ul>
                {options.map((option: string) => (
                  <li key={option}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        onChange={() =>
                          manageSelectedOption.setVariant({
                            name: variantName,
                            option: option,
                          })
                        }
                        checked={Object.keys(
                          manageSelectedOption.selectedVariants
                        ).includes(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ) : null
        )}
      </ul>
    </div>
  ) : null

export default VariantSelection
