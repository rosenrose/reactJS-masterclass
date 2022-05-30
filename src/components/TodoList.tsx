import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { todoState } from "../atoms";

const TodoList = () => {
  const todos = useRecoilValue(todoState);
  console.log(todos);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
