import * as React from 'react';
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import Footer from '../footer/footer';
import Logo from '../logo/logo';

interface Props {
  onSubmit: (data: {
    email: string;
    password: string;
  }) => void;
  email: string;
  password: string;
  onChangeEmail: () => void;
  onChangePassword: () => void;
}

const SignIn = ({onSubmit, email, password, onChangeEmail, onChangePassword}: Props) => {
  const wrapperOnSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      email,
      password
    });
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={wrapperOnSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"

                name="user-email"
                id="user-email"
                onChange={onChangeEmail}
                value={email}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email adress</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={onChangePassword}
                value={password}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
});

const WrapperSignIn = connect(null, mapDispatchToProps)(SignIn);

export {SignIn};
export default React.memo(WrapperSignIn);
