import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITask, taskState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 1.5rem;
  border-radius: 0.5rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${(props) =>
    props.isDraggingOver ? "#8FCFEB" : props.isDraggingFromThis ? "#38748C" : "transparent"};
  transition: background-color 0.3s ease-in-out;
  flex-grow: 1;
  padding: 1.2rem;
`;

interface IBoardProps {
  todos: ITask[];
  boardId: string;
}

interface IForm {
  todo: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  const setTasks = useSetRecoilState(taskState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    // console.log(todo);
    setTasks((prev) => {
      return { ...prev, [boardId]: [...prev[boardId], { text: todo, id: Date.now() }] };
    });
    setValue("todo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register("todo", { required: true })}
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {todos.map((todo, i) => (
              <DraggableCard key={todo.id} index={i} todo={todo.text} id={todo.id} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
