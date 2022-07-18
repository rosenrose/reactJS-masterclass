import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import {
  categoryState,
  todoSelector,
  todoState,
  categoriesState,
  TODOS_KEY,
  CATEGORIES_KEY,
  defaultCategories,
} from "../atoms";
import React from "react";
import { useForm } from "react-hook-form";

export interface IForm {
  category: string;
}

const TodoList = () => {
  // const todos = useRecoilValue(todoState);
  const todos = useRecoilValue(todoSelector);
  const setAllTodos = useSetRecoilState(todoState);

  const [category, setCategory] = useRecoilState(categoryState);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  // console.log(todos);

  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    setValue("category", "");
    setCategories((prev) => {
      const next = [...prev];
      const cat = data.category;

      if (!next.includes(cat)) {
        next.push(cat);
      }

      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(next));
      return next;
    });
  };
  const deleteCategory = (event: React.MouseEvent<HTMLSpanElement>) => {
    setCategories((prev) => {
      const next = [...prev].filter((cat) => cat !== category);

      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(next));
      return next;
    });
    setAllTodos((prev) => {
      const next = [...prev].filter((todo) => todo.category !== category);

      localStorage.setItem(TODOS_KEY, JSON.stringify(next));
      return next;
    });
    setCategory(defaultCategories[0]);
  };

  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1 style={{ fontSize: "2rem" }}>To dos</h1>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <select onChange={onChange}>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        {!defaultCategories.includes(category) && (
          <span onClick={deleteCategory} style={{ cursor: "pointer" }}>
            ❌
          </span>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("category", { required: "Please write a category", minLength: 2 })}
            placeholder="Add a category"
          />
          <button>Add</button>
        </form>
      </div>
      <CreateTodo />
      <ul
        style={{
          padding: "0 0.5rem",
          listStyleType: "disc",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
