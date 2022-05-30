import React, { Fragment } from "react";
import { useSetRecoilState } from "recoil";
import { ITodo, todoState, Categories } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);

  const onClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    if (target.matches("button")) {
      const name = target.name as Categories;
      // console.log(target.name);

      setTodos((prev) => {
        const next = [...prev];
        const index = next.findIndex((todo) => todo.id === id)!;
        next[index] = { text, id, category: name };
        console.log("next", next);

        return next;
      });
    }
  };

  return (
    <li onClick={onClick}>
      <span>{text}</span>
      {Object.entries(Categories).map(([key, value]) => (
        <Fragment key={key}>{category !== value && <button name={value}>{value}</button>}</Fragment>
      ))}
    </li>
  );
};

export default Todo;
