import { ReactNode } from "react"
import Image from "next/image"

export type SectionInfo = {
  subtitle: string
  image: { url: string; description: string }
  paragraphs: string[]
}

export type BlogDataContent = {
  title: string
  sectionInfo: SectionInfo[]
}

export interface BlogPageArticle {
  title: string
  sections: ReactNode
}

export const createBlogArticle = ({
  title,
  sectionInfo,
}: BlogDataContent): BlogPageArticle => {
  const sections = (
    <>
      {sectionInfo.map(({ image, paragraphs, subtitle }, idx) => (
        <section key={idx} className="mb-4">
          {subtitle ? <h2 className="my-2">{subtitle}</h2> : null}
          <Image
            src={image.url}
            alt={image.description}
            width={500}
            height={500}
          />
          <div className="my-2 pl-2 pr-6">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  )
  return { sections, title }
}

export interface BlogPageProps {
  sections: BlogPageArticle[]
}

const BlogPage: React.FC<BlogPageProps> = ({ sections }) => {
  return sections.map(({ title, sections }: BlogPageArticle) => (
    <article key={title} className="p-4">
      <h1>{title}</h1>
      {sections}
    </article>
  ))
}
export default BlogPage
