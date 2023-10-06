"use client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <>
      <nav className=" flex justify-between bg-secondary py-4">
        <h1>HEADER</h1>
        <Button variant="link">Home</Button>
      </nav>
      <Separator />
    </>
  )
}
export default Header
