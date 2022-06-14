import { atom } from "recoil";

const INITIAL_BOARDS = ["To Do", "Doing", "Done"];
const BOARDS_KEY = "boards";
const savedBoards = localStorage.getItem(BOARDS_KEY);

export const boardState = atom({
  key: "board",
  default: savedBoards ? (JSON.parse(savedBoards) as string[]) : INITIAL_BOARDS,
});

export const saveBoard = (board: string[]) => {
  localStorage.setItem(BOARDS_KEY, JSON.stringify(board));
};

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
    : Object.fromEntries(INITIAL_BOARDS.map((board) => [board, []])),
});

export const saveTask = (task: ITaskState) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(task));
};
