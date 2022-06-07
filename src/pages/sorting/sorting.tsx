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

    for (let i = 0; i < arr.length; i++) {
      console.log("i", i);
      console.log("arr i", arr);
      for (let j = 0; j < arr.length - i - 1; j++) {
        console.log("j", j);
        console.log("arr j", arr);
        //выделяем элементы, которые будем сравнивать
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
        if (
          (sortingOption === "ascending" ? arr[j].number : arr[j + 1].number) >
          (sortingOption === "ascending" ? arr[j + 1].number : arr[j].number)
        ) {
          initialArrSetter([...arr]);
          swapArrElements(arr, j, j + 1);
          await setDelay(SHORT_DELAY_IN_MS);
        }
        //убираем розовую подсветку после сравнения элементов и возможного свопа
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        //красим в зеленый последний во внутреннем цикле и в итоге отсортированный
        if (j === arr.length - i - 2) {
          arr[j + 1].state = ElementStates.Modified;
        }
      }
      //прошли весь внешний цикл и красим оставшийся элемент в зеленый
      if (i === arr.length - 1) {
        arr[0].state = ElementStates.Modified;
      }
    }
    initialArrSetter([...arr]);
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
    arr.forEach((el) => (el.state = ElementStates.Default));
    console.log("initial arr", arr);

    for (let i = 0; i < arr.length - 1; i++) {
      let swapInd = i;
      console.log("arr в первом цикле", arr);
      // await setDelay(SHORT_DELAY_IN_MS);

      for (let j = i + 1; j < arr.length; j++) {
        console.log("swapInd i", swapInd);
        console.log("arr[swapInd] розовым", arr[swapInd].number);
        console.log("j", j);
        console.log("arr[j] розовым", arr[j].number);
        //подсвечиваем розовым два сравниваемых элемента
        arr[swapInd].state = ElementStates.Changing;
        await setDelay(SHORT_DELAY_IN_MS);
        arr[j].state = ElementStates.Changing;
        if (
          (sortingOption === "ascending"
            ? arr[swapInd].number
            : arr[j].number) >
          (sortingOption === "ascending" ? arr[j].number : arr[swapInd].number)
        ) {
          swapInd = j;
          console.log("меняем в условии swapInd с i  на j", swapInd);
          initialArrSetter([...arr]);
          console.log("arr in j", arr);
          await setDelay(SHORT_DELAY_IN_MS);
        } else {
          //если нет, то убираем выделение и выделяем слудующий

          arr[j].state = ElementStates.Default;
          console.log(
            "если arr[swapInd].number < arr[j].number arr[j] в синий не меняем",
            arr[j].number
          );
        }
        console.log("swapInd после условия в цикле j", swapInd);
        console.log("arr[swapInd] зеленым", arr[swapInd].number);
        arr[swapInd].state = ElementStates.Modified;
        /*if (i === arr.length - 2 || j === arr.length - 1) {
          arr[arr.length - 1].state = ElementStates.Modified;
        }*/
      }

      if (swapInd !== i) {
        swapArrElements(arr, swapInd, i);
        initialArrSetter([...arr]);
        console.log("arr in if", arr);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }
    initialArrSetter([...arr]);
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
