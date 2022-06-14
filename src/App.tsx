import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { saveLocal, taskState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 60rem;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Trash = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "black" : "gray")};
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 3rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease-in-out;
`;

function App() {
  const [tasks, setTasks] = useRecoilState(taskState);
  // console.log("tasks", tasks);

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const { source, destination } = result;

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

        saveLocal(next);
        return next;
      });
    } else if (dstDropId === "trash") {
      setTasks((prev) => {
        const next = {
          ...prev,
          [srcDropId]: [...prev[srcDropId]].filter(
            (task) => task.id !== parseInt(result.draggableId)
          ),
        };

        saveLocal(next);
        return next;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.entries(tasks).map(([boardId, task]) => (
            <Board tasks={task} key={boardId} boardId={boardId} />
          ))}
        </Boards>
        <Droppable droppableId="trash">
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
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
