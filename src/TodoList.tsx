import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
  margin: 1rem;
`;

interface IForm {
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

const TodoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@gmail.com" } });

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordCheck) {
      return setError(
        "passwordCheck",
        { message: "Passwords are not the same" },
        { shouldFocus: true }
      );
    }
    return setError("extraError", { message: "Server offline" });
  };
  // console.log(watch());
  console.log(errors);

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w_\-.%+]+@(((gmail|naver|kakao).com)|daum.net)$/,
              message: "Pattern is not valid",
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="text" {...register("firstName")} placeholder="First Name" />
        <input type="text" {...register("lastName")} placeholder="Last Name" />
        <input
          type="text"
          {...register("userName", {
            required: "User name is required",
            minLength: { value: 2, message: "User name is too short" },
            validate: {
              noAdmin: (value) =>
                value.toLowerCase() !== "admin" || "admin should not be a user name",
              noRoot: (value) => value.toLowerCase() !== "root" || "root should not be a user name",
            },
          })}
          placeholder="User Name"
        />
        {errors.userName && <p>{errors.userName.message}</p>}
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password is too short" },
          })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          {...register("passwordCheck", {
            required: "Password is required",
            minLength: { value: 6, message: "Password is too short" },
          })}
          placeholder="Confirm Password"
        />
        {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
        <button>Add</button>
        {errors.extraError && <p>{errors.extraError.message}</p>}
      </Form>
    </div>
  );
};

export default TodoList;
