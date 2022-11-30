import { NavLink } from "react-router-dom";

export const SideNavigation = () => {
  const navigation = [{
    id: 1,
    title: 'Groups',
    children: [
      { name: 'Groups', to: '/groups' }
    ]
  },
  {
    id: 2,
    title: 'Activities',
    children: [
      { name: 'Voting', to: '/activitys/voting' },
      { name: 'Active', to: '/activitys/active' },
      { name: 'Completed', to: '/activitys/completed' },
      { name: 'New Activity', to: '/activity/create' },
    ]
  },
  {
    id: 3,
    title: 'Dashboard',
    children: [
      { name: 'Dashboard', to: '/dashboard' }
    ]
  }]

  return (
    navigation.map((item) => {
      return (
        <div key={item.id} className="flex flex-col m-2">
          <span className="text-gray-300 text-sm px-2 pt-2">{item.title}</span>
          <div className="flex flex-col">
          {
            item.children.map((child) => {
              return (
                <NavLink 
                key={child.name} 
                to={child.to}
                className={
                  ({isActive}) => (`p-2 rounded hover:bg-gray-600 ${ isActive ? "bg-gray-900" : undefined }`)
                }
                >
                   {child.name}
                </NavLink>
              )
            })
          }
          </div>
        </div>
      )
    })
  );
};