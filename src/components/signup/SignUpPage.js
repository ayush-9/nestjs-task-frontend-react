import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./SignUpPage.scss";
import { useHistory } from "react-router-dom";
import { signup } from "../../redux/actions/signup.action";
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

function SignUpPage() {
  let { username, error } = useSelector((state) => state.signupdata);
  const [user_name, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirectTo, setRedirctTo] = useState(false);
  let history = useHistory();
  useEffect(() => {
    (() => {
      if (username) {
        history.push("/signin");
      }
      if (localStorage.getItem("accessToken")) {
        setRedirctTo(true);
      }
    })();
  });
  const dispatch = useDispatch();
  const goToSignIn = () => {
    history.push("/signin");
  };
  const submit = () => {
    dispatch(signup(user_name, password));
  };
  if (redirectTo) {
    return <Redirect to="/tasks" />;
  } else {
    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us now!</Heading>
          <p>Start managing tasks easily.</p>

          {username ? (
            <h5>User {username} Registered Successfully</h5>
          ) : (
            error && <ErrorMessage message={error.message} />
          )}

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
          <p>
            Passwords must contain at least 1 upper case letter, 1 lower case
            letter and one number OR special charracter.
          </p>
          <hr />
          <div>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={submit}
            >
              SIGN UP
            </Button>
            <Button fullWidth onClick={goToSignIn}>
              Already have a account? Sign in now!
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
