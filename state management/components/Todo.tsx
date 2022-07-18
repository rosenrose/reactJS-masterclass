import React, { Fragment } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ITodo, todoState, categoriesState, TODOS_KEY } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    // console.log(target.name);

    setTodos((prev) => {
      const next = [...prev];
      const index = next.findIndex((todo) => todo.id === id)!;
      next[index] = { text, id, category: name };
      // console.log("next", next);

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
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <span>{text}</span>
        {categories.map((cat) => (
          <Fragment key={cat}>
            {category !== cat && (
              <button name={cat} onClick={onClick}>
                {cat}
              </button>
            )}
          </Fragment>
        ))}
        <span onClick={deleteTodo} style={{ cursor: "pointer" }}>
          ❌
        </span>
      </div>
    </li>
  );
};

export default Todo;
