import { atom } from "recoil";

export const todoState = atom({
  key: "todo",
  default: [...Array(8)].map((_, i) => i),
});
