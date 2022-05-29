import { FC } from "react";

import styles from "./sortingStyles.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import InputWrapper from "../input-wrapper/input-wrapper";

export const SortingPage: FC = () => {
  const generateNewArray = () => {
    alert("generateNewArray");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <InputWrapper>
        <div className={styles.radioWrapper}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            sorting={Direction.Ascending}
            type="submit"
            text={"По возрастанию"}
            onClick={() => null}
          />
          <Button
            sorting={Direction.Descending}
            type="submit"
            text={"По убыванию"}
            onClick={() => null}
          />
        </div>
        <Button
          text={"Новый массив"}
          type="submit"
          onClick={() => generateNewArray()}
        />
      </InputWrapper>
      <ul className={styles.list}>
        <Column index={2} />
        <Column index={34} />
        <Column index={17} />
        <Column index={100} />
        <Column index={50} />
      </ul>
    </SolutionLayout>
  );
};
