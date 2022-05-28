import { FC } from "react";

import styles from "./sortingStyles.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

export const SortingPage: FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.radioWrapper}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button sorting={Direction.Ascending} text={"По возрастанию"} />
          <Button sorting={Direction.Descending} text={"По убыванию"} />
        </div>
        <Button text={"Новый массив"} />
      </div>
      <ul className={styles.list}>
        <Column index={12} />
        <Column index={7} />
        <Column index={1} />
        <Column index={30} />
        <Column index={5} />
      </ul>
    </SolutionLayout>
  );
};
