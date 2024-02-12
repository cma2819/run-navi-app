import {contextBridge, ipcRenderer} from 'electron/renderer';
import { MonitorPayload } from '../apps/navigate-run-break/types';

contextBridge.exposeInMainWorld('navigateRunBreakApi', {
  resetMonitor: () => ipcRenderer.send('reset-monitor'),
  onUpdateMonitor: (callback: (payload: MonitorPayload) => void) => ipcRenderer.on('update-monitor', (_event, value) => callback(value)),
  onNoticeToBreak: (callback: () => void) => ipcRenderer.on('notice-to-break', () => callback()),
});