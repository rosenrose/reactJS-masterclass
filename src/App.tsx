import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const Box = styled(motion.div)`
  width: 15rem;
  height: 15rem;
  background-color: #ccc;
  border-radius: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
`;

const App = () => {
  return (
    <Wrapper>
      <Box
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: "1turn" }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      ></Box>
    </Wrapper>
  );
};

export default App;
