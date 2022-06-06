import { useSetRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { categoryState, todoSelector, todoState, Categories } from "../atoms";
import React from "react";

const TodoList = () => {
  // const todos = useRecoilValue(todoState);
  const todos = useRecoilValue(todoSelector);

  const setCategory = useSetRecoilState(categoryState);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  // console.log(todos);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <select onChange={onChange}>
        {Object.entries(Categories).map(([key, value]) => (
          <option value={value} key={key}>
            {value}
          </option>
        ))}
      </select>
      <CreateTodo />
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
