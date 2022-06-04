import { Dispatch, FC, SetStateAction, useState } from "react";

import styles from "./sortingStyles.module.css";

import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { Direction } from "../../types/direction";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { ElementStates } from "../../types/element-states";
import { getRandomArr, setDelay, swapArrElements } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export interface IColumn {
  number: number;
  state: ElementStates;
}

export const SortingPage: FC = () => {
  const [sortingType, setSortingType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<IColumn>>([]);
  const [inProсess, setInProсess] = useState(false);

  const generateNewArray = () => {
    setInitialArr([...getRandomArr(3, 17, 100)]);
  };

  const bubbleSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    processSetter(true);
    const arr = [...initialArr];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
        if (arr[j].number > arr[j + 1].number) {
          initialArrSetter([...arr]);
          swapArrElements(arr, j, j + 1);
        }
      }
    }
    //initialArrSetter([...arr]);
    processSetter(false);
  };

  const selectionSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    processSetter(true);
    const arr = [...initialArr];
    console.log("arr", arr);
    for (let i = 0; i < arr.length - 1; i++) {
      let swapInd = i;
      console.log("arr", arr);
      console.log("swapInd i", swapInd);
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[swapInd].number < arr[j].number) {
          swapInd = j;
          console.log("swapInd j", swapInd);
          initialArrSetter([...arr]);
          console.log("arr in j", arr);
          await setDelay(SHORT_DELAY_IN_MS);
        }
      }
      if (swapInd !== i) {
        swapArrElements(arr, swapInd, i);
        initialArrSetter([...arr]);
        console.log("arr in if", arr);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }

    processSetter(false);
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
              sortingType === "selection"
                ? selectionSorting(
                    "ascending",
                    initialArr,
                    setInitialArr,
                    setInProсess
                  )
                : bubbleSorting(
                    "ascending",
                    initialArr,
                    setInitialArr,
                    setInProсess
                  )
            }
            isLoader={inProсess}
          />
          <Button
            sorting={Direction.Descending}
            type="submit"
            text={"По убыванию"}
            onClick={() =>
              sortingType === "selection"
                ? selectionSorting(
                    "descending",
                    initialArr,
                    setInitialArr,
                    setInProсess
                  )
                : bubbleSorting(
                    "descending",
                    initialArr,
                    setInitialArr,
                    setInProсess
                  )
            }
            isLoader={inProсess}
          />
        </div>
        <Button
          text={"Новый массив"}
          type="submit"
          onClick={() => generateNewArray()}
          isLoader={inProсess}
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
