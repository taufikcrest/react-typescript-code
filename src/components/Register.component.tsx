import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

export default function Register(props: any) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);

  const validationSchema = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return Yup.object().shape({
      firstName: Yup.string()
        .required("This field is required!"),
      lastName: Yup.string()
        .required("This field is required!"),
      email: Yup.string()
        .required("This field is required!")
        .email("This is not a valid email."),
      password: Yup.string()
        .required("This field is required!")
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        ),
      phoneNumber: Yup.string()
        .required("This field is required!")
        .test(
          "len",
          "The phone number must be between 6 and 12 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 12
        )
        .matches(phoneRegExp, 'Phone number is not valid'),
    });
  }

  const handleRegister = (formValue: { firstName: string; lastName: string; email: string; password: string; phoneNumber: string; }) => {
    const { firstName, lastName, email, password, phoneNumber } = formValue;

    setMessage("");
    setSuccessful(false);
    setLoading(true);

    AuthService.register(
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    ).then(
      response => {
        setMessage(response.data.message);
        setSuccessful(true);
        setLoading(false);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
        setLoading(false);
      }
    );
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: ""
  };

  return (
    <div className="col-md-12" data-testid="register-form">
      <div className="card card-container sign-up-container">
        <h2 className="text-center mb-3">Sign Up</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName" className="required"> First Name </label>
                  <Field name="firstName" type="text" className="form-control" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="alert alert-danger without-background-alert"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="required"> Last Name </label>
                  <Field name="lastName" type="text" className="form-control" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="alert alert-danger without-background-alert"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="required"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger without-background-alert"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="required"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger without-background-alert"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber" className="required"> Phone Number </label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="alert alert-danger without-background-alert"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn button btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
        {loading &&
          <span className="fa fa-circle-o-notch fa-spin" />
        }
      </div>
    </div>
  );
}
