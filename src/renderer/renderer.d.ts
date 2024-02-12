import { MonitorPayload } from '../apps/navigate-run-break/types';

export interface INavigateRunBreakAPI {
  resetMonitor: () => void;
  onUpdateMonitor: (callback: (payload: MonitorPayload) => void) => Electron.IpcRenderer;
  onNoticeToBreak: () => Electron.IpcRenderer;
}

declare global {
  interface Window {
    navigateRunBreakApi: INavigateRunBreakAPI;
  }
}