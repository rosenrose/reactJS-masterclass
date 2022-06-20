import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
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
`;

const Box2 = styled(Box)`
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #00a5ff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.6);
`;

const App = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Wrapper onClick={() => setIsClicked((prev) => !prev)}>
      <Box
        style={{
          justifyContent: isClicked ? "center" : "flex-start",
          alignItems: isClicked ? "center" : "flex-start",
        }}
      >
        <Circle layout />
      </Box>
      <Box2>{isClicked && <Circle layoutId="circle" style={{ borderRadius: "50%" }} />}</Box2>
      <Box2>
        {!isClicked && <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} />}
      </Box2>
    </Wrapper>
  );
};

export default App;
