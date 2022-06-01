import { FC } from "react";

import styles from "./fibonacciStyles.module.css";

import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import InputWrapper from "../../components/input-wrapper/input-wrapper";

export const FibonacciPage: FC = () => {
  //перестановка по нажатию на "Развернуть"
  const handleClick = () => {
    alert("fibonacci");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InputWrapper>
        <Input
          placeholder="Введите число"
          extraClass={styles.input}
          type={"number"}
          isLimitText={true}
          max={19}
        />
        <Button text={"Рассчитать"} onClick={handleClick} />
      </InputWrapper>
      <ul className={styles.list}>
        <li>
          <Circle letter={"1"} />
        </li>
        <li>
          <Circle letter={"1"} />
        </li>
        <li>
          <Circle letter={"2"} />
        </li>
        <li>
          <Circle letter={"3"} />
        </li>
        <li>
          <Circle letter={"5"} />
        </li>
        <li>
          <Circle letter={"8"} />
        </li>
        <li>
          <Circle letter={"13"} />
        </li>
        <li>
          <Circle letter={"21"} />
        </li>
        <li>
          <Circle letter={"34"} />
        </li>
        <li>
          <Circle letter={"55"} />
        </li>
        <li>
          <Circle letter={"89"} />
        </li>
        <li>
          <Circle letter={"144"} />
        </li>
        <li>
          <Circle letter={"233"} />
        </li>
        <li>
          <Circle letter={"377"} />
        </li>
        <li>
          <Circle letter={"610"} />
        </li>
        <li>
          <Circle letter={"987"} />
        </li>
        <li>
          <Circle letter={"1597"} />
        </li>
        <li>
          <Circle letter={"2584"} />
        </li>
        <li>
          <Circle letter={"4181"} />
        </li>
        <li>
          <Circle letter={"6765"} index={19} />
        </li>
      </ul>
    </SolutionLayout>
  );
};
