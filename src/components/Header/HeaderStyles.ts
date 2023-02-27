import styled from "styled-components";

export const HeaderStyled = styled.div`
  position: sticky;
  display: flex;
  top: 0px;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 50px;
  background-color: ${(props) => props.theme.header.bg};
  h2 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.header.logo};
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root:before {
    border-bottom: 1px solid ${(props) => props.theme.header.font};
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root {
    color: ${(props) => props.theme.header.font};
  }

  & .css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(
      .Mui-disabled,
      .Mui-error
    ):before {
    border-bottom: 2px solid ${(props) => props.theme.header.font};
  }

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;
