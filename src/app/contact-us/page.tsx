"use client"
import { useState } from "react"

// import styles from "./styles.module.css"
// import "./styles.css"
// // import { useRef } from "react"

const ContactUs = () => {
  const [name, setName] = useState("francisco")
  const [email, setEmail] = useState("cortes.fj@gmail.com")
  const [message, setMessage] = useState("some message")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    if (name == "" || email == "") {
      setLoading(false)
      alert("Please enter both name & email id")
      return false
    }

    // document.body.classList.add("sent")

    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)

        if (data && data.id) {
          alert(
            `Thank you for your interest ${name}! We will get back to you soon!`
          )
          setName("")
          setEmail("")
        } else {
          alert("Apologies! Please try again.")
        }
      })
      .catch((err) => {
        setLoading(false)
        alert("Ooops! unfortunately some error has occurred.")
      })
    return true
  }

  // const Ref = useRef(null)

  return (
    <div
      className={``}
      //  ref={Ref}
    >
      <h1 className={``}>Contact Us</h1>
      <small className={``}>
        Enter message (optional) and click button "Send"
      </small>
      <div className={` wrapper centered`}>
        <form onSubmit={handleSubmit} className={` letter`}>
          <div className="side">
            <h1 className={``}>Contact us</h1>
            <p className={``}>
              <textarea
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                placeholder="Your message"
              ></textarea>
            </p>
          </div>
          <div className="side">
            <p>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                placeholder="Your name"
              />
            </p>
            <p>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Your email"
              />
            </p>
            <p>
              <button id="sendLetter" type="submit">
                {loading ? (
                  <div
                    style={{
                      borderTopColor: "transparent",
                    }}
                    className="w-4 h-4 border-2 border-white border-solid rounded-full animate-spin"
                  ></div>
                ) : (
                  "Send"
                )}
              </button>
            </p>
          </div>
        </form>
        <div className="envelope front"></div>
        <div className="envelope back"></div>
      </div>
      <p className="result-message centered">Thank you for your message</p>
    </div>
  )
}
export default ContactUs
