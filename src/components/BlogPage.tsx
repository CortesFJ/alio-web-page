import { ReactNode } from "react"
import Image from "next/image"

export type SectionInfo = {
  title: string
  image: { url: string; description: string }
  paragraphs: string[]
}

export type BlogData = {
  title: string
  content: SectionInfo[]
}

export const BlogArticle = ({
  articleContent,
}: {
  articleContent: BlogData
}): ReactNode => {
  const { title, content } = articleContent
  return (
    <article className=" px-8 my-16 text-center">
      <h1>{title}</h1>
      {content.map(({ image, paragraphs, title }, idx) => (
        <section key={idx} className="mb-6">
          {title ? <h2 className="my-8">{title}</h2> : null}
          <Image
            className="mx-auto"
            src={image.url}
            alt={image.description}
            width={500}
            height={500}
          />
          <div className="my-12">
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-8">
                {para}
              </p>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
import { mockReviews } from "../../testing/mocks/components/productReview"
import ReviewList from "./productReview"

export type InfographicData = {}
export const BlogInfographic = ({ content }: { content: SectionInfo }) => {
  const { title, image, paragraphs } = content
  return (
    <article className="py-12 px-4">
      <div className="flex relative  text-center">
        <section>
          <h2 className="my-8">{title}</h2>
          <div>
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-2">
                {para}
              </p>
            ))}
          </div>
        </section>
        <Image
          className=" h-52 w-auto"
          src={image.url}
          alt={image.description}
          width={200}
          height={200}
        />
      </div>
      <ReviewList reviews={mockReviews} />
    </article>
  )
}
