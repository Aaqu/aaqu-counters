import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sidebar } from './components/layout/Sidebar/Sidebar';
import { Content } from './components/layout/Content/Content';
import { Devices } from './components/pages/Devices/Devices';
import { Converters } from './components/pages/Converters/Converters';
import { Slaves } from './components/pages/Slaves/Slaves';
import { Databases } from './components/pages/Databases/Databases';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <div className="grid">
        <Sidebar />
        <Content>
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="/converters.html" element={<Converters />} />
            <Route path="/slaves.html" element={<Slaves />} />
            <Route path="/databases.html" element={<Databases />} />
          </Routes>
        </Content>
      </div>
    </Router>
  );
};
