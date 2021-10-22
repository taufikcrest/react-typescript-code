import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UsersService from "../../services/users.service";
import { USER_DELETE_SUCCESS_MSG } from "../../utils/messageConstant";

export default function ViewUser(props: any) {
    const [users, setUsers] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        UsersService.getAll().then(res => {
            setUsers(res.data.data);
            setLoading(false);
        })
    }, []);

    const deleteUser = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user entry from list?")) {
            UsersService.delete(id).then(data => {
                const index = users.findIndex(user => user._id === id);
                users.splice(index, 1);
                setMessage(USER_DELETE_SUCCESS_MSG);
                setSuccessful(true);
                setLoading(false);
                props.history.push('/view-user');
                setTimeout(() => {
                    setMessage("");
                }, 1500)
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
                })
        }
    }

    return (
        <div className="container" data-testid="view-user-form">
            <button className="mt-5 btn button" onClick={(e) => props.history.push('/create-user')}>
                Create user
            </button>
            <div>
                {message && (
                    <div className="form-group mt-2">
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
                {loading &&
                    <span className="fa fa-circle-o-notch fa-spin" />
                }
                <h3 className="text-center">List of Users</h3>
                {users.length === 0 && (
                    <div className="text-center">
                        <h2>No user found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, index) =>
                                    <tr key={user._id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit-user/${user._id}`} data-testid={`edit-user-row-id-${index}`} className="btn btn-sm outline-button mr-2">Edit User </Link>
                                                    <button className="btn btn-sm outline-button" onClick={() => deleteUser(user._id)}>Delete User</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
