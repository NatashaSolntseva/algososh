import React from "react";

import styles from "./stackStyles.module.css";

import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <InputWrapper>
        <Input
          extraClass={styles.input}
          placeholder="Введите текст"
          isLimitText={true}
          maxLength={4}
        />
        <Button text="Добавить" type="button" onClick={() => null} />
        <Button text="Удалить" type="button" onClick={() => null} />
        <Button
          extraClass={styles.resetButton}
          text="Очистить"
          type="button"
          onClick={() => null}
        />
      </InputWrapper>
      <ul className={styles.list}>
        <li>
          <Circle letter={"A"} index={0} />
        </li>
        <li>
          <Circle letter={"A"} index={1} />
        </li>
        <li>
          <Circle letter={"A"} index={2} />
        </li>
        <li>
          <Circle letter={"A"} index={3} />
        </li>
      </ul>
    </SolutionLayout>
  );
};
