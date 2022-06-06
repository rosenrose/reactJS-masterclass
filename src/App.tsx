import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 30rem;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 1.2rem 0.6rem;
  padding-top: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 0.6rem;
  border-radius: 0.5rem;
`;

const todos = ["one", "two", "three", "abc", "dfsdf", "asdf", "kksss", "sss"];

function App() {
  const onDragEnd = (a: any) => {
    console.log(a);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="todos">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo, i) => (
                  <Draggable draggableId={`todo_${i}`} index={i} key={i}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {todo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
