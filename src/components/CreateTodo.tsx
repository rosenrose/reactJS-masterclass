import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atoms";

export interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    // console.log(data.todo);
    setValue("todo", "");
    setTodos((prev) => [...prev, { text: data.todo, category, id: Date.now() }]);
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
