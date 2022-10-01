import { createRoot } from 'react-dom/client';
import { toast } from 'react-toastify';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

window.electron.ipcRenderer.on('error', (err) => {
  return toast.error(err.message);
});

window.electron.ipcRenderer.on('info', (err) => {
  return toast.info(err.message);
});

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
