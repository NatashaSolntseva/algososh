import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

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

type TSortingState = {
  isAscending: boolean;
  isDescending: boolean;
  isInProсess: boolean;
};

export const SortingPage: FC = () => {
  const [sortingType, setSortingType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<IColumn>>([]);
  const [inProсess, setInProсess] = useState(false);
  const [statesList, setStatesList] = useState<TSortingState>({
    isAscending: false,
    isDescending: false,
    isInProсess: false,
  });

  const generateNewArray = () => {
    setInitialArr([...getRandomArr(3, 17, 100)]);
  };

  // первая отрисовка массива
  useEffect(() => {
    generateNewArray();
  }, []);

  const bubbleSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    //лочим кнопки и лоудеры
    sortingOption === "ascending"
      ? setStatesList({ ...statesList, isAscending: true })
      : setStatesList({ ...statesList, isDescending: true });
    processSetter(true);

    //копия массива
    const arr = [...initialArr];
    arr.forEach((el) => (el.state = ElementStates.Default));

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        //выбираем 2 элемента, которые будем сравнивать, подсвечиваем розовым
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;

        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        if (
          (sortingOption === "ascending" ? arr[j].number : arr[j + 1].number) >
          (sortingOption === "ascending" ? arr[j + 1].number : arr[j].number)
        ) {
          //меняем элементы местами
          swapArrElements(arr, j, j + 1);

          //рендер
          initialArrSetter([...arr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
        //убираем розовую подсветку после сравнения элементов и возможного свопа
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        //красим в зеленый последний во внутреннем цикле и в итоге отсортированный
        if (j === arr.length - i - 2) {
          arr[j + 1].state = ElementStates.Modified;
        }
        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }
    arr.forEach((el) => (el.state = ElementStates.Modified));
    //разлочимлочим кнопки и лоудеры
    processSetter(false);
    sortingOption === "ascending"
      ? setStatesList({ ...statesList, isAscending: false })
      : setStatesList({ ...statesList, isDescending: false });
  };

  const selectionSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    //лочим кнопки и лоудеры
    sortingOption === "ascending"
      ? setStatesList({ ...statesList, isAscending: true })
      : setStatesList({ ...statesList, isDescending: true });
    processSetter(true);

    //создаем копию массива
    const arr = [...initialArr];
    arr.forEach((el) => (el.state = ElementStates.Default));

    for (let i = 0; i < arr.length - 1; i++) {
      let swapInd = i;
      //подсвечиваем розовым элемент
      arr[swapInd].state = ElementStates.Changing;

      for (let j = i + 1; j < arr.length; j++) {
        //подсвечиваем розовым кандидата на перестановку
        arr[j].state = ElementStates.Changing;
        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        //сравниваем элементы
        if (
          (sortingOption === "ascending"
            ? arr[swapInd].number
            : arr[j].number) >
          (sortingOption === "ascending" ? arr[j].number : arr[swapInd].number)
        ) {
          //если кандидат меньше (больше) текущего то мы нашли второго кандидата на перестановку
          // а первого кандидата оставляем розовым (если это iый элемент) или делаем дефолтным
          arr[swapInd].state =
            i === swapInd ? ElementStates.Changing : ElementStates.Default;

          swapInd = j;

          //рендер
          initialArrSetter([...arr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
        // снимаем выделение с просмотренных кандидатов
        if (j !== swapInd) {
          arr[j].state = ElementStates.Default;
          //рендер
          initialArrSetter([...arr]);
          await setDelay(SHORT_DELAY_IN_MS);
        }
      }
      // если сортируемый элемент является экстремумом, то делаем его зеленым
      if (i === swapInd) {
        arr[i].state = ElementStates.Modified;

        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
      } else {
        //в противном случае переставляем
        swapArrElements(arr, swapInd, i);
        arr[i].state = ElementStates.Modified;
        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
        arr[swapInd].state = ElementStates.Default;

        //рендер
        initialArrSetter([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
      }
    }
    arr.forEach((el) => (el.state = ElementStates.Modified));
    //разлочим кнопки и лоудеры
    processSetter(false);
    sortingOption === "ascending"
      ? setStatesList({ ...statesList, isAscending: false })
      : setStatesList({ ...statesList, isDescending: false });
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
            isLoader={statesList.isAscending}
            disabled={statesList.isDescending}
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
            isLoader={statesList.isDescending}
            disabled={statesList.isAscending}
          />
        </div>
        <Button
          text={"Новый массив"}
          type="submit"
          onClick={() => generateNewArray()}
          disabled={inProсess}
          isLoader={false}
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
