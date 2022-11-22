export const ActivityUsers = ({users}) => {
  return (
    <ul>
      {users.map(user => {
        return (
          <li key={user.user.id}>
            {user.user.username}
          </li>
        )
      })}
    </ul>
  )
}