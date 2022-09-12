import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content/Content';

import './App.css';

export const App = () => {
  return (
    <Router>
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<h1>hello</h1>} />
          <Route path="/add-tcp-device.html" element={<h1>tcp</h1>} />
          <Route path="/add-slave-device.html" element={<h1>slave</h1>} />
        </Routes>
      </Content>
    </Router>
  );
};
