/* eslint global-require: off, no-console: off, promise/always-return: off */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import sqlite3 from 'sqlite3';
import { existsSync, openSync } from 'fs';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  deleteConverters,
  getConverters,
  initConverters,
  postConverters,
} from './sql/converters';
import { getDbVersion, initDbVersion, postDbVersion } from './sql/db-version';
import {
  getDeviceTypes,
  initDeviceTypes,
  postDeviceTypes,
} from './sql/devices-types';
import {
  getConnectionTypes,
  initConnectionTypes,
  postConnectionTypes,
} from './sql/converter-types';

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const dbPath = path.join(app.getPath('userData'), 'sql.db');
if (!isDebug && !existsSync(dbPath)) {
  openSync(dbPath, 'w');
}
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(isDebug ? ':memory:' : dbPath);

db.serialize(() => {
  db.run(initDbVersion);
  db.run(initConnectionTypes);
  db.run(initDeviceTypes);
  db.run(initConverters);

  db.all(getDbVersion, (_err, rows) => {
    console.log(rows);
    if (rows.length === 0) {
      const stmtConverters = db.prepare(postConverters);
      stmtConverters.run(['device-1', 'tcp', '192.168.1.8:26']);
      stmtConverters.finalize();

      const stmtConnectionTypes = db.prepare(postConnectionTypes);
      stmtConnectionTypes.run('tcp');
      stmtConnectionTypes.finalize();

      const stmtDeviceTypes = db.prepare(postDeviceTypes);
      stmtDeviceTypes.run('dmm-5t-3');
      stmtDeviceTypes.run('lec5');
      stmtDeviceTypes.finalize();

      const stmtDbVersion = db.prepare(postDbVersion);
      stmtDbVersion.run([true, '0.1.0']);
      stmtDbVersion.finalize();
    }
  });
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('get-connection-types', async (event, _arg) => {
  db.all(getConnectionTypes, (err, rows) => {
    if (err) {
      return event.reply('get-connection-types', {
        err: 'Cannot get connection types',
      });
    }
    const data = rows.map(({ id, type }) => {
      return { id, value: type, label: type };
    });
    return event.reply('get-connection-types', data);
  });
});

ipcMain.on('get-device-types', async (event, _arg) => {
  db.all(getDeviceTypes, (err, rows) => {
    if (err) {
      return event.reply('get-device-types', {
        err: 'Cannot get device types',
      });
    }
    const data = rows.map(({ id, type }) => {
      return { id, value: type, label: type };
    });
    return event.reply('get-device-types', data);
  });
});

ipcMain.on('get-converters', async (event, _arg) => {
  db.all(getConverters, (err, rows) => {
    if (err) return event.reply('get-converters', { err });
    return event.reply('get-converters', rows);
  });
});

ipcMain.on('post-converters', async (event, arg) => {
  const { name, type, address } = arg[0];
  const stmt = db.prepare(postConverters);
  stmt.run([name, type, address], (err) => {
    return err
      ? event.reply('error', err)
      : event.reply('reload-converters', true);
  });
  stmt.finalize();
});

ipcMain.on('delete-converters', async (event, arg) => {
  const stmt = db.prepare(deleteConverters);
  stmt.run(arg, (err) => {
    return err
      ? event.reply('error', err)
      : event.reply('reload-converters', true);
  });
  stmt.finalize();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1524,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    db.close();
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
