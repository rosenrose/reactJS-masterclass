import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#74B9FF" : props.theme.cardColor)};
  padding: 0.6rem;
  border-radius: 0.5rem;
  box-shadow: ${(props) => (props.isDragging ? "0px 5px 10px rgba(0, 0, 0, 0.7)" : "none")};
`;

interface IDraggableCardProps {
  todo: string;
  id: number;
  index: number;
}

const DraggableCard = ({ todo, id, index }: IDraggableCardProps) => {
  // console.log(todo, "rendered");

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
