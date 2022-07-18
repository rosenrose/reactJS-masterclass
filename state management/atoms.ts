import { atom, selector } from "recoil";

export interface ITodo {
  text: string;
  category: string;
  id: number;
}

export const defaultCategories = ["To Do", "Doing", "Done"];
export const CATEGORIES_KEY = "categories";
const savedCategories = localStorage.getItem(CATEGORIES_KEY);

export const categoriesState = atom<string[]>({
  key: "categories",
  default: savedCategories ? (JSON.parse(savedCategories) as string[]) : defaultCategories,
});

export const categoryState = atom<string>({
  key: "category",
  default: "To Do",
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
