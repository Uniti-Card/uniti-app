import React, { useState, Fragment } from "react";
import { Form, Button, Alert, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./components/Message";
import Loader from "./components/Loader";
import FormContainer from "./components/FormContainer";
import { resetPassword } from "state/ducks/auth/actions";
import * as types from "state/ducks/auth/types";

const ResetPassword = ({ location, history }) => {
  const query = new URLSearchParams(location.search);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    const token = query.get("token");
    if (checkPassword(password)) {
      if (confirmPassword === password) {
        dispatch(resetPassword(token, password));
      } else {
        dispatch({
          type: types.AUTH_FAIL,
          payload: "Password doesn't match",
        });
      }
    } else {
      dispatch({
        type: types.AUTH_FAIL,
        payload: "Minimum eight characters, at least one letter, one number",
      });
    }
  };

  function checkPassword(str) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(str);
  }

  return (
    <Fragment>
      <div className="bg-black text-center">
        <a href={`https://${process.env.REACT_APP_URL}`}>
          <p
            className="text-white"
            style={{ fontSize: "1.4rem", padding: "0.5rem 0" }}
          >
            {process.env.REACT_APP_URL}
          </p>
        </a>
      </div>
      {!success ? (
        <FormContainer>
          <h3>Reset Password</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <InputGroup controlId="password">
              <FormControl
                type={showPassword ? "password" : "text"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
              <InputGroup.Append>
                <InputGroup.Text>
                  <i
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                  ></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <br />
            <InputGroup controlId="password">
              <FormControl
                type={showConfirmPassword ? "password" : "text"}
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
              <InputGroup.Append>
                <InputGroup.Text>
                  <i
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    className={
                      showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                    }
                  ></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <br />
            <Button type="submit" variant="primary">
              Reset
            </Button>
          </Form>

          {/* <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row> */}
        </FormContainer>
      ) : (
        <FormContainer>
          <Alert variant="success">
            <Alert.Heading>Password Updated!</Alert.Heading>
            <p>
              Your password has been changed successfully. Use your new password
              to log in.
            </p>
          </Alert>
        </FormContainer>
      )}
    </Fragment>
  );
};

export default ResetPassword;
