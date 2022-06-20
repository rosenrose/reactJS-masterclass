import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

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
  background-color: #cdcdcd;
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

  return (
    <Wrapper>
      <Grid>
        {[...Array(4)].map((_, i) => (
          <Box key={i} layoutId={i.toString()} onClick={() => setId(i.toString())} />
        ))}
      </Grid>
      <AnimatePresence>
        {id && (
          <Overlay {...OverlayVar} onClick={() => setId(null)}>
            <Box style={{ width: "30rem" }} layoutId={id!} />
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default App;
