import Header from "./header/header"
import BlogPage from "./blog-page/page"

// JUST TO TEST
import { fakeData1, fakeData2 } from "../../testing/mocks/app/blog-page"
import { createBlogSection } from "./blog-page/page"

// JUST TO TEST
const Sections = [createBlogSection(fakeData1), createBlogSection(fakeData2)]

const App = () => {
  return (
    <>
      <Header />
      <BlogPage sections={Sections} />
    </>
  )
}

export default App
