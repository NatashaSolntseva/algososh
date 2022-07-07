import { ElementStates } from "../../types/element-states";

// отвечает за состояние и раскраску элементов при анимации
export function getElementsState(
  index: number,
  maxIndex: number,
  currentStep: number,
  isFinished: boolean
): ElementStates {
  if (index < currentStep || index > maxIndex - currentStep || isFinished) {
    return ElementStates.Modified;
  }

  if (index === currentStep || index === maxIndex - currentStep) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
}

//возвращает массив с переворот по шагам
export function getReversingStringSteps(inputString: string): string[][] {
  const inputStringChars = inputString.split("");
  const reversingSteps: string[][] = [[...inputStringChars]];

  console.log("reversingSteps in utils", reversingSteps);

  if (inputString.length <= 1) {
    return [[...inputStringChars]];
  }

  //считаем сколько итераций нужно для переворота 5 символов - 2 итерации и один кружок в центре не нужно переворачивать.
  // (5 - 1)/2 = 2

  //в середине заканчиваем переворот

  const maxAlgoIteration = Math.ceil((inputString.length - 1) / 2);
  //console.log(maxAlgoIteration);

  //метод двух указателей
  for (
    let leftPointerPosition = 0;
    leftPointerPosition < maxAlgoIteration;
    leftPointerPosition++
  ) {
    const rightPointerPosition = inputString.length - 1 - leftPointerPosition;

    //меняем местами элементы
    let temp = inputStringChars[leftPointerPosition];
    inputStringChars[leftPointerPosition] =
      inputStringChars[rightPointerPosition];

    inputStringChars[rightPointerPosition] = temp;

    //добавляем в массив с переворотными шагами состояние на шаге
    reversingSteps.push([...inputStringChars]);
  }
  //console.log(reversingSteps);
  return reversingSteps;
}
