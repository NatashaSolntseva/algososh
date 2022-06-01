import { DELAY_IN_MS } from "../constants/delays";
import { ISimbol } from "../pages/string/string";

export const setDelay = (delay: number = DELAY_IN_MS): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const swapArrElements = (
  arr: ISimbol[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
