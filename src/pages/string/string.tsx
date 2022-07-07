import { FC, FormEvent, useEffect, useRef, useState } from "react";

import styles from "./stringStyles.module.css";

import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Circle } from "../../components/ui/circle/circle";
import InputWrapper from "../../components/input-wrapper/input-wrapper";
import { DELAY_IN_MS } from "../../constants/delays";
import { getElementsState, getReversingStringSteps } from "./utils";

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState("");

  const intervalObj = useRef<NodeJS.Timeout>();

  const [reversingAlgoSteps, setReversingAlgoSteps] = useState<string[][]>([]);
  const [currentReversingAlgoStep, setCurrentReversingAlgoStep] = useState(0);

  const swapString = () => {
    const steps = getReversingStringSteps(inputValue);
    console.log("steps", steps);
    setReversingAlgoSteps(steps);
    console.log("setReversingAlgoSteps", reversingAlgoSteps);

    //обнуляем счетчик
    setCurrentReversingAlgoStep(0);

    if (steps.length) {
      intervalObj.current = setInterval(() => {
        setCurrentReversingAlgoStep((currentStep) => {
          console.log(currentStep);
          const nextStep = currentStep + 1;

          if (nextStep >= steps.length - 1 && intervalObj.current) {
            clearInterval(intervalObj.current);
          }
          return nextStep;
        });
      }, DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          swapString();
        }}
      >
        <InputWrapper>
          <Input
            disabled={currentReversingAlgoStep < reversingAlgoSteps.length - 1}
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
            disabled={!inputValue}
            isLoader={currentReversingAlgoStep < reversingAlgoSteps.length - 1}
          />
        </InputWrapper>
      </form>
      <ul className={styles.list}>
        {reversingAlgoSteps.length > 0 &&
          reversingAlgoSteps[currentReversingAlgoStep].map((char, index) => (
            <li key={index}>
              <Circle
                letter={char}
                state={getElementsState(
                  index,
                  reversingAlgoSteps[currentReversingAlgoStep].length - 1,
                  currentReversingAlgoStep,
                  currentReversingAlgoStep === reversingAlgoSteps.length - 1
                )}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};

/*
  Remember that Timeout objects are returned by setTimeout and setInterval. The Timeout object provides two functions intended to augment Timeout behavior with unref() and ref(). If there is a Timeout object scheduled using a set function, unref() can be called on that object. This will change the behavior slightly, and not call the Timeout object if it is the last code to execute. The Timeout object will not keep the process alive, waiting to execute.

In similar fashion, a Timeout object that has had unref() called on it can remove that behavior by calling ref() on that same Timeout object, which will then ensure its execution. Be aware, however, that this does not exactly restore the initial behavior for performance reasons. See below for examples of both:
  */
