import { Variant } from "@/core/product-repository/domain/product"

export interface VariantSelectionProps {
  variants: Variant[] | undefined
  manageSelectedOption: Record<string, any>
}

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variants,
  manageSelectedOption,
}) => {
  if (variants) {
    return (
      <div>
        <h2>Variant Selection:</h2>
        <ul>
          {variants.map((variant) => (
            <li key={variant.name}>
              <h3>{variant.name}</h3>
              <p>Options:</p>
              <ul>
                {variant.options.map((option) => (
                  <li key={option}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        onChange={() =>
                          manageSelectedOption.setVariant({
                            name: variant.name,
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
          ))}
        </ul>
      </div>
    )
  }
}

export default VariantSelection
