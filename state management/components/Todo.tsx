import React, { Fragment } from "react";
import { useSetRecoilState } from "recoil";
import { ITodo, todoState, Categories, TODOS_KEY } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name as Categories;
    // console.log(target.name);

    setTodos((prev) => {
      const next = [...prev];
      const index = next.findIndex((todo) => todo.id === id)!;
      next[index] = { text, id, category: name };
      console.log("next", next);

      localStorage.setItem(TODOS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const deleteTodo = (event: React.MouseEvent<HTMLSpanElement>) => {
    setTodos((prev) => {
      const next = [...prev].filter((todo) => todo.id !== id);

      localStorage.setItem(TODOS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {Object.entries(Categories).map(([key, value]) => (
        <Fragment key={key}>
          {category !== value && (
            <button name={value} onClick={onClick}>
              {value}
            </button>
          )}
        </Fragment>
      ))}
      <span onClick={deleteTodo} style={{ cursor: "pointer" }}>
        ❌
      </span>
    </li>
  );
};

export default Todo;
