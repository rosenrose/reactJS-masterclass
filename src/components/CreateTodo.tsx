import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

export interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setTodoList = useSetRecoilState(todoState);

  const onSubmit = (data: IForm) => {
    console.log(data.todo);
    setValue("todo", "");
    setTodoList((prev) => [...prev, { text: data.todo, category: "TO_DO", id: Date.now() }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("todo", { required: "Please write a todo", minLength: 2 })}
        placeholder="Write a todo"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateTodo;
