import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { taskState, TASKS_KEY } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

function App() {
  const [tasks, setTasks] = useRecoilState(taskState);
  // console.log("tasks", tasks);

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    setTasks((prev) => {
      const next = { ...prev };
      const { index: srcIdx, droppableId: srcDropId } = source;
      const { index: dstIdx, droppableId: dstDropId } = destination;

      next[srcDropId] = [...next[srcDropId]];

      if (srcDropId === dstDropId) {
        next[srcDropId].splice(dstIdx, 0, next[srcDropId].splice(srcIdx, 1)[0]);
      } else {
        next[dstDropId] = [...next[dstDropId]];
        next[dstDropId].splice(dstIdx, 0, next[srcDropId].splice(srcIdx, 1)[0]);
      }

      localStorage.setItem(TASKS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.entries(tasks).map(([boardId, task]) => (
            <Board tasks={task} key={boardId} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
