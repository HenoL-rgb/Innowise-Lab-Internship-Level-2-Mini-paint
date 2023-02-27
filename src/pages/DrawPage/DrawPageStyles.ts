import styled from "styled-components";

export const DrawPageWrapper = styled.div`
  display: flex;
  position: relative;
  background-color: ${props => props.theme.main};
`;

export const CanvasWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: center;
  canvas {
    border: 1px solid #3f5dab;
    background-color: #ffffff;
  }
`;