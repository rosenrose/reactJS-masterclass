import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
  gap: 1rem;
  width: 50%;
`;

const Box = styled(motion.div)`
  height: 15rem;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxVar = {
  whileHover: { scale: 1.2, transition: { duration: 0.3 } },
};

const Circle = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #fff;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayVar = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  animate: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const App = () => {
  const [id, setId] = useState<null | string>(null);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Wrapper>
      <Grid>
        {[...Array(4)].map((_, i) => (
          <Box
            {...BoxVar}
            key={i}
            layoutId={i.toString()}
            onClick={() => setId(i.toString())}
            style={{
              originX: i % 2 === 0 ? 1 : 0,
              originY: i < 2 ? 1 : 0,
            }}
          >
            {i === 1 && !isClicked && <Circle layoutId="circle" />}
            {i === 2 && isClicked && <Circle layoutId="circle" />}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id && (
          <Overlay {...OverlayVar} onClick={() => setId(null)}>
            <Box style={{ width: "30rem", backgroundColor: "#fff" }} layoutId={id} />
          </Overlay>
        )}
      </AnimatePresence>
      <button onClick={() => setIsClicked((prev) => !prev)}>Switch</button>
    </Wrapper>
  );
};

export default App;
