import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITask, saveTask, taskState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 20rem;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding-top: 1.5rem;
  font-size: 1.2rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
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
  tasks: ITask[];
  boardId: string;
  index: number;
}

interface IForm {
  todo: string;
}

const Board = ({ tasks, boardId, index }: IBoardProps) => {
  const setTasks = useSetRecoilState(taskState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    // console.log(todo);
    setTasks((prev) => {
      const next = { ...prev, [boardId]: [...prev[boardId], { text: todo, id: Date.now() }] };

      saveTask(next);
      return next;
    });
    setValue("todo", "");
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps}>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                type="text"
                {...register("todo", { required: true })}
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
          </div>
          <Droppable droppableId={boardId} type="task">
            {(provided, snapshot) => (
              <Area
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              >
                {tasks.map((task, i) => (
                  <DraggableCard
                    key={task.id}
                    index={i}
                    task={task.text}
                    id={task.id}
                    boardId={boardId}
                  />
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Board;
