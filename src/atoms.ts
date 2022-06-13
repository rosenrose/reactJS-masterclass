import { atom } from "recoil";

export interface ITask {
  text: string;
  id: number;
}

interface ITaskState {
  [key: string]: ITask[];
}

export const taskState = atom<ITaskState>({
  key: "todo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
    // "Do Later": ["hahaha"],
  },
});
