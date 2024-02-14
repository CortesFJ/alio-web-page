// JUST TO TEST
import { fakeData1 } from "../../testing/mocks/app/blog-page"
import { BlogInfographic } from "../components/BlogPage"

const Home = () => {
  return (
    <>
      <BlogInfographic content={fakeData1.content[0]} />
    </>
  )
}

export default Home
