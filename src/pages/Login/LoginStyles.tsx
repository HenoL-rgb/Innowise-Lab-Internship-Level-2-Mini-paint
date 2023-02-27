import styled from "styled-components";

export const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 40%;
  min-width: min-content;
  padding: 0 60px;
  height: min-content;
  min-height: 600px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(63, 93, 171, 0.4);
  box-shadow: 0px 0px 5px #3f5dab;
  border-radius: 15px;
  row-gap: 20px;
  & span {
    color: red;
  }

`;
