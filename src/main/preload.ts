import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  // | 'post-converters'
  // | 'get-converters'
  // | 'delete-converters'
  // | 'reload-converters'
  // | 'post-slaves'
  // | 'get-slaves'
  // | 'delete-slaves'
  // | 'reload-slaves'
  // | 'get-connection-types'
  // | 'get-device-types'
  | 'dmm-start'
  | 'dmm-stop'
  | 'dmm-read'
  | 'dmm-export'
  | 'dmm-chart'
  | 'dmm-samples'
  | 'info'
  | 'error';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners(channel: Channels) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
});
