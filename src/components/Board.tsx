import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 1.2rem 0.6rem;
  padding-top: 2rem;
  border-radius: 0.5rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: red;
  flex-grow: 1;
`;

interface IBoardProps {
  todos: string[];
  boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, i) => (
              <DraggableCard key={i} todo={todo} index={i} boardId={boardId} />
            ))}
            {provided.placeholder}
          </CardContainer>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
