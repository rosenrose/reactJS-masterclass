import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

const TodoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data.todo);
    setValue("todo", "");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("todo", { required: "Please write a todo", minLength: 2 })}
          placeholder="Write a todo"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
