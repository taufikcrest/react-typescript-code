import { Redirect, Route, RouteProps } from 'react-router';

export type PrivateRouteProps = {
  isLoggedIn: boolean;
} & RouteProps;

export default function PrivateRoute({isLoggedIn, ...routeProps}: PrivateRouteProps) {
  if(isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: routeProps.location?.pathname }} />;
  }
};
