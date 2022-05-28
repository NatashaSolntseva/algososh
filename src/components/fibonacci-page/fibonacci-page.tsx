import { FC } from "react";

import styles from "./fibonacciStyles.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: FC = () => {
  //перестановка по нажатию на "Развернуть"
  const handleClick = () => {
    alert("fibonacci");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input
          extraClass={styles.input}
          type={"number"}
          isLimitText={true}
          max={19}
        />
        <Button text={"Рассчитать"} onClick={handleClick} />
      </div>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"1"} />
            <p>0</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"1"} />
            <p>1</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"2"} />
            <p>2</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"3"} />
            <p>3</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"5"} />
            <p>4</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"8"} />
            <p>5</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"13"} />
            <p>6</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"21"} />
            <p>7</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"34"} />
            <p>8</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"55"} />
            <p>9</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"89"} />
            <p>10</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"144"} />
            <p>11</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"233"} />
            <p>12</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"377"} />
            <p>13</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"610"} />
            <p>14</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"987"} />
            <p>15</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"1597"} />
            <p>16</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"2584"} />
            <p>17</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"4181"} />
            <p>18</p>
          </li>
          <li className={`${styles["list-element"]}`}>
            <Circle letter={"6765"} />
            <p>19</p>
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
