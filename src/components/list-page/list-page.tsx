import React from "react";

import styles from "./listStyles.module.css";

import InputWrapper from "../input-wrapper/input-wrapper";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.contentContainer}>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в head"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            type="button"
            onClick={() => null}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
          />
          <Button
            extraClass={styles.buttonLage}
            text="Добавить по индексу"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.buttonLage}
            text="Удалить по индексу"
            type="button"
            onClick={() => null}
          />
        </InputWrapper>
      </div>
      <ul className={styles.list}>
        <li className={styles.listElement}>
          <Circle letter={"0"} index={0} head={"head"} />
          <ArrowIcon />
        </li>
        <li className={styles.listElement}>
          <Circle letter={"0"} index={1} />
          <ArrowIcon />
        </li>
        <li className={styles.listElement}>
          <Circle letter={"0"} index={2} />
          <ArrowIcon />
        </li>
        <li className={styles.listElement}>
          <Circle letter={"0"} index={3} tail={"tail"} />
        </li>
      </ul>
    </SolutionLayout>
  );
};
