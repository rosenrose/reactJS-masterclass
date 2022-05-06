import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="tomato" text="ddd" />
      <Circle bgColor="teal" borderColor="red" />
    </div>
  );
}

export default App;
