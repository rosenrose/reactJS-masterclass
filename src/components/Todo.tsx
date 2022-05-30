import React from "react";
import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);

  const onClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    if (target.matches("button")) {
      const name = target.name as ITodo["category"];
      console.log(target.name);

      setTodos((prev) => {
        const next = [...prev];
        const index = next.findIndex((todo) => todo.id === id)!;
        next[index] = { text, id, category: name };

        return next;
      });
    }
  };

  return (
    <li onClick={onClick}>
      <span>{text}</span>
      {category !== "DOING" && <button name="DOING">Doing</button>}
      {category !== "TO_DO" && <button name="TO_DO">To do</button>}
      {category !== "DONE" && <button name="DONE">Done</button>}
    </li>
  );
};

export default Todo;
