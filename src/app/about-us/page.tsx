// JUST TO TEST
import { fakeData2 } from "../../../testing/mocks/app/blog-page"
import { BlogArticle } from "@/components/BlogPage"

const AboutUs = () => {
  return <BlogArticle articleContent={fakeData2} />
}
export default AboutUs
