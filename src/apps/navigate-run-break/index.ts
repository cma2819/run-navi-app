import LiveSplitClient from 'livesplit-client';
import log from 'electron-log/main';
import { Monitor } from './monitor';
import { BrowserWindow } from 'electron';
import { app, ipcMain } from 'electron/main';

let livesplit: LiveSplitClient;
let monitor: Monitor;

const connect = () => {
  try {
    livesplit.connect().then(() => {}).catch((err) => {
      console.log('error');
      log.warn('Failed to connect, try again to connect in 10 seconds.');
      return;
    });
  } catch (e) {
    log.error(e);
  }
};

export const initialize = async (window: BrowserWindow, host = '127.0.0.1', port = '16834') => {
  livesplit = new LiveSplitClient(`${host}:${port}`);
  monitor = new Monitor(livesplit, (data) => {
    window.webContents.send('update-monitor', data);
  });

  livesplit.on('connected', () => {
    log.info('Livesplit connected!');
  });
    
  livesplit.on('disconnected', () => {
    setTimeout(() => {
      connect();
    }, 10000);
  });
  
  connect();
};

app.whenReady().then(() => {
  ipcMain.on('reset-monitor', () => {
    monitor.reset(); 
  });
});
