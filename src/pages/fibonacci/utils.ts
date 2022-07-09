export const getFibonacciArr = (n: number): number[] => {
  if (n === 0) return [1];
  let resultArr: number[] = [0, 1];
  for (let i = 2; i <= n + 1; i++) {
    resultArr.push(resultArr[i - 2] + resultArr[i - 1]);
  }
  return resultArr.slice(1);
};
