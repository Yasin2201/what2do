export const GroupUsers = ({users}) => {
  return (
    <ul>
      {users.map( user => {
        return (
          <li key={user.userId}>
            {user.user.username}
          </li>
        )
      })}
    </ul>
  )
}