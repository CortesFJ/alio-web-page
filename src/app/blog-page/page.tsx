import { ReactNode } from "react"
import Image from "next/image"

export type InfoSection = {
  image: { url: string; description: string }
  paragraphs: string[]
}

export type BlogSectionContent = {
  title: string
  content: InfoSection[]
}

export interface BlogPageSection {
  htmlContent: ReactNode
  title: string
}

export const createBlogSection = ({
  title,
  content,
}: BlogSectionContent): BlogPageSection => {
  const Content = (
    <>
      {content.map(({ image, paragraphs }, idx) => (
        <section key={idx}>
          <Image
            src={image.url}
            alt={image.description}
            width={200}
            height={200}
          />
          <div>
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  )
  return { htmlContent: Content, title }
}

export interface BlogPageProps {
  sections: BlogPageSection[]
}

const BlogPage: React.FC<BlogPageProps> = ({ sections }) => {
  return sections.map(({ title, htmlContent }: BlogPageSection) => (
    <article key={title}>
      <h1>{title}</h1>
      {htmlContent}
    </article>
  ))
}
export default BlogPage

