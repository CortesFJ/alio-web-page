"use client"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <>
      <Separator />
      <div className=" flex justify-between bg-gray-600 py-4">
        <h1>FOOTER</h1>
        <Link href="/contact-us">
          <Button variant="link">Contact</Button>
        </Link>
      </div>
    </>
  )
}

export default Footer
