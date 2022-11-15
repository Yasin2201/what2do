import { useAuth } from "@/lib/auth"
import { useState } from "react"

export const Login = () => {
  const { isLoading, loginFn } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }
    loginFn(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
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
        <button disbaled="true" type="submit">Login</button>
        :
        <button type="submit">Login</button>
      }
    </form>
  )
}