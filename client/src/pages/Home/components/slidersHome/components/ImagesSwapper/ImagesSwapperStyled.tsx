import styled from "styled-components";

export const ImagesSwapperStyled = styled.div`
  .wrapper {
    perspective: 1000px;
    .card {
      transform-style: preserve-3d;
      transition: transform 0.7s ease-in-out;
      cursor: pointer;
      position: relative;

      &:hover {
        transform: rotateY(180deg);
      }

      .client,
      .server {
        position: absolute;
        inset: 0;
        min-width: 100%;
        min-height: 100%;
        backface-visibility: hidden;
      }

      .server {
        transform: rotateY(180deg);
        overflow: hidden;
      }
    }
  }
`;
