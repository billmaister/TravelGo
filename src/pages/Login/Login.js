import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Logo from "../../components/Logo/Logo";
import Alert from "../../components/Alert/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./Login.css";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleForm = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, isMember } = values;
    if (!email || !password || (!isMember && !firstname && !lastname)) {
      displayAlert();
      return;
    }
    const currentUser = { firstname, lastname, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User created successfully! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <>
      <Container id="main-container" className="d-grid h-100">
        <Form id="login-form" onSubmit={onSubmit} className="w-100">
          <div className="d-flex justify-content-center">
            <Logo />
          </div>
          <h3 className="text-center">
            {values.isMember ? "Login" : "Register"}
          </h3>
          {showAlert && <Alert />}
          {!values.isMember && (
            <>
              <Form.Group className="mb-3" controlId="formFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  value={values.firstname}
                  placeholder="Firstname"
                  name="firstname"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  value={values.lastname}
                  placeholder="Lastname"
                  name="lastname"
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={values.email}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={values.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            Submit
          </Button>

          <p className="text-center">
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" className="btn btn-link" onClick={toggleForm}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Login;
