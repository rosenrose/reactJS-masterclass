import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 1.2rem 0.6rem;
  padding-top: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface IBoardProps {
  todos: number[];
  boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          <h2>{boardId}</h2>
          {todos.map((todo, i) => (
            <DraggableCard key={i} todo={todo} index={i} boardId={boardId} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;
