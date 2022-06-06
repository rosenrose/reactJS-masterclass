import { atom, selector } from "recoil";

export enum Categories {
  TO_DO = "To Do",
  DOING = "Doing",
  DONE = "Done",
}
// console.log(Categories);

export interface ITodo {
  text: string;
  category: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const TODOS_KEY = "todos";
const savedTodos = localStorage.getItem(TODOS_KEY);

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: savedTodos ? (JSON.parse(savedTodos) as ITodo[]) : [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);

    return todos.filter((todo) => todo.category === category);
  },
});
