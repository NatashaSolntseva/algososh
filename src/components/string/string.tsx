import React, { FC, useState } from "react";

import styles from "./stringStyles.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import InputWrapper from "../input-wrapper/input-wrapper";
import { ElementStates } from "../../types/element-states";

interface ISimbol {
  char: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [inputCharArr, setInputCharArr] = useState<Array<ISimbol>>([]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputCharArr(
      e.currentTarget.value.split("").map((char: any) => {
        return {
          char: char,
          state: ElementStates.Default,
        };
      })
    );
  };

  //перестановка по нажатию на "Развернуть"
  const handleClick = () => {
    alert("reverse the line");
  };

  return (
    <SolutionLayout title="Строка">
      <InputWrapper>
        <Input
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
        />
        <Button
          text={"Развернуть"}
          type="submit"
          onClick={handleClick}
          disabled={!inputCharArr.length}
        />
      </InputWrapper>
      <ul className={styles.list}>
        {inputCharArr &&
          inputCharArr.map((char: ISimbol, index) => {
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
