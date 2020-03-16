// Libs
import * as React from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router-dom";
// Utils
import Paths from '../../router/paths';
import {FilmsType, FilmType, HistoryType} from "../../types";
import {getFilmsByGenre} from "../../reducer/films/selectors";
import {getGenreFilter} from "../../reducer/genres/selectors";
import {getFilms} from "../../reducer/films/selectors";
import {getUser, getIsAuth} from "../../reducer/user/selectors.js";
import withProgress from "../../hocs/with-progress/with-progress";
import withInputs from "../../hocs/with-inputs/with-inputs";
import withCheckAuth from "../../hocs/with-check-auth/with-check-auth";
import withReviewData from "../../hocs/with-review-data/with-review-data";
// Components
import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import VideoPlayer from "../video-player/video-player";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import MyList from "../my-list/my-list";
import PrivateRoute from '../private-route/private-route';
import {getPromo} from "../../reducer/promo/selectors";

const VideoPlayerWithProgress = withProgress(VideoPlayer);
const SignInWithInputs = withCheckAuth(withInputs(SignIn));
const RewiewWithReviewData = withReviewData(AddReview);

interface Props {
  setActiveItem: (data: FilmType) => void;
  setActivePlayer: (activePlayer: boolean) => void;
  filteredFilms: FilmsType;
  activeItem?: FilmType;
  promo: FilmType;
  history?: HistoryType;
  films: FilmsType;
  activePlayer?: boolean;
}

class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this._handleOpenCard = this._handleOpenCard.bind(this);
    this._renderVideoPlayer = this._renderVideoPlayer.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  _handleOpenCard(data: FilmType) {
    const {setActiveItem} = this.props;
    setActiveItem(data);
  }

  _renderVideoPlayer() {
    const {setActivePlayer, films} = this.props;
    return <VideoPlayerWithProgress setActivePlayer={setActivePlayer} films={films}/>;
  }

  _renderApp() {
    const {filteredFilms, activeItem, promo, setActivePlayer, history, films} = this.props;
    return (
      <Switch>
        <Route exact path={Paths.INDEX}>
          <Main
            {...this.props}
            onOpenCard={this._handleOpenCard}
            filteredFilms={filteredFilms}
            promoData={promo}
            history={history}
          />
        </Route>
        <Route path={Paths.FILMS_$ID_PLAYER}>
          <VideoPlayerWithProgress setActivePlayer={setActivePlayer} history={history} films={films}/>
        </Route>
        <PrivateRoute exact path={Paths.FILMS_$ID_REVIEW} render={() => (
          <RewiewWithReviewData />
        )}>
        </PrivateRoute>
        <Route path={Paths.FILMS_$ID}>
          <MovieDetails
            {...this.props}
            cardData={activeItem}
            onOpenCard={this._handleOpenCard}
            filteredFilms={filteredFilms}
            setActivePlayer={setActivePlayer}
          />
        </Route>
        <Route path={Paths.LOGIN}>
          <SignInWithInputs />
        </Route>
        <PrivateRoute exact path={Paths.MY_LIST} render={() => (
          <MyList />
        )}>
        </PrivateRoute>
      </Switch>
    );
  }

  render() {
    return this.props.activePlayer
      ? this._renderVideoPlayer()
      : this._renderApp();
  }
}

const mapStateToProps = (state) => ({
  films: getFilms(state),
  genreFilter: getGenreFilter(state),
  filteredFilms: getFilmsByGenre(state),
  user: getUser(state),
  isAuth: getIsAuth(state),
  promo: getPromo(state)
});

const AppWrapper = connect(mapStateToProps)(App);

export {App};
export default withRouter(AppWrapper);
