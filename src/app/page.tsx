import BlogPage from "../components/BlogPage"

// JUST TO TEST
import { fakeData1 } from "../../testing/mocks/app/blog-page"
import { createBlogSection } from "../components/BlogPage"

// JUST TO TEST
const Sections = [createBlogSection(fakeData1)]

const Home = () => {
  return (
    <>
      <BlogPage sections={Sections} />
    </>
  )
}

export default Home
