import * as React from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Paths from '../../router/paths';
import {UserType, HistoryType} from '../../types.js';
import {getUser, getIsAuth} from "../../reducer/user/selectors";

const ORIGIN = `https://htmlacademy-react-3.appspot.com`;

const defautUsetData = {
  id: 1,
  name: ``,
  email: ``,
  avatarUrl: ``
};

interface Props {
  history?: HistoryType;
  isAuth?: boolean;
  userData?: UserType;
}

const Avatar = ({history, isAuth, userData = defautUsetData}: Props) => {
  const {avatarUrl = ``} = userData;

  const handleClickAvatar = () => {
    history.push(Paths.MY_LIST);
  };
  if (isAuth) {
    return (
      <div className="user-block__avatar" onClick={handleClickAvatar}>
        <img
          src={`${ORIGIN}${avatarUrl}`}
          alt="User avatar"
          width="63"
          height="63"
        />
      </div>
    );
  } else {
    return (
      <Link to={Paths.LOGIN} className="sign-in__link">
        Sign In
      </Link>
    );
  }
};

const mapStateToProps = (state) => ({
  userData: getUser(state),
  isAuth: getIsAuth(state)
});

export {Avatar};
export default connect(mapStateToProps)(React.memo(withRouter(Avatar)));
