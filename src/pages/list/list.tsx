import React, { useEffect, useMemo, useState } from "react";

import styles from "./listStyles.module.css";

import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { ICircleElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TLinkedListElementState = {
  isAddingToTheTail: boolean;
  isAddingToTheHead: boolean;
  isRemovingFromTheHead: boolean;
  isRemovingFromTheTail: boolean;
  isAddingByIndex: boolean;
  isRemovingByIndex: boolean;
};

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  getSize: () => number;
  addToTail: (el: T) => void;
  insertAtIndex: (el: T, index: number) => void;
  getNodeByIndex: (index: number) => T | null;
  removeFromIndex: (index: number) => T | null;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(initialState?: T[]) {
    this.size = 0;
    this.head = null;
    initialState?.forEach((el) => this.insertAtIndex(el, 0));
  }

  getSize() {
    return this.size;
  }

  addToTail(el: T) {
    let node = new Node(el);

    if (this.size === 0) {
      this.head = node;
    } else {
      let currentEl = this.head;
      while (currentEl && currentEl.next !== null) {
        currentEl = currentEl.next;
      }
      if (currentEl) {
        currentEl.next = new Node(el);
      }
    }
    this.size++;
  }

  insertAtIndex(el: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Введите верное значение индекса");
    } else {
      let node = new Node(el);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let currentEl = this.head;
        let currentIndex = 0;
        let prevEl = null;

        while (currentIndex < index && currentEl) {
          prevEl = currentEl;
          currentEl = currentEl.next;
          currentIndex++;
        }

        if (prevEl) {
          prevEl.next = node;
        }
        node.next = currentEl;
      }
      this.size++;
    }
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }
    let currentEl = this.head;
    let curruntIndex = 0;

    while (curruntIndex < index && currentEl) {
      currentEl = currentEl.next;
      curruntIndex++;
    }
    return currentEl ? currentEl.value : null;
  }

  removeFromIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let currentEl = this.head;

    if (index === 0 && currentEl) {
      this.head = currentEl.next;
    } else {
      let prevEl = null;
      let currentIndex = 0;

      while (currentIndex < index && currentEl) {
        prevEl = currentEl;
        currentEl = currentEl.next;
        currentIndex++;
      }

      if (prevEl && currentEl) {
        prevEl.next = currentEl.next;
      }
    }
    this.size--;
    return currentEl ? currentEl.value : null;
  }
}

export const ListPage: React.FC = () => {
  const maxListLength = 12;
  //для первой отрисовки списка
  const initialRenderArr = useMemo(() => ["0", "34", "8", "1"], []);
  const initialArrState: ICircleElement[] = useMemo(() => [], []);
  // экземпляр списка
  const linkedList = useMemo(
    () => new LinkedList<string>(initialRenderArr),
    [initialRenderArr]
  );

  useEffect(() => {
    initialRenderArr.forEach((el) => {
      initialArrState.push({
        char: el,
        state: ElementStates.Default,
      });
    });
    setElementsArr(initialArrState);
  }, [initialRenderArr, initialArrState]);

  const [inputValue, setInputValue] = useState<string>("");
  const [inputIdxValue, setInputIdxValue] = useState<number>();
  const [elementsArr, setElementsArr] = useState<ICircleElement[]>([]);
  const [statesList, setStatesList] = useState<TLinkedListElementState>({
    isAddingToTheTail: false,
    isAddingToTheHead: false,
    isRemovingFromTheHead: false,
    isRemovingFromTheTail: false,
    isAddingByIndex: false,
    isRemovingByIndex: false,
  });
  const inProcess = useMemo<boolean>(
    () => !!Object.values(statesList).find((el) => el),
    [statesList]
  );

  const addToTheHead = async () => {
    //лочим кнопки
    setStatesList({ ...statesList, isAddingToTheHead: true });

    const arr = [...elementsArr];
    // добавляем в список новую голову из инпута
    linkedList.insertAtIndex(inputValue, 0);
    //console.log("linkedList", linkedList);

    // подсвечиваем годову новую в маленьком кружке
    arr[0] = {
      ...arr[0],
      adding: true,
      extraCircle: {
        char: linkedList.getNodeByIndex(0) || "",
      },
    };
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //убираем кружок и добавляем новую голову в начало массива - зеленым
    arr[0] = {
      ...arr[0],
      adding: false,
      extraCircle: undefined,
    };
    arr.unshift({
      char: linkedList.getNodeByIndex(0) || "",
      state: ElementStates.Modified,
    });
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //убираем зеленую подсетку, на синюю
    arr[0].state = ElementStates.Default;
    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isAddingToTheHead: false });
    setInputValue("");
  };

  const addToTheTail = async () => {
    // лочим кнопки
    setStatesList({ ...statesList, isAddingToTheTail: true });
    const arr = [...elementsArr];

    //добавляем в хвост элемент инпута
    linkedList.addToTail(inputValue);
    //переставляем хвост, отрисовка розовых элементов - перебор
    const tailIndex = linkedList.getSize() - 1;

    // Добавить в хвость новый элемент (в розовый)

    // Изменить стейт хвоста (красим в синий)

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isAddingToTheTail: false });
    setInputValue("");
  };

  const removeFromTheHead = async () => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingFromTheHead: true });

    //сместить голову в нижний кружочек

    //удалить элемент, сдвинуть и подсветить новую голову

    //убрать в дефолтное состояние цвет головы

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isRemovingFromTheHead: false });
    setInputValue("");
  };

  const removeFromTheTail = async () => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingFromTheTail: true });

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isRemovingFromTheTail: false });
    setInputValue("");
  };

  const addByIndex = async (index: number) => {
    // лочим кнопки
    setStatesList({ ...statesList, isAddingByIndex: true });

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isAddingByIndex: false });
    setInputValue("");
    setInputIdxValue(undefined);
  };

  const removeByIndex = async (index: number) => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingByIndex: true });

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isRemovingByIndex: false });
    setInputValue("");
    setInputIdxValue(undefined);
  };

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
            disabled={inProcess}
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
            disabled={
              !inputValue || inProcess || elementsArr.length > maxListLength
            }
            isLoader={statesList.isAddingToTheHead}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTheTail()}
            disabled={!inputValue || inProcess}
            isLoader={statesList.isAddingToTheTail}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromTheHead()}
            disabled={inProcess}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTheTail()}
            disabled={inProcess}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            disabled={inProcess}
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
            disabled={!inputValue || !inputIdxValue || inProcess}
          />
          <Button
            extraClass={styles.buttonLage}
            text="Удалить по индексу"
            type="button"
            onClick={() => inputIdxValue && removeByIndex(inputIdxValue)}
            disabled={!inputIdxValue || inProcess}
          />
        </InputWrapper>
      </div>
      <ul className={styles.list}>
        {elementsArr.map((char, index) => {
          return (
            <li key={index} className={styles.listElementsWrapper}>
              <Circle
                letter={char.char}
                state={char.state}
                index={index}
                head={
                  index === 0 && !char.adding && !char.deleting ? "head" : ""
                }
                tail={
                  index === elementsArr.length - 1 &&
                  !char.adding &&
                  !char.deleting
                    ? "tail"
                    : ""
                }
              />
              {index !== elementsArr.length - 1 && <ArrowIcon />}
              {char.adding && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  extraClass={styles.topCirlce}
                />
              )}
              {char.deleting && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  extraClass={styles.buttomCircle}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
