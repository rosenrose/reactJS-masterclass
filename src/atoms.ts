import { atom } from "recoil";

export const itemState = atom({
  key: "todo",
  default: {
    todo: [1, 4, 6],
    doing: [5, 0, 2],
    done: [3],
  },
});
