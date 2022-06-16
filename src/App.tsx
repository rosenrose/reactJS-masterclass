import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
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
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const boxVar = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, rotateZ: 360 },
  exit: { opacity: 0, y: 20 },
};

const boxVar2 = {
  initial: (direction: number) => ({ opacity: 0, scale: 0, x: 500 * direction }),
  animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.25 } },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0,
    x: -500 * direction,
    rotateY: 360,
    transition: { duration: 0.5 },
  }),
};

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [visibleIdx, setVisibleIdx] = useState(0);
  const numbers = [...Array(5)].map((_, i) => i + 1);
  const length = numbers.length;

  const [direction, setDirection] = useState(1);
  const scrollNext = () => {
    setDirection(1);
    setVisibleIdx((prev) => (prev + 1) % length);
  };
  const scrollPrev = () => {
    setDirection(-1);
    setVisibleIdx((prev) => (prev + length - 1) % length);
  };

  return (
    <Wrapper>
      <button onClick={() => setIsVisible((prev) => !prev)}>click</button>
      <AnimatePresence>
        {isVisible && <Box {...boxVar} style={{ position: "absolute", top: "5rem" }} />}
      </AnimatePresence>

      <button onClick={scrollNext}>next</button>
      <button onClick={scrollPrev}>prev</button>
      <AnimatePresence custom={direction} exitBeforeEnter>
        {/* {numbers.map((i) =>
            i === visibleIdx + 1 ? (
              <Box key={i} {...boxVar2} style={{ position: "absolute" }}>
                {i}
              </Box>
            ) : null
          )}
          key만 바뀌어도 리액트가 컴포넌트 생성, 삭제를 인식하여 다시 렌더링함
          {...boxVar2}일 때 함수는 할당 불가능
          */}
        <Box
          variants={boxVar2}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          style={{ position: "absolute", bottom: "5rem" }}
          key={visibleIdx}
        >
          {visibleIdx + 1}
        </Box>
      </AnimatePresence>
    </Wrapper>
  );
};

export default App;
