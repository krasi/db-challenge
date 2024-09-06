import { delay, MonoTypeOperatorFunction, pipe } from 'rxjs';

// simulates network load for between 0 and 2s
export function simulateNetwork<T>(max = 2000): MonoTypeOperatorFunction<T> {
  return pipe(delay(Math.random() * max));
}
