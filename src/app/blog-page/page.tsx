import BlogPage from "@/components/BlogPage"

// JUST TO TEST
import { fakeData2 } from "../../../testing/mocks/app/blog-page"
import { createBlogSection } from "@/components/BlogPage"
const Sections = [createBlogSection(fakeData2)]

const AboutUs = () => {
  return (
    <>
      <BlogPage sections={Sections} />
    </>
  )
}
export default AboutUs
