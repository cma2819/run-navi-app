type TimerState = 'Running' | 'Stopped';

export class Timer {

  private startUnixTimestamp = 0;
  private timeInMilliseconds = 0;
  private state: TimerState = 'Stopped';

  constructor() {}

  start = (now?: Date) => {
    this.startUnixTimestamp = now?.getTime() ?? Date.now();
    this.state = 'Running';
  };

  stop = () => {
    this.reset();
    this.state = 'Stopped';
  };

  reset = () => {
    this.startUnixTimestamp = 0;
    this.timeInMilliseconds = 0;
  };

  tick = (now?: Date) => {
    if (this.state === 'Stopped') {
      return;
    }
    const nowMs = now?.getTime() ?? Date.now();
    const diff = nowMs - this.startUnixTimestamp;
    this.timeInMilliseconds = Math.max(0, diff);
  };

  getTimeInMs = () => this.timeInMilliseconds;
}