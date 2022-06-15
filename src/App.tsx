import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const Border = styled.div`
  width: 40rem;
  height: 40rem;
  border-radius: 1rem;
  background-color: rgba(205, 205, 205, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <Border ref={ref}>
        <Box
          variants={boxVar}
          whileHover="hover"
          whileTap="click"
          drag
          whileDrag="drag"
          dragConstraints={ref}
          dragSnapToOrigin
        ></Box>
      </Border>
    </Wrapper>
  );
};

export default App;
