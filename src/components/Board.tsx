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
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
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
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {todos.map((todo, i) => (
              <DraggableCard key={i} todo={todo} index={i} boardId={boardId} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
