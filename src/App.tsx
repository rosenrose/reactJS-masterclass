import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  position: relative;
`;

const Box = styled(motion.div)`
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  background-color: #cdcdcd;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVar = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, rotateZ: 360 },
  exit: { opacity: 0, y: 20 },
};

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Wrapper>
      <AnimatePresence>
        {isVisible && (
          <Box variants={boxVar} {...boxVar} style={{ position: "absolute", top: "5rem" }} />
        )}
      </AnimatePresence>
      <button onClick={() => setIsVisible((prev) => !prev)}>click</button>
    </Wrapper>
  );
};

export default App;
