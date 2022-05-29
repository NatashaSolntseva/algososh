import { FC } from "react";

import styles from "./queueStyles.module.css";

import InputWrapper from "../input-wrapper/input-wrapper";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <InputWrapper>
        <Input
          extraClass={styles.input}
          placeholder="Введите значение"
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
          <Circle letter={"5"} index={0} head={"head"} />
        </li>
        <li>
          <Circle letter={"3"} index={1} tail={"tail"} />
        </li>
        <li>
          <Circle letter={"2"} index={2} />
        </li>
        <li>
          <Circle index={3} />
        </li>
        <li>
          <Circle index={4} />
        </li>
        <li>
          <Circle index={5} />
        </li>
        <li>
          <Circle index={6} />
        </li>
      </ul>
    </SolutionLayout>
  );
};
