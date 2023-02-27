import styled from "styled-components";

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: max-content;
  padding: 40px 0;
  row-gap: 100px;
  background-color: ${(props) => props.theme};
`;

export const LoadWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
