import { FC, useState, FormEvent, useMemo } from "react";

import styles from "./stackStyles.module.css";

import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ICircleElement } from "../../types/types";

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  getSize = () => this.container.length;

  clear = () => (this.container.length = 0);
}

export const StackPage: FC = () => {
  const stack = useMemo(() => new Stack<string>(), []);

  const [inputValue, setInputValue] = useState<string>("");
  const [elementsArr, setElementsArr] = useState<ICircleElement[]>([]);
  const [isPushing, setIsPushing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const clear = () => {
    stack.clear();
    setElementsArr([]);
  };

  const pushElement = async () => {
    //лочим кнопки
    setIsPushing(true);
    //сохраняем новый стек
    stack.push(inputValue);
    console.log("stack", stack);
    setInputValue("");
    //сбрасываем все настройки цвета, топ в стейте
    elementsArr.forEach((el) => {
      el.state = ElementStates.Default;
      el.head = "";
    });
    // достать последний запушеный элемент из стека и добавить его в стейт
    const pushedElement = stack.peak();
    elementsArr.push({
      char: pushedElement ? pushedElement : "",
      state: ElementStates.Default,
    });
    //Изменить стейт головы и сделать отментку top, подсветка розовым на время задержки
    elementsArr[elementsArr.length - 1].head = "top";
    elementsArr[elementsArr.length - 1].state = ElementStates.Changing;
    setElementsArr([...elementsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    elementsArr[elementsArr.length - 1].state = ElementStates.Default;
    setElementsArr([...elementsArr]);
    //разблокируем кнопки
    setIsPushing(false);
  };

  const popElement = async () => {
    //лочим кнопки
    setIsPopping(true);
    //удаляем элемент из стэка
    stack.pop();
    console.log("stack", stack);
    console.log("stack размер", stack.getSize());
    // проверка на пустоту стэка
    if (stack.getSize()) {
      elementsArr.pop();
      //Изменить стейт головы и сделать отментку top
      elementsArr[elementsArr.length - 1].head = "top";
      elementsArr[elementsArr.length - 1].state = ElementStates.Changing;
      setElementsArr([...elementsArr]);
    } else {
      setElementsArr([]);
    }
    //разблокируем кнопки
    setIsPopping(false);
  };

  return (
    <SolutionLayout title="Стек">
      <InputWrapper>
        <Input
          extraClass={styles.input}
          placeholder="Введите текст"
          isLimitText={true}
          min={1}
          maxLength={4}
          value={inputValue || ""}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          disabled={isPushing || isPopping}
        />
        <Button
          text="Добавить"
          type="button"
          onClick={() => pushElement()}
          isLoader={isPushing}
          disabled={!inputValue || isPopping || elementsArr.length > 12}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={() => popElement()}
          isLoader={isPopping}
          disabled={!elementsArr.length || isPushing}
        />
        <Button
          extraClass={styles.resetButton}
          text="Очистить"
          type="button"
          disabled={!elementsArr.length || isPopping || isPushing}
          onClick={() => clear()}
        />
      </InputWrapper>
      <ul className={styles.list}>
        {elementsArr.map((char, index) => {
          return (
            <li key={index}>
              <Circle
                head={char.head}
                state={char.state}
                index={index}
                letter={char.char}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
