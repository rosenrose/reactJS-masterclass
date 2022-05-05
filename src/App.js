import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 10rem;
  height: 10rem;
`;
const Circle = styled(Box)`
  border-radius: 50%;
`;

function App() {
  return (
    <Parent>
      <Box bgColor="tomato" />
      <Box bgColor="teal" />
      <Circle bgColor="wheat" />
      <Circle bgColor="violet" />
    </Parent>
  );
}

export default App;
