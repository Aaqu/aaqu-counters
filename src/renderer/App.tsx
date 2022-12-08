import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content';
import { Devices } from './components/pages/Devices/Devices';
import { ChartDmm } from './components/pages/ChartDmm/ChartDmm';
import { Faun } from './components/pages/Faun';
// import { Converters } from './components/pages/Converters/Converters';
// import { Slaves } from './components/pages/Slaves/Slaves';
// import { Databases } from './components/pages/Databases/Databases';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <div className="flex h-screen bg-slate-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="m-1 flex h-full">
            <Sidebar />
            <Content>
              <Routes>
                <Route path="/" element={<Faun />} />
                {/* <Route path="/" element={<Devices />} /> */}
                {/* <Route path="/chart" element={<ChartDmm />} /> */}
                <Route path="/faun" element={<Faun />} />

                {/* <Route path="/converters.html" element={<Converters />} /> */}
                {/*  <Route path="/slaves.html" element={<Slaves />} /> */}
                {/* <Route path="/databases.html" element={<Databases />} /> */}
              </Routes>
            </Content>
          </div>
        </div>
      </div>
    </Router>
  );
};
