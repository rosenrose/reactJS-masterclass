import { atom, selector } from "recoil";

export interface ITodo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}

export const categoryState = atom<ITodo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);

    return todos.filter((todo) => todo.category === category);
  },
});
