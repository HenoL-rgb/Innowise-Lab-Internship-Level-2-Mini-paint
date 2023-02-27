import styled from "styled-components";

export const HomeWrapper = styled.div`
  position: relative;
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.main};
`;
