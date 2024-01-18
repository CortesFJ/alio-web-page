interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => {
  return (
    <div>
      <h2>New message from {name}</h2>
      <p>Email: {email}</p>
      <br />
      <h3>Content</h3>
      <p>{message}</p>
    </div>
  )
}
