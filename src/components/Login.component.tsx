import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

export default function Login(props: any) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = () => {
    const validation = Yup.object().shape({
      email: Yup.string().required("This field is required!").email("This is not a valid email."),
      password: Yup.string().required("This field is required!"),
    });
    setMessage("");
    return validation;
  }

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    setMessage("");
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        props.history.push("/home");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setLoading(false);

      }
    );
  }

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="col-md-12" data-testid="login-form">
      <div className="card card-container">
        <h2 className="text-center mb-3">Login</h2>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email" className="required">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger without-background-alert"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="required">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger without-background-alert"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn button btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}
