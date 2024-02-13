import BlogPage from "@/components/BlogPage"

// JUST TO TEST
import { fakeData2 } from "../../../testing/mocks/app/blog-page"
import { createBlogArticle } from "@/components/BlogPage"
const Sections = [createBlogArticle(fakeData2)]

const AboutUs = () => {
  return (
      <BlogPage sections={Sections} />
  )
}
export default AboutUs
