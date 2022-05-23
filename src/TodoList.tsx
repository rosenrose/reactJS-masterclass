import { useForm } from "react-hook-form";

const TodoList = () => {
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input type="text" placeholder="Write a todo" {...register("todo")} />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
