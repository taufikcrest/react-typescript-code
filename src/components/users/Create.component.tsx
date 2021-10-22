import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import UsersService from "../../services/users.service";

function CreateUser(props: any) {
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

    const handleCreateUser = (formValue: { firstName: string; lastName: string; email: string; password: string; phoneNumber: string; }) => {
        setMessage("");
        setSuccessful(false);
        setLoading(true);

        UsersService.create(
            formValue
        ).then(
            response => {
                setMessage("");
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
        <div data-testid="create-user-form">
            <div className={"col-md-12 form-wrapper"}>
                <h2 className="text-center"> Create User </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateUser}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="firstName" className="required"> First Name </label>
                                    <Field name="firstName" type="text" className="form-control" required />
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
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <button className="w-100 btn button" type="submit">
                                            Create User
                                        </button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button className="w-100 btn outline-button" onClick={(e) => props.history.push('/view-user')}>
                                            Cancel
                                        </button>
                                    </div>
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
    )
}
export default CreateUser;