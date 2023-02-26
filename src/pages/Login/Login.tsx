import React from "react";
import Form from "../../components/Form/Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FormWrapper, LoginWrapper } from "./LoginStyles";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken().then((accessToken) => {
          dispatch(
            setUser({
              id: user.uid,
              email: user.email,
              token: accessToken,
            })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...user, accessToken: accessToken })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (
    <LoginWrapper>
      <FormWrapper>
        <h1>Sign in</h1>
        <Form handleClick={handleLogin} />
        <Link to="/sign">Register</Link>
      </FormWrapper>
    </LoginWrapper>
  );
}
