import BlogPage from "../components/BlogPage"

// JUST TO TEST
import { fakeData1 } from "../../testing/mocks/app/blog-page"
import { createBlogSection } from "../components/BlogPage"
import { mockReviews } from "../../testing/mocks/components/productReview"
import ReviewList from "@/components/productReview"

// JUST TO TEST
const Sections = [createBlogSection(fakeData1)]

const Home = () => {
  
  return (
    <>
      <BlogPage sections={Sections} />
      <ReviewList reviews={mockReviews}/>
    </>
  )
}

export default Home
