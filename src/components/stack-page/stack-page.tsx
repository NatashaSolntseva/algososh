import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div>
        <Input />
        <Button text="Добавить" />
        <Button text="Удалить" />
        <Button text="Очистить" />
      </div>
      <ul>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
      </ul>
    </SolutionLayout>
  );
};
