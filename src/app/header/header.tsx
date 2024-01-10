"use client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => {
  return (
    <>
      <nav className=" flex justify-between bg-secondary py-4">
        <h1>HEADER</h1>
        <Link href={"/"}>
          <Button variant="link">Home</Button>
        </Link>
        <Link href={"/product-detail"}>
          <Button variant="link">Catalogue</Button>
        </Link>
      </nav>
      <Separator />
    </>
  )
}
export default Header
