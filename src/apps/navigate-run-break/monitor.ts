import LiveSplitClient from 'livesplit-client';
import { Timer } from './timer';
import { MonitorPayload } from './types';

type NavigationMeta = {
  breakingPerRunning: number;
  thresholdToNotice: number;
};

export class Monitor {
  private meta: NavigationMeta;
  private runningInSeconds: number = 0;
  private breakingInSeconds: number = 0;
  private isRunning: boolean = false;

  private runningTimer: Timer;
  private breakingTimer: Timer;
    
  constructor(
    private readonly livesplit: LiveSplitClient,
    private readonly callbackOnStateChanged: (args: MonitorPayload) => void,
  ) {
    this.meta = {breakingPerRunning: 5, thresholdToNotice: 30};
    this.runningTimer = new Timer();
    this.breakingTimer = new Timer();

    setInterval(() => {
      this.tick();
    }, 200);
  }

  currentRunning = () => {
    return this.runningInSeconds + Math.floor(this.runningTimer.getTimeInMs() / 1000);
  };

  currentBreaking = () => {
    return this.breakingInSeconds + Math.floor(this.breakingTimer.getTimeInMs() / 1000);
  };

  getShouldBreakInSeconds = () => {
    const needToBreak = Math.floor(this.currentRunning() / this.meta.breakingPerRunning);
    return Math.max(0, needToBreak - this.currentBreaking());
  };

  sendsToCallback = () => {
    this.callbackOnStateChanged({
      running: this.currentRunning(),
      breaking: this.currentBreaking(),
      shouldBreak: this.getShouldBreakInSeconds(),
      threshold: this.meta.thresholdToNotice,
      isRunning: this.isRunning,
    });
  };

  reset = () => {
    this.runningInSeconds = 0;
    this.breakingInSeconds = 0;
    this.sendsToCallback();
  };

  private tick = async () => {
    try {
      const livesplitPhase = await this.livesplit.getCurrentTimerPhase();
      const nowIsRunning = livesplitPhase === 'Running';
      const now = new Date();
      if (this.isRunning !== nowIsRunning) {
        if (nowIsRunning) {
          const brokeInMs = this.breakingTimer.getTimeInMs();
          this.breakingTimer.stop();
          this.runningTimer.start(now);
          this.breakingInSeconds += Math.floor(brokeInMs / 1000);
        } else {
          const ranInMs = this.runningTimer.getTimeInMs();
          this.runningTimer.stop();
          this.breakingTimer.start(now);
          this.runningInSeconds += Math.floor(ranInMs / 1000);
        }
        this.isRunning = nowIsRunning;
      }
      this.runningTimer.tick(now);
      this.breakingTimer.tick(now);
      this.sendsToCallback();
    } catch {
      return;
    }
  };
}