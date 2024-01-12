"use client"
import './styles.css'
import { useRef } from "react"
const ContactUs = () => {
  const Ref = useRef(null)
  // Refactor to use REact funtionality
  function addClass() {
    document.body.classList.add("sent")
  }
  return (
    <div ref={Ref}>
      <h1>Contact Us</h1>
      <small>Enter message (optional) and click button "Send"</small>
      <div className="wrapper centered">
        <article className="letter">
          <div className="side">
            <h1>Contact us</h1>
            <p>
              <textarea placeholder="Your message"></textarea>
            </p>
          </div>
          <div className="side">
            <p>
              <input type="text" placeholder="Your name" />
            </p>
            <p>
              <input type="email" placeholder="Your email" />
            </p>
            <p>
              <button id="sendLetter" onClick={addClass}>
                Send
              </button>
            </p>
          </div>
        </article>
        <div className="envelope front"></div>
        <div className="envelope back"></div>
      </div>
      <p className="result-message centered">Thank you for your message</p>
    </div>
  )
}
export default ContactUs
