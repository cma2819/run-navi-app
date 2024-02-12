type LiveSplitEventMap = {
  connected: [],
  disconnected: [],
  error: [any],
  data: [string],
};

type LiveSplitTimerPhase = 'NotRunning' | 'Running' | 'Ended' | 'Paused';

declare module 'livesplit-client' {
  declare class LiveSplitClient {
    constructor(address: string);
    connected: readonly boolean;
    connect: () => Promise<boolean>;
    disconnect: () => Promise<boolean>;
    on: <EName extends keyof LiveSplitEventMap>(event: EName, listener: (...args: LiveSplitEventMap[EName]) => void) => void;
    on: (event: 'disconnected', listener: () => void) => void;
    on: (event: 'error', listener: (err: any) => void) => void;
    on: (event: 'data', listener: (data: string) => void) => void;
    getCurrentTimerPhase: () => Promise<LiveSplitTimerPhase>;
  };

  export = LiveSplitClient;
}