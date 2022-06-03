import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

import styles from "./fibonacciStyles.module.css";

import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { getFibanacciArr, setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {
  const maxInputValue = 19;
  const [inputValue, setInputValue] = useState<number>();
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [inProcess, setInProcess] = useState(false);

  const getFibonacci = async (
    inputNumber: number,
    inputValueSetter: Dispatch<SetStateAction<number | undefined>>,
    numberSetter: Dispatch<SetStateAction<number[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    //очистка инпута
    inputValueSetter(0);
    //блокировка кнопки и ввода - лоадер
    processSetter(true);
    const resultFibonacciArr = [...getFibanacciArr(inputNumber)];
    const renderFibonacciArr: number[] = [];
    for (let el of resultFibonacciArr) {
      renderFibonacciArr.push(el);
      numberSetter([...renderFibonacciArr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    processSetter(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InputWrapper>
        <Input
          disabled={inProcess}
          placeholder="Введите число от 1 до 19 (включительно)"
          extraClass={styles.input}
          type="number"
          isLimitText={true}
          min={1}
          max={maxInputValue}
          maxLength={2}
          value={inputValue || ""}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setInputValue(Number(e.currentTarget.value))
          }
        />
        <Button
          text={"Рассчитать"}
          type="submit"
          onClick={(e) =>
            inputValue &&
            getFibonacci(inputValue, setInputValue, setNumbersArr, setInProcess)
          }
          isLoader={inProcess}
          disabled={inputValue ? inputValue > maxInputValue : true}
        />
      </InputWrapper>
      <ul className={styles.list}>
        {numbersArr.map((number, index) => {
          return (
            <li key={index}>
              <Circle letter={number.toString()} index={index} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
