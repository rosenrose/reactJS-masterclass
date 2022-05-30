import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { todoState } from "../atoms";

const TodoList = () => {
  const todoList = useRecoilValue(todoState);
  console.log(todoList);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <CreateTodo />
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
