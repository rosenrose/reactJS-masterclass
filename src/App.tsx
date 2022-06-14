import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, saveBoard, saveTask, taskState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Trash = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "black" : "gray")};
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 3rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  p {
    text-align: center;
  }
`;

function App() {
  const [tasks, setTasks] = useRecoilState(taskState);
  // console.log("tasks", tasks);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const { index: srcIdx, droppableId: srcDropId } = source;
    const { index: dstIdx, droppableId: dstDropId } = destination;

    if (dstDropId in tasks) {
      setTasks((prev) => {
        const next = { ...prev };

        next[srcDropId] = [...next[srcDropId]];

        if (srcDropId === dstDropId) {
          next[srcDropId].splice(dstIdx, 0, next[srcDropId].splice(srcIdx, 1)[0]);
        } else {
          next[dstDropId] = [...next[dstDropId]];
          next[dstDropId].splice(dstIdx, 0, next[srcDropId].splice(srcIdx, 1)[0]);
        }

        saveTask(next);
        return next;
      });
    } else if (dstDropId === "trash") {
      setBoards((prev) => {
        const next = prev.filter((board) => board !== draggableId);
        saveBoard(next);
        return next;
      });
      setTasks((prev) => {
        const next = { ...prev };
        delete next[draggableId];
        saveTask(next);
        return next;
      });
    }
  };

  interface IForm {
    boardName: string;
  }

  const [boards, setBoards] = useRecoilState(boardState);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = ({ boardName }: IForm) => {
    if (boards.includes(boardName)) {
      return setError("boardName", { message: "Existing Board Name" }, { shouldFocus: true });
    }

    setBoards((prev) => {
      const next = [...prev, boardName];
      saveBoard(next);
      return next;
    });
    setTasks((prev) => {
      const next = { ...prev, [boardName]: [] };
      saveTask(next);
      return next;
    });

    setValue("boardName", "");
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((boardId, i) => (
                <Board tasks={tasks[boardId] || []} key={i} boardId={boardId} index={i} />
              ))}
            </Boards>
          )}
        </Droppable>
        <Droppable droppableId="trash" type="board">
          {(provided, snapshot) => (
            <Trash
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              🗑
            </Trash>
          )}
        </Droppable>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            type="text"
            {...register("boardName", { required: true })}
            placeholder="Add a new board"
          />
          {errors.boardName && <p>🚫{errors.boardName?.message}</p>}
        </Form>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
