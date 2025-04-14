import { FC } from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  color: red;
`;

const Test: FC = () => {
  return (
    <Container>
      <p></p>
    </Container>
  );
};
export default Test;
