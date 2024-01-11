"use client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = ({ links }: { links: { href: string; lName: string }[] }) => {
  return (
    <>
      <nav className=" flex justify-evenly sticky top-0 bg-gray-600 py-4 ">
        <h1>HEADER</h1>
        {links.map((item) => (
          <Link href={item.href}>{item.lName}</Link>
        ))}
      </nav>
      <Separator />
    </>
  )
}
export default Header
