import { FC } from "react";
import styled from "styled-components";

const Container = styled.main<{ color?: string }>`
  display: flex;
  color: ${({ color }) => color};
  .el__ {
  }
`;

const Test: FC = () => {
  return (
    <Container {...{ color: "red" }}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        totam cupiditate obcaecati atque officiis aperiam vel voluptates aut
        sint dolores architecto inventore eveniet repellendus, magnam veritatis
        quidem alias necessitatibus. Officiis.
      </p>
    </Container>
  );
};
export default Test;
