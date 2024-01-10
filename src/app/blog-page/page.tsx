import { ReactNode } from "react"
import Image from "next/image"

interface BlogPageSection {
  node: ReactNode
  title: string
}

type InfoSection = {
  image: { url: string; description: string }
  paragraphs: string[]
}

type BlogSectionContent = {
  title: string
  content: InfoSection[]
}

const BlogSection = ({
  title,
  content,
}: BlogSectionContent): BlogPageSection => {
  const DisplayContent = () => {
    return (
      <>
        {content.map(({ image, paragraphs }) => (
          <section>
            <Image src={image.url} alt={image.description} />
            <div>
              {paragraphs.map((para) => (
                <p>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </>
    )
  }
  return { node: DisplayContent(), title }
}

interface BlogPageProps {
  sections: BlogPageSection[]
}

const BlogPage: React.FC<BlogPageProps> = ({ sections }) => {
  return sections.map(({ title, node }: BlogPageSection) => (
    <article>
      <h1>{title}</h1>
      {node}
    </article>
  ))
}
export default BlogPage
