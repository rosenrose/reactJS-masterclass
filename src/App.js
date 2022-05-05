import styled from "styled-components";

const Parent = styled.div`
  display: flex;
`;
const Box1 = styled.div`
  background-color: tomato;
  width: 10rem;
  height: 10rem;
`;
const Box2 = styled.div`
  background-color: teal;
  width: 10rem;
  height: 10rem;
`;
const Text = styled.h1`
  color: white;
`;

function App() {
  return (
    <Parent>
      <Box1>
        <Text>Hello</Text>
      </Box1>
      <Box2 />
    </Parent>
  );
}

export default App;
