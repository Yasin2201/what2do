export const Register = () => {
  return (
    <form>
      <h1>Register Form</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input name="password" type="text" />
      </div>
      <button>Register</button>
    </form>
  )
}