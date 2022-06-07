import React, { useState } from "react";

import styles from "./listStyles.module.css";

import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { ICircleElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { isConstructorDeclaration } from "typescript";

interface ILinkedList<T> {
  getSize: () => number;
}

class Node<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.size = 0;
    this.head = null;
  }

  getSize() {
    return this.size;
  }
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIdxValue, setInputIdxValue] = useState<number>();
  const [elementsArr, setElementsArr] = useState<ICircleElement[]>();
  const [inProсess, setInProсess] = useState(false);

  const addToTheHead = async () => {};

  const removeFromTheHead = async () => {};

  const addToTheTail = async () => {};

  const removeFromTheTail = async () => {};

  const addByIndex = async (index: number) => {};

  const removeByIndex = async (index: number) => {};

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.contentContainer}>
        <InputWrapper>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            isLimitText={true}
            min={1}
            maxLength={4}
            disabled={inProсess}
            value={inputValue || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setInputValue(e.currentTarget.value);
            }}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в head"
            type="button"
            onClick={() => addToTheHead()}
            disabled={!inputValue || inProсess}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTheTail()}
            disabled={!inputValue || inProсess}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromTheHead()}
            disabled={inProсess}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTheTail()}
            disabled={inProсess}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            disabled={inProсess}
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={inputIdxValue || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setInputIdxValue(Number(e.currentTarget.value))
            }
          />
          <Button
            extraClass={styles.buttonLage}
            text="Добавить по индексу"
            type="button"
            onClick={() => inputIdxValue && addByIndex(inputIdxValue)}
            disabled={!inputValue || !inputIdxValue || inProсess}
          />
          <Button
            extraClass={styles.buttonLage}
            text="Удалить по индексу"
            type="button"
            onClick={() => inputIdxValue && removeByIndex(inputIdxValue)}
            disabled={!inputIdxValue || inProсess}
          />
        </InputWrapper>
      </div>
      <ul className={styles.list}>
        {elementsArr?.map((char, index) => {
          return (
            <li key={index}>
              <Circle letter={char.char} state={char.state} index={index} />
              {index !== elementsArr.length - 1 && <ArrowIcon />}
              {char.adding && (
                <Circle isSmall={true} state={ElementStates.Changing} />
              )}
              {char.deleting && (
                <Circle isSmall={true} state={ElementStates.Changing} />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
