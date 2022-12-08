import { PagesList } from './PagesList';

const pages = [
  // { name: 'Dmm', href: '/' },
  // { name: 'Chart', href: '/chart' },
  { name: 'Faun', href: '/faun' },
];

export const Sidebar = () => {
  return (
    <nav className="w-72 border border-slate-300 rounded-l-lg">
      <PagesList data={pages} />
    </nav>
  );
};
