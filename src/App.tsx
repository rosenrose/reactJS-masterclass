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
  background-color: rgba(205, 205, 205, 0.1);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
`;

const Circle = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #cdcdcd;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3);
`;

const boxVar = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const circleVar = {
  start: { opacity: 0, y: 20 },
  end: { opacity: 1, y: 0 },
};

const App = () => {
  return (
    <Wrapper>
      <Box variants={boxVar} initial="start" animate="end">
        {[...Array(4)].map((_) => (
          <Circle variants={circleVar}></Circle>
        ))}
      </Box>
    </Wrapper>
  );
};

export default App;
