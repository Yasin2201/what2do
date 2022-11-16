import { useAuth } from "@/lib/auth"
import { useState } from "react"

export const RegisterForm = () => {
  const { isLoading } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Register Form</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input name="password" type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} />
      </div>
      {
        isLoading ? 
        <button disbaled="true" type="submit">Register</button>
        :
        <button type="submit">Register</button>
      }
    </form>
  )
}
