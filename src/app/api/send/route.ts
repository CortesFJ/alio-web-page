import { EmailTemplate } from "@/components/email-template"
import { NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
// const resend = new Resend("")
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["cortes.frj@gmail.com"],
      subject: "Someone from alio page",
      react: EmailTemplate({ name, email, message }),
      text: "",
    })

    if (data.error) {
      throw new Error(data.error.message)
    }
    return Response.json({ id: data.data?.id })
  } catch (error) {
    return Response.json(error)
  }
}
