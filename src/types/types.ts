import { ElementStates } from "./element-states";

export interface ICircleElement {
  adding?: boolean;
  deleting?: boolean;
  withoutArrow?: boolean;
  tail?: string;
  head?: string;
  char?: string | null;
  extraCircle?: {
    char: string;
  };
  state: ElementStates;
}
