import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

import styles from "./stringStyles.module.css";

import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Circle } from "../../components/ui/circle/circle";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { ElementStates } from "../../types/element-states";
import { setDelay, swapArrElements } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export interface ISimbol {
  char: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [charArr, setCharArr] = useState<Array<ISimbol>>([]);
  const [inProсess, setInProсess] = useState(false);

  //перестановка по нажатию на "Развернуть"
  const swapOnClick = async (
    inputString: string,
    inputValueSetter: Dispatch<SetStateAction<string>>,
    charArrSetter: Dispatch<SetStateAction<ISimbol[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    inputValueSetter(""); //очистка инпута
    processSetter(true); // блокировка кнопки "Развернуть"
    const letterArr: ISimbol[] = [];
    inputString.split("").forEach((letter) => {
      letterArr.push({ char: letter, state: ElementStates.Default });
    });
    charArrSetter([...letterArr]);

    await setDelay();
    for (
      let arr = letterArr, start = 0, end = arr.length - 1;
      end >= start;
      start++, end--
    ) {
      if (end === start) {
        arr[start].state = ElementStates.Modified;
        setCharArr([...arr]);
        await setDelay(DELAY_IN_MS);
        setInProсess(false);
      } else {
        // подсвечиваем элементы, которые меняются местами
        arr[start].state = ElementStates.Changing;
        arr[end].state = ElementStates.Changing;
        setCharArr([...arr]);
        await setDelay(DELAY_IN_MS);
        // меняем их местами
        swapArrElements(arr, start, end);
        //меняем цвет на переставленных элементах
        arr[start].state = ElementStates.Modified;
        arr[end].state = ElementStates.Modified;
        setCharArr([...arr]);
        await setDelay(DELAY_IN_MS);
      }
    }
    setInProсess(false);
  };

  return (
    <SolutionLayout title="Строка">
      <InputWrapper>
        <Input
          disabled={inProсess}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
        />
        <Button
          text={"Развернуть"}
          type="submit"
          onClick={(e) =>
            swapOnClick(inputValue, setInputValue, setCharArr, setInProсess)
          }
          disabled={!inputValue}
          isLoader={inProсess}
        />
      </InputWrapper>
      <ul className={styles.list}>
        {charArr &&
          charArr.map((char: ISimbol, index) => {
            return (
              <li key={index}>
                <Circle letter={char.char} state={char.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
