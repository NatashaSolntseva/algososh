import { FC, useState } from "react";

import styles from "./sortingStyles.module.css";

import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { Direction } from "../../types/direction";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { ElementStates } from "../../types/element-states";

interface IColumn {
  number: number;
  state: ElementStates;
}

export const SortingPage: FC = () => {
  const [sortingType, setSortingType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<IColumn>>([
    { number: 2, state: ElementStates.Default },
    { number: 34, state: ElementStates.Default },
    { number: 17, state: ElementStates.Default },
    { number: 100, state: ElementStates.Default },
    { number: 50, state: ElementStates.Default },
  ]);

  const generateNewArray = () => {
    alert("generateNewArray");
  };

  const bubbleSorting = () => {
    alert("bubble");
  };

  const selectionSorting = () => {
    alert("selection");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <InputWrapper>
        <div className={styles.radioWrapper}>
          <RadioInput
            label="Выбор"
            value="selection"
            onChange={() => setSortingType("selection")}
            checked={sortingType === "selection"}
          />
          <RadioInput
            label="Пузырёк"
            value="bubble"
            onChange={() => setSortingType("bubble")}
            checked={sortingType === "bubble"}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            sorting={Direction.Ascending}
            type="submit"
            text={"По возрастанию"}
            onClick={() =>
              sortingType === "selection" ? selectionSorting() : bubbleSorting()
            }
          />
          <Button
            sorting={Direction.Descending}
            type="submit"
            text={"По убыванию"}
            onClick={() =>
              sortingType === "selection" ? selectionSorting() : bubbleSorting()
            }
          />
        </div>
        <Button
          text={"Новый массив"}
          type="submit"
          onClick={() => generateNewArray()}
        />
      </InputWrapper>
      <ul className={styles.list}>
        {initialArr &&
          initialArr.map((el, index) => {
            return (
              <li key={index}>
                <Column index={el.number} state={el.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
