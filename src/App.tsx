import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = (a: any) => {
    console.log(a);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dropId">
        {(provided) => {
          // console.log(provided);
          return (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="dragId_1" index={0}>
                {(provided) => {
                  // console.log(provided);
                  return (
                    <li ref={provided.innerRef} {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>🔆</span>one
                    </li>
                  );
                }}
              </Draggable>
              <Draggable draggableId="dragId_2" index={1}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    two<span {...provided.dragHandleProps}>🔥</span>
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="dragId_3" index={2}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps}>
                    <span {...provided.dragHandleProps}>🅰</span>
                    three
                    <span {...provided.dragHandleProps}>🅱</span>
                  </li>
                )}
              </Draggable>
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
