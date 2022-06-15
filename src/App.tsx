import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  background-color: #cdcdcd;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 0, 0, 0.6);
`;

const boxVar = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "50%" },
  drag: { backgroundColor: "rgb(0, 205, 255)", transition: { duration: 0.5 } },
};

const App = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [360, -360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(0deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(270deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);

  useEffect(() => {
    // x.onChange((latest) => {
    //   console.log(latest);
    // });
    // scale.onChange((latest) => {
    //   console.log(latest);
    // });
    scrollY.onChange((latest) => {
      console.log(scrollY.get(), scrollYProgress.get());
    });
  }, []);

  return (
    <Wrapper style={{ background: gradient }}>
      <button onClick={() => x.set(0)}>click</button>
      <Box drag="x" style={{ x, scale, rotateZ }}></Box>
    </Wrapper>
  );
};

export default App;
