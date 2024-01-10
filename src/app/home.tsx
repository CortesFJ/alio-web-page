import Link from "next/link"

const Home = () => {
  return (
    <div className=" flex gap-3">
      <Link href="/blog-page">Blog Page</Link>
      <Link href="/product-detail">Product Detail</Link>
    </div>
  )
}
export default Home
