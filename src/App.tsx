import { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import "./App.css";

import AuthService from "./services/auth.service";
import { IUser } from './types/user.type';
import PrivateRoute from './route';

import Login from './components/Login.component';
import Register from './components/Register.component';
import Home from './components/Home.component';
import ViewUser from './components/users/View.component';
import CreateUser from './components/users/Create.component';
import EditUser from './components/users/Edit.component';

type Props = {};

type State = {
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user && user.data) {
      this.setState({
        currentUser: user.data,
        showAdminBoard: user.data.role === "Admin",
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div>
        <nav>
          <a href="http://crestinfosystems.net" target="_blank" rel="noreferrer">            
            <img src="/logo.png" alt="logo-img" className="logo-img" />
          </a>
          <ul>
            {currentUser && (
            <li>
              <Link to={'/home'}> Home </Link>
            </li>
            )}
            {showAdminBoard && (
              <li>
                <Link to={'/view-user'}> User </Link>
              </li>
            )}
          </ul>
          <ul className="float-right">
          {currentUser ? ( 
            <>
              <li>
                <a href="/login" onClick={this.logOut}>
                  Log out
                </a>
              </li>            
              <li className="welcome-text">
                <span>
                  Hi {currentUser.firstName} {currentUser.lastName}
                </span>
              </li>
            </>
          ):(
            <>
              <li>
                <Link to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
          </ul>
        </nav>
        <Switch>
          <Route exact path='/'>
            {currentUser ? <Redirect to='/home' /> : <Redirect to='/login' />}
          </Route>
          <Route path={'/register'} exact component={Register} />
          <PrivateRoute path={'/home'} component={Home} isLoggedIn={currentUser !== undefined} />
          {!currentUser ? <Route path={'/login'} exact component={Login} /> : <Route exact path='/login'><Redirect to='/home' /></Route> }
          <PrivateRoute path={'/view-user'} component={ViewUser} isLoggedIn={currentUser !== undefined} />
          <PrivateRoute path={'/create-user'} component={CreateUser} isLoggedIn={currentUser !== undefined} />
          <PrivateRoute path={'/edit-user/:id'} exact component={EditUser} isLoggedIn={currentUser !== undefined} />
        </Switch>
      </div>
    );
  }
}
export default App;