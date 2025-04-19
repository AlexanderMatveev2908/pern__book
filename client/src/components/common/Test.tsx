import { FC } from "react";
import { Link } from "react-router-dom";
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
      <Link to="/protected" className="txt__4">
        PROTECTED
      </Link>
    </Container>
  );
};
export default Test;
