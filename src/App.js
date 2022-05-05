import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const animation = keyframes`
  0% {
    transform: none;
    border-radius: 0;
  }
  50% {
    transform: rotate(1turn);
    border-radius: 50%;
  }
  100% {
    transform: none;
    border-radius: 0;
  }
`;

const Box = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: tomato;
  animation: ${animation} 2s ease-in-out infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
