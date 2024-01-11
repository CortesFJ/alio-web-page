import { render, screen } from "@testing-library/react"

import BlogPage, { createBlogSection, SectionInfo } from "@/components/BlogPage"
import { fakeData1, fakeData2 } from "../../mocks/app/blog-page"

describe("BlogPage component", () => {
  test("renders multiple sections", () => {
    const sections = [
      createBlogSection(fakeData1),
      createBlogSection(fakeData2),
    ]

    render(<BlogPage sections={sections} />)

    const titles = screen.getAllByRole("heading", { level: 1 })

    expect(titles).toHaveLength(2)
    expect(titles[0]).toHaveTextContent(fakeData1.title)
    expect(titles[1]).toHaveTextContent(fakeData2.title)
  })
})

describe("createBlogSection function", () => {
  test("process all the info to be displayed", () => {
    const section = createBlogSection(fakeData1)

    expect(section.title).toBe(fakeData1.title)

    render(<>{section.htmlContent}</>)

    fakeData1.content.forEach(
      ({ image, paragraphs, subtitle }: SectionInfo) => {
        if (subtitle) {
          expect(screen.getByText(subtitle)).toBeInTheDocument()
        }
        expect(screen.getByAltText(image.description)).toBeInTheDocument()
        expect(
          screen.getByText(paragraphs[paragraphs.length - 1])
        ).toBeInTheDocument()
        expect(screen.getByText(paragraphs[0])).toBeInTheDocument()
      }
    )
  })
})
