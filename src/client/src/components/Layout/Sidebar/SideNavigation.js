import { NavLink } from "react-router-dom";

export const SideNavigation = () => {
  const navigation = [
    { name: 'Groups', to: '/groups' },
    { name: 'Activities', to: '/activitys' },
    { name: 'Profile', to: '/profile' },
    { name: 'Dashboard', to: '/dashboard' },
  ];

  return (
      navigation.map((item) => {
        return (
          <NavLink
          key={item.name}
          to={item.to}
          className={
            ({isActive}) => (`p-2 m-2 rounded hover:bg-gray-600 ${ isActive ? "bg-gray-900" : undefined }`)
          }
          >
          {item.name}
        </NavLink>
      )
      })
      );
};