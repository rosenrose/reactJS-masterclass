import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "none"}>
      {text}
    </Container>
  );
}

export default Circle;
