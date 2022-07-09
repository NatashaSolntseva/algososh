import { ElementStates } from "../../types/element-states";
import { swapArrElements } from "../../utils/utils";
import { IColumn } from "./sorting";

// *********************СОРТИРОВКА ПУЗЫРЬКОМ***********
export const bubbleSortingAlgo = (
  sortingOption: "ascending" | "descending",
  initialArr: IColumn[],
  step?: number
): { stepResArray: IColumn[]; numberOfAlgoSteps: number } => {
  //копия массива
  const arr = [...initialArr];
  arr.forEach((el) => (el.state = ElementStates.Default));

  let currentStep: number = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let swapInd = i;
    //подсвечиваем розовым элемент
    arr[swapInd].state = ElementStates.Changing;

    //инкремент шага
    currentStep++;

    if (step === currentStep)
      return { stepResArray: arr, numberOfAlgoSteps: currentStep };

    for (let j = i + 1; j < arr.length; j++) {
      //подсвечиваем розовым кандидата на перестановку
      arr[j].state = ElementStates.Changing;

      //инкремент шага
      currentStep++;

      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };

      //сравниваем элементы
      if (
        (sortingOption === "ascending" ? arr[swapInd].number : arr[j].number) >
        (sortingOption === "ascending" ? arr[j].number : arr[swapInd].number)
      ) {
        //если кандидат меньше (больше) текущего то мы нашли второго кандидата на перестановку
        // а первого кандидата оставляем розовым (если это iый элемент) или делаем дефолтным
        arr[swapInd].state =
          i === swapInd ? ElementStates.Changing : ElementStates.Default;

        swapInd = j;

        //инкремент шага
        currentStep++;

        if (step === currentStep)
          return { stepResArray: arr, numberOfAlgoSteps: currentStep };
      }
      // снимаем выделение с просмотренных кандидатов
      if (j !== swapInd) {
        arr[j].state = ElementStates.Default;
      }
    }
    // если сортируемый элемент является экстремумом, то делаем его зеленым
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified;
      //инкремент шага
      currentStep++;
      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };
    } else {
      //в противном случае переставляем
      swapArrElements(arr, swapInd, i);
      arr[i].state = ElementStates.Modified;

      arr[swapInd].state = ElementStates.Default;
      //инкремент шага
      currentStep++;
      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };
    }
  }
  // все красим в эеленый по завершении сортировки
  arr.forEach((el) => (el.state = ElementStates.Modified));
  return { stepResArray: arr, numberOfAlgoSteps: currentStep };
};

// *********************СОРТИРОВКА ВЫБОРОМ***********
export const selectionSortingAlgo = (
  sortingOption: "ascending" | "descending",
  initialArr: IColumn[],
  step?: number
): { stepResArray: IColumn[]; numberOfAlgoSteps: number } => {
  //копия массива
  const arr = [...initialArr];
  arr.forEach((el) => (el.state = ElementStates.Default));

  let currentStep: number = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let swapInd = i;
    //подсвечиваем розовым элемент
    arr[swapInd].state = ElementStates.Changing;

    //инкремент шага
    currentStep++;

    if (step === currentStep)
      return { stepResArray: arr, numberOfAlgoSteps: currentStep };

    for (let j = i + 1; j < arr.length; j++) {
      //подсвечиваем розовым кандидата на перестановку
      arr[j].state = ElementStates.Changing;

      //инкремент шага
      currentStep++;

      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };

      //сравниваем элементы
      if (
        (sortingOption === "ascending" ? arr[swapInd].number : arr[j].number) >
        (sortingOption === "ascending" ? arr[j].number : arr[swapInd].number)
      ) {
        //если кандидат меньше (больше) текущего то мы нашли второго кандидата на перестановку
        // а первого кандидата оставляем розовым (если это iый элемент) или делаем дефолтным
        arr[swapInd].state =
          i === swapInd ? ElementStates.Changing : ElementStates.Default;

        swapInd = j;

        //инкремент шага
        currentStep++;

        if (step === currentStep)
          return { stepResArray: arr, numberOfAlgoSteps: currentStep };
      }
      // снимаем выделение с просмотренных кандидатов
      if (j !== swapInd) {
        arr[j].state = ElementStates.Default;
      }
    }
    // если сортируемый элемент является экстремумом, то делаем его зеленым
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified;

      //инкремент шага
      currentStep++;

      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };
    } else {
      //в противном случае переставляем
      swapArrElements(arr, swapInd, i);
      arr[i].state = ElementStates.Modified;
      arr[swapInd].state = ElementStates.Default;

      //инкремент шага
      currentStep++;

      if (step === currentStep)
        return { stepResArray: arr, numberOfAlgoSteps: currentStep };
    }
  }

  // все красим в эеленый по завершении сортировки
  arr.forEach((el) => (el.state = ElementStates.Modified));
  return { stepResArray: arr, numberOfAlgoSteps: currentStep };
};
