import { atom } from "recoil";

interface IItemState {
  [key: string]: string[];
}

export const itemState = atom<IItemState>({
  key: "todo",
  default: {
    "To Do": ["car", "sun", "bike"],
    Doing: ["wash", "dish", "clean", "clear"],
    Done: ["coding"],
    // "Do Later": ["hahaha"],
  },
});
