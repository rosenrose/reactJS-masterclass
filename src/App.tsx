import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { itemState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

function App() {
  const [items, setItems] = useRecoilState(itemState);

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const { source, destination } = result;

    if (!destination) return;

    // setItems((prev) => {
    //   const next = { ...prev };
    //   next.todo = [...next.todo];
    //   next.todo.splice(destination.index, 0, next.todo.splice(source.index, 1)[0]);

    //   return next;
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.entries(items).map(([boardId, todos]) => (
            <Board todos={todos} key={boardId} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
