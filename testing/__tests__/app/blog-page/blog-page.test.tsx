import BlogPage, {
  createBlogSection,
  BlogSectionContent,
} from "@/app/blog-page/page"
import { render, screen } from "@testing-library/react"

const fakeData1 = {
  title: "Exciting Adventures",
  content: [
    {
      image: {
        url: "https://example.com/image1.jpg",
        description: "A beautiful landscape",
      },
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      image: {
        url: "https://example.com/image2.jpg",
        description: "Exploring the unknown",
      },
      paragraphs: [
        "Ut enim ad minim veniam, quis nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in esse cillum dolore eu fugiat nulla pariatur.",
      ],
    },
    {
      image: {
        url: "https://example.com/image3.jpg",
        description: "Adventurous journey",
      },
      paragraphs: [
        "Excepteur sint occaecat cupidatat deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus. Nulla , turpis et commodo pharetra.",
      ],
    },
  ],
}

const fakeData2 = {
  title: "A World of Imagination",
  content: [
    {
      image: {
        url: "https://picsum.photos/800/400?random=1",
        description: "A mesmerizing landscape",
      },
      paragraphs: [
        "Duis aute irure dolor in reprehenderit in eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, anim id est laborum.",
      ],
    },
    {
      image: {
        url: "https://picsum.photos/800/400?random=2",
        description: "Uncharted territories",
      },
      paragraphs: [
        "Curabitur pretium tincidunt lacus. Nulla gravida turpis et commodo pharetra.",
        "Sed do eiusmod tempor incididunt ut labore et dolore aliqua.",
      ],
    },
    {
      image: {
        url: "https://picsum.photos/800/400?random=3",
        description: "Epic adventures await",
      },
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        "Ut enim ad minim veniam, quis nostrud exercitation consequat.",
      ],
    },
  ],
}

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

    fakeData1.content.forEach(({ image, paragraphs }) => {
      expect(screen.getByAltText(image.description)).toBeInTheDocument()
      expect(
        screen.getByText(paragraphs[paragraphs.length - 1])
      ).toBeInTheDocument()
      expect(screen.getByText(paragraphs[0])).toBeInTheDocument()
    })
  })
})
