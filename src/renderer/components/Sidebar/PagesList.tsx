import { NavLink } from 'react-router-dom';

interface PagesListPros {
  data: {
    name: string;
    href: string;
  }[];
}

export const PagesList = ({ data }: PagesListPros) => {
  return (
    <ul>
      {data.map(({ name, href }) => (
        <li key={href} className="flex ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-teal-700 p-1.5 mx-1.5 mt-1.5 w-full rounded-lg text-white'
                : 'p-1.5 mx-1.5 mt-1.5 w-full rounded-lg text-black'
            }
            to={href}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
