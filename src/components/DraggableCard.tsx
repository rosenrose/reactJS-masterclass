import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 0.6rem;
  border-radius: 0.5rem;
`;

interface IDraggableCardProps {
  todo: string;
  index: number;
  boardId: string;
}

const DraggableCard = ({ todo, index, boardId }: IDraggableCardProps) => {
  // console.log(todo, "rendered");

  return (
    <Draggable draggableId={`${boardId}_${index}`} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
