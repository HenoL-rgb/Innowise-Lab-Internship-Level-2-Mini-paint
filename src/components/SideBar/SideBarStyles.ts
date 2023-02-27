import styled from "styled-components";

export const SideBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  
  span {
    width: min-content;
  }
  button {
    margin-top: 15px;
  }
  input[name="colorPick"] {
    background-color: transparent;
    outline-color: transparent;
    border: 1px solid #3f5dab;
    width: 50px;
    height: 30px;
    border-radius: 5px;
    padding: 1px;
    cursor: pointer;
  }
`;
