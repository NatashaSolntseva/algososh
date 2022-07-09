import { FC, useEffect, useState } from "react";

import styles from "./sortingStyles.module.css";

import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { Direction } from "../../types/direction";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { ElementStates } from "../../types/element-states";
import { getRandomArr, setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { bubbleSortingAlgo, selectionSortingAlgo } from "./utils";

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

  //--------------------------------------------------------------------------------
  const renderAndWait = async (arr: IColumn[]) => {
    setInitialArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);
  };

  const sortingAndRender = async (
    sortingOption: "ascending" | "descending",
    sortingType: string
  ) => {
    // лочим кнопки и лоадер запускаем
    setInProсess(true);
    sortingOption === "ascending"
      ? setStatesList({ ...statesList, isAscending: true })
      : setStatesList({ ...statesList, isDescending: true });

    //выбором
    if (sortingType === "selection") {
      const arr = [...initialArr];
      arr.forEach((el) => (el.state = ElementStates.Default));
      let stepCounter = 1;
      while (
        stepCounter !==
        selectionSortingAlgo(sortingOption, arr).numberOfAlgoSteps
      ) {
        await renderAndWait(
          selectionSortingAlgo(sortingOption, arr, stepCounter).stepResArray
        );
        stepCounter++;
      }
    }
    // пузырек
    else {
      const arr = [...initialArr];
      arr.forEach((el) => (el.state = ElementStates.Default));
      let stepCounter = 1;
      while (
        stepCounter !== bubbleSortingAlgo(sortingOption, arr).numberOfAlgoSteps
      ) {
        await renderAndWait(
          bubbleSortingAlgo(sortingOption, arr, stepCounter).stepResArray
        );
        stepCounter++;
      }
    }
    // разлочим кнопки
    setInProсess(false);
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
                ? sortingAndRender("ascending", "selection")
                : sortingAndRender("ascending", "bubble")
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
                ? sortingAndRender("descending", "selection")
                : sortingAndRender("descending", "bubble")
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
