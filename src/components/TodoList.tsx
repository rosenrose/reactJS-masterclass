import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { categoryState, todoSelector, todoState, ITodo } from "../atoms";
import React from "react";

const TodoList = () => {
  // const todos = useRecoilValue(todoState);
  const todos = useRecoilValue(todoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as ITodo["category"]);
  };
  // console.log(todos);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <select onChange={onChange}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateTodo />
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
