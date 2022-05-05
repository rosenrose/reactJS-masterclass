import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
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

const Emoji = styled.span`
  font-size: 3rem;
`;

const Box = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: tomato;
  animation: ${animation} 3s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji} {
    &:hover {
      opacity: 0.3;
    }
    &:active {
      font-size: 5rem;
    }
  }
`;

function App() {
  return (
    <>
      <Title>React JS</Title>
      <Wrapper>
        <Box>
          <Emoji as="p">😊</Emoji>
        </Box>
        <Emoji>😁</Emoji>
        <span>dddfsdf</span>
      </Wrapper>
    </>
  );
}

export default App;
