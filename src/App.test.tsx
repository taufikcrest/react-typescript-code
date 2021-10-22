import { render, screen } from '@testing-library/react';

import Home from './components/Home.component';
import Login from './components/Login.component';
import Register from './components/Register.component';
import ViewUser from './components/users/View.component';
import CreateUser from './components/users/Create.component';
import EditUser from './components/users/Edit.component';

test('renders Home page with Welcome to Crest Infosystems text', () => {
  render(<Home />);
  const textElement = screen.getByText(/Welcome to Crest Infosystems/i);
  expect(textElement).toBeInTheDocument();
});

test('renders Login page with login form', () => {
  render(<Login />);
  const checkContent = screen.getByTestId("login-form");
  expect(checkContent).toHaveTextContent("Login");
});

test('renders Register page with register form', () => {
  render(<Register />);
  const checkContent = screen.getByTestId("register-form");
  expect(checkContent).toHaveTextContent("Sign Up");
});

test('renders Create User page with Create User form', () => {
  render(<CreateUser />);
  const checkContent = screen.getByTestId("create-user-form");
  expect(checkContent).toHaveTextContent("Create User");
});

test('renders Edit User page with Edit User form', () => {
  render(<EditUser match={{ params: { id: "bbb443" }, isExact: true, path: "", url: "" }} />);
  const checkContent = screen.getByTestId("edit-user-form");
  expect(checkContent).toHaveTextContent("Edit User");
});

test('renders View User page with List of View User', () => {
  render(<ViewUser />);
  const checkContent = screen.getByTestId("view-user-form");
  expect(checkContent).toHaveTextContent("List of Users");
});