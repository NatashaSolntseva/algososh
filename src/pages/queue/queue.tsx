import { FC, useState, FormEvent, useMemo } from "react";

import styles from "./queueStyles.module.css";

import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ICircleElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Queue from "./utils";

export const QueuePage: FC = () => {
  //настройка первоначального рендера
  const maxRenderArrLength = 7;

  const initialArrState: ICircleElement[] = Array.from(
    { length: maxRenderArrLength },
    () => ({ char: "", state: ElementStates.Default })
  );

  const [inputValue, setInputValue] = useState<string>("");
  const [elementsArr, setElementsArr] =
    useState<ICircleElement[]>(initialArrState);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const queue = useMemo(() => new Queue<string>(maxRenderArrLength), []);

  const clear = () => {
    queue.clear();
    setElementsArr([...initialArrState]);
  };

  const enqueue = async () => {
    setIsAdding(true);
    queue.enqueue(inputValue);
    setInputValue("");
    const head = queue.getHead();
    const tail = queue.getTail();
    //устанавливаем голову
    elementsArr[head.index].char = head.value;
    elementsArr[head.index].head = "head";
    //убираем старый хвост
    if (tail.index > 0) elementsArr[tail.index - 1].tail = "";
    // новый хвост
    elementsArr[tail.index].char = tail.value;
    elementsArr[tail.index].tail = "tail";
    //розовая подстветка
    elementsArr[tail.index].state = ElementStates.Changing;

    await setDelay(SHORT_DELAY_IN_MS);
    elementsArr[tail.index].state = ElementStates.Default;
    setIsAdding(false);
  };

  const dequeue = async () => {
    setIsDeleting(true);
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) {
      clear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      elementsArr[head.index - 1].state = ElementStates.Changing;
      await setDelay(SHORT_DELAY_IN_MS);
      elementsArr[head.index - 1].state = ElementStates.Default;
      if (head.index > 0) {
        elementsArr[head.index - 1].head = "";
        elementsArr[head.index - 1].char = "";
      }
      elementsArr[head.index].head = "head";
      elementsArr[head.index].char = head.value;
    }

    setIsDeleting(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <InputWrapper>
        <Input
          extraClass={styles.input}
          placeholder="Введите значение"
          isLimitText={true}
          min={1}
          maxLength={4}
          value={inputValue || ""}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
        />
        <Button
          text="Добавить"
          type="button"
          onClick={() => enqueue()}
          isLoader={isAdding}
          disabled={
            !inputValue ||
            elementsArr[elementsArr.length - 1].char !== "" ||
            isDeleting
          }
        />
        <Button
          text="Удалить"
          type="button"
          onClick={() => dequeue()}
          isLoader={isDeleting}
          disabled={isAdding || queue.isEmpty()}
        />
        <Button
          extraClass={styles.resetButton}
          text="Очистить"
          type="button"
          onClick={() => clear()}
          disabled={isAdding || isDeleting || queue.isEmpty()}
        />
      </InputWrapper>

      <ul className={styles.list}>
        {elementsArr.map((char, index) => {
          return (
            <li key={index}>
              <Circle
                state={char.state}
                index={index}
                head={char.head}
                tail={char.tail}
                letter={char.char}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
