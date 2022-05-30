import { atom } from "recoil";

export interface ITodo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});
