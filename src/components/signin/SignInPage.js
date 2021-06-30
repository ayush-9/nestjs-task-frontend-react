import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signin } from "../../redux/actions/signin.action";
import "./SignInPage.scss";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { Redirect } from "react-router-dom";

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

function SignInPage() {
  const { accessToken, error } = useSelector((state) => state.signindata);
  const [user_name, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirectTo, setRedirctTo] = useState(false);
  let history = useHistory();
  useEffect(() => {
    (() => {
      if (localStorage.getItem("accessToken")) {
        setRedirctTo(true);
      }
    })();
  }, [accessToken]);

  const dispatch = useDispatch();

  const submit = () => {
    dispatch(signin(user_name, password));
    if (accessToken && user_name && password) {
      localStorage.setItem("accessToken", accessToken);
    }
  };
  const goToSignUp = () => {
    history.push("/signup");
  };
  if (redirectTo) {
    return <Redirect to="/tasks" />;
  } else {
    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Hello there!</Heading>
          <p>Fill in your username and password to sign in.</p>

          {error && <ErrorMessage message={error.message} />}
          <div>
            <FormField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <hr />
          <div>
            <Button
              style={{ marginBottom: "10px" }}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={submit}
            >
              SIGN IN
            </Button>

            <Button fullWidth onClick={goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignInPage;
