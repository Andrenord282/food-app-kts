import { TLocalStore } from 'utils';

export default class IntervalStore implements TLocalStore {
  private _timeout: null | NodeJS.Timeout = null;
  private _callback: null | (() => void) = null;

  private _tick(interval: number) {
    this._timeout = setTimeout(() => {
      this._callback?.();
      this._tick(interval);
    }, interval);
  }

  private _initTimeout(timer: number) {
    this._timeout = setTimeout(() => {
      this._callback?.();
    }, timer);
  }

  private _clear() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  startTimeout(callback: () => void, timer: number) {
    if (this._callback !== callback) {
      this._clear();
      this._callback = callback;
      this._initTimeout(timer);
    }
  }

  startInterval(callback: () => void, interval: number) {
    if (this._callback !== callback) {
      this._clear();
      this._callback = callback;
      this._tick(interval);
    }
  }

  stop() {
    this._clear();
    this._callback = null;
  }

  destroy = (): void => {
    this.stop();
  };
}
