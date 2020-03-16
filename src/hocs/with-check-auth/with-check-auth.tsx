import * as React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {HistoryType} from '../../types.js';
import {getIsAuth} from '../../reducer/user/selectors';
import Paths from '../../router/paths';

interface Props {
  history: HistoryType;
  isAuth: boolean;
}

const withCheckAuth = (Component) => {
  class WithCheckAuth extends React.PureComponent<Props> {
    constructor(props) {
      super(props);

      this._pushHistory = this._pushHistory.bind(this);
    }

    componentDidMount() {
      this._pushHistory();
    }

    componentDidUpdate(prevProps) {
      const {isAuth} = this.props;

      if (prevProps.isAuth === isAuth) {
        return;
      }

      this._pushHistory();
    }

    _pushHistory() {
      const {isAuth, history} = this.props;
      const path = isAuth ? Paths.INDEX : Paths.LOGIN;

      history.push(path);
    }

    render() {
      return (
        <Component {...this.props}/>
      );
    }
  }

  const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
  });

  return connect(mapStateToProps)(withRouter(WithCheckAuth));
};

export default withCheckAuth;
