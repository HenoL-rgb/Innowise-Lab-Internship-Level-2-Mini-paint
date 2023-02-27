import styled from "styled-components";

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  row-gap: 100px;
  background-color: ${(props) => props.theme};
`;

export const LoadWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
