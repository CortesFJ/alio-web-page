"use client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <>
      <Separator />
      <div className=" flex justify-between bg-secondary py-4">
        <h1>FOOTER</h1>
        <Button variant="link">Contact</Button>
      </div>
    </>
  )
}

export default Footer
