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

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 1rem;
`;
const Input = styled.input.attrs({ required: true })`
  background-color: teal;
`;

function App() {
  return (
    <>
      <Parent>
        <Box bgColor="tomato" />
        <Box bgColor="teal" />
        <Circle bgColor="wheat" />
        <Circle bgColor="violet" />
      </Parent>
      <Btn>Log In</Btn>
      <Btn as="a" href="#">
        Log In
      </Btn>
      <Input />
      <Input />
    </>
  );
}

export default App;
