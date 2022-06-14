import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const Box = styled.div`
  width: 15rem;
  height: 15rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
`;

const App = () => {
  return (
    <Wrapper>
      <Box></Box>
    </Wrapper>
  );
};

export default App;
