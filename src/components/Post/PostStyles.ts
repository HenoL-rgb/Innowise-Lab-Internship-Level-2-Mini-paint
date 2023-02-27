import styled from "styled-components";

export const Email = styled.span`
  font-size: 1rem;
`;

export const Info = styled.div`
  display: flex;
  column-gap: 1.5rem;
  margin-bottom: 10px;
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;

export const PostWrapper = styled.div`
  width: min-content;
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: ${props => props.theme.header.bg};
  border-radius: 15px;
  color: ${props => props.theme.header.font};
  & #ava {
    padding: 0;
  }
  padding: 15px;

  img {
    background-color: white;
    border: 1px solid ${props => props.theme.header.logo};
    border-radius: 15px;
  }
`;