import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { saveLocal, taskState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#74B9FF" : props.theme.cardColor)};
  padding: 0.6rem;
  border-radius: 0.5rem;
  box-shadow: ${(props) => (props.isDragging ? "0px 5px 10px rgba(0, 0, 0, 0.7)" : "none")};
  display: flex;
  justify-content: space-between;
`;

interface IDraggableCardProps {
  task: string;
  id: number;
  index: number;
  boardId: string;
}

const DraggableCard = ({ task, id, index, boardId }: IDraggableCardProps) => {
  // console.log(task, "rendered");
  const setTasks = useSetRecoilState(taskState);

  const deleteTask = () => {
    setTasks((prev) => {
      const next = { ...prev, [boardId]: [...prev[boardId]].filter((task) => task.id !== id) };

      saveLocal(next);
      return next;
    });
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {task}
          <span onClick={deleteTask} style={{ cursor: "pointer" }}>
            ❌
          </span>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
