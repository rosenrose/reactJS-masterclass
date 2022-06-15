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
  border-radius: 1rem;
  background-color: #cdcdcd;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
`;

const boxVar = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "50%" },
};

const App = () => {
  return (
    <Wrapper>
      <Box variants={boxVar} whileHover="hover" whileTap="click"></Box>
    </Wrapper>
  );
};

export default App;
