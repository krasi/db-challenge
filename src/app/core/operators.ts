import { delay, MonoTypeOperatorFunction, pipe } from 'rxjs';

// simulates network load for between 0 and 4s
export function simulateNetwork<T>(): MonoTypeOperatorFunction<T> {
  return pipe(delay(Math.random() * 4000));
}
