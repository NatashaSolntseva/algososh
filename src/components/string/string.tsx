import { FC } from "react";

import styles from "./stringStyles.module.css";

import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";

export const StringComponent: FC = () => {
  //перестановка по нажатию на "Развернуть"
  const handleClick = () => {
    alert("reverse the line");
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input extraClass={styles.input} isLimitText={true} maxLength={11} />
        <Button text={"Развернуть"} onClick={handleClick} />
      </div>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"A"} />
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"B"} />
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"R"} />
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"A"} />
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"K"} />
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
