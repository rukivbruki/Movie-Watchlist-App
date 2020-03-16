import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Paths from '../../router/paths';
import {getIsAuth} from "../../reducer/user/selectors.js";

interface Props {
  render: () => React.ReactNode;
  path: string;
  exact: boolean;
  isAuth: boolean;
}

const PrivateRoute = ({render, path, exact, isAuth}: Props) => (
  <Route
    path={path}
    exact={exact}
    render={() => {
      return (
        isAuth
          ? render()
          : <Redirect to={Paths.LOGIN} />
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps)(PrivateRoute);
