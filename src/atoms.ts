import { atom } from "recoil";

export interface ITask {
  text: string;
  id: number;
}

interface ITaskState {
  [key: string]: ITask[];
}

const TASKS_KEY = "tasks";
const savedTasks = localStorage.getItem(TASKS_KEY);

export const taskState = atom<ITaskState>({
  key: "task",
  default: savedTasks
    ? JSON.parse(savedTasks)
    : {
        "To Do": [],
        Doing: [],
        Done: [],
        // "Do Later": ["hahaha"],
      },
});

export const saveLocal = (task: ITaskState) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(task));
};
