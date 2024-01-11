import { ReactNode } from "react"
import Image from "next/image"

export type SectionInfo = {
  subtitle: string
  image: { url: string; description: string }
  paragraphs: string[]
}

export type BlogDataContent = {
  title: string
  content: SectionInfo[]
}

export interface BlogPageSection {
  htmlContent: ReactNode
  title: string
}

export const createBlogSection = ({
  title,
  content,
}: BlogDataContent): BlogPageSection => {
  const Content = (
    <>
      {content.map(({ image, paragraphs, subtitle }, idx) => (
        <section key={idx}>
          {subtitle ? <h2>{subtitle}</h2> : null}
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
  try {
    return sections.map(({ title, htmlContent }: BlogPageSection) => (
      <article key={title}>
        <h1>{title}</h1>
        {htmlContent}
      </article>
    ))
  } catch {
    return null
  }
}
export default BlogPage
