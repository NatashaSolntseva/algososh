import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div>
        <Input
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
        />
        <Button text="Добавить в head" />
        <Button text="Добавить в tail" />
        <Button text="Удалить из head" />
        <Button text="Удалить из tail" />
      </div>
      <div>
        <Input placeholder="Введите индекс" />
        <Button text="Добавить по индексу" />
        <Button text="Удалить по индексу" />
      </div>
    </SolutionLayout>
  );
};
