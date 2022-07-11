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
import { getRandomChar, setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./utils";

type TLinkedListElementState = {
  isAddingToTheTail: boolean;
  isAddingToTheHead: boolean;
  isRemovingFromTheHead: boolean;
  isRemovingFromTheTail: boolean;
  isAddingByIndex: boolean;
  isRemovingByIndex: boolean;
};

export const ListPage: React.FC = () => {
  const maxListLength = 12;
  const minListLength = 6;
  //для первой отрисовки списка
  const initialRenderArr = useMemo(
    () => Array.from({ length: minListLength }, () => `${getRandomChar()}`),
    []
  );
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
    setElementsArr(initialArrState.reverse());
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
    linkedList.prepend(inputValue);

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
    linkedList.append(inputValue);
    //получить индекс хвоста
    const newTailIndex = linkedList.sizeList - 1;

    //цикл передвижение маленького кружка
    for (let i = 0; i <= newTailIndex; i++) {
      arr[i] = {
        ...arr[i],
        adding: true,
        extraCircle: {
          char: linkedList.getNodeByIndex(newTailIndex) || "",
        },
      };
      if (i > 0) {
        arr[i - 1] = {
          ...arr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      //рендер
      setElementsArr([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    // Добавить в хвость новый элемент (зеленый)
    arr[arr.length - 1] = {
      ...arr[arr.length],
      char: linkedList.getNodeByIndex(newTailIndex) || "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    // Изменить стейт всех элементов на дефолтный
    arr.forEach((el) => (el.state = ElementStates.Default));
    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isAddingToTheTail: false });
    setInputValue("");
  };

  const removeFromTheHead = async () => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingFromTheHead: true });
    const arr = [...elementsArr];

    //сместить голову в нижний кружочек
    arr[0] = {
      ...arr[0],
      char: "",
      deleting: true,
      extraCircle: { char: linkedList.deleteHead() || "" },
    };

    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //удалить первый элемент, сдвинуть и подсветить новую голову зеленым
    arr.shift(); //удалить первый элемент
    arr[0].state = ElementStates.Modified;
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //убрать в дефолтное состояние цвет головы
    arr[0].state = ElementStates.Default;

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isRemovingFromTheHead: false });
    setInputValue("");
  };

  const removeFromTheTail = async () => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingFromTheTail: true });

    const arr = [...elementsArr];
    const { length } = arr;
    // сносим значение хвоста в нижний круг
    arr[length - 1] = {
      ...arr[length - 1],
      char: "",
      deleting: true,
      extraCircle: {
        char: linkedList.deleteTail() || "",
      },
    };
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //удаляем последний элемент и выделяем новое значение хвоста
    arr.pop(); //удаляем последний элемент
    arr[length - 2].state = ElementStates.Modified;
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //убрать в дефолтное состояние цвет хвоста
    arr[length - 2].state = ElementStates.Default;

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isRemovingFromTheTail: false });
    setInputValue("");
  };

  const addByIndex = async (index: number) => {
    // лочим кнопки
    setStatesList({ ...statesList, isAddingByIndex: true });

    const arr = [...elementsArr];

    //добавляем в список новый элемент по индексу
    linkedList.addByIndex(inputValue, index);

    //цикл передвижение маленького кружка
    for (let i = 0; i <= index; i++) {
      arr[i] = {
        ...arr[i],
        adding: true,
        extraCircle: {
          char: linkedList.getNodeByIndex(index) || "",
        },
      };
      if (i > 0) {
        arr[i - 1] = {
          ...arr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      //рендер
      setElementsArr([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    // добавляем элемент, верхний круг убираем
    arr[index] = {
      ...arr[index],
      adding: false,
      extraCircle: undefined,
    };
    arr.splice(index, 0, {
      char: linkedList.getNodeByIndex(index) || "",
      state: ElementStates.Modified,
    });
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    // Изменить стейт всех элементов на дефолтный
    arr.forEach((el) => (el.state = ElementStates.Default));

    //разлочим кнопки, чистим инпут
    setStatesList({ ...statesList, isAddingByIndex: false });
    setInputValue("");
    setInputIdxValue(undefined);
  };

  const removeByIndex = async (index: number) => {
    // лочим кнопки
    setStatesList({ ...statesList, isRemovingByIndex: true });

    const arr = [...elementsArr];

    //перебор элементов до нужного и подсветка розовым
    for (let i = 0; i <= index; i++) {
      arr[i].state = ElementStates.Changing;
      //рендер
      if (i === index) {
        arr[i].withoutArrow = true; //чтобы стрелка после удаляемого элемента не была розовой
      }
      setElementsArr([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    //смещаем к нижний круг удаляемый элемент
    arr[index] = {
      ...arr[index],
      char: "",
      deleting: true,
      extraCircle: {
        char: linkedList.deleteByIndex(index) || "",
      },
    };
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //удаляем элемент
    arr.splice(index, 1);
    //рендер
    setElementsArr([...arr]);
    await setDelay(SHORT_DELAY_IN_MS);

    // Изменить стейт всех элементов на дефолтный
    arr.forEach((el) => (el.state = ElementStates.Default));

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
            name="value"
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
            disabled={inProcess || elementsArr.length === 1}
            isLoader={statesList.isRemovingFromTheHead}
          />
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTheTail()}
            disabled={inProcess || elementsArr.length === 1}
            isLoader={statesList.isRemovingFromTheTail}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="index"
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
            disabled={
              !inputValue ||
              !inputIdxValue ||
              inProcess ||
              inputIdxValue > elementsArr.length - 1 ||
              elementsArr.length > maxListLength
            }
            isLoader={statesList.isAddingByIndex}
          />
          <Button
            extraClass={styles.buttonLage}
            text="Удалить по индексу"
            type="button"
            onClick={() => inputIdxValue && removeByIndex(inputIdxValue)}
            disabled={
              !inputIdxValue ||
              inProcess ||
              inputIdxValue > elementsArr.length - 1 ||
              elementsArr.length === 1
            }
            isLoader={statesList.isRemovingByIndex}
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
              {index !== elementsArr.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === ElementStates.Changing && !char.withoutArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
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
