import React from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <div>
        <Input
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
        />
        <Button text="Добавить" />
        <Button text="Удалить" />
        <Button text="Очистить" />
      </div>
      <ul>
        <li>
          <Circle />
        </li>
      </ul>
    </SolutionLayout>
  );
};
