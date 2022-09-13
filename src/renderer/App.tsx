import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';
import { Devices } from './components/pages/Devices/Devices';
import { Converters } from './components/pages/Converters/Converters';
import { Slaves } from './components/pages/Slave/Slaves';

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
            <Route path="/add-tcp-device.html" element={<Converters />} />
            <Route path="/add-slave-device.html" element={<Slaves />} />
          </Routes>
        </Content>
      </div>
    </Router>
  );
};
