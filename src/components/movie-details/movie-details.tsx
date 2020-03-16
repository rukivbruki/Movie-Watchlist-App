// Libs
import * as React from 'react';
import {connect} from "react-redux";
import {Route, Switch, Link, withRouter} from "react-router-dom";
// Utils
import {FilmsType, FilmType, HistoryType, MatchType} from "../../types";
import Paths from "../../router/paths";
import {Operation as FavoritesOperation} from "../../reducer/favorites/favorites.js";
import {getFilms} from "../../reducer/films/selectors.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card";
import {getIsAuth} from "../../reducer/user/selectors";
import {getFavorites} from "../../reducer/favorites/selectors";
// Components
import MovieList from "../movie-list/movie-list";
import Tabs from "../tabs/tabs";
import MyListButton from "../my-list-button/my-list-button";
import Avatar from "../avatar/avatar";
import Logo from '../logo/logo';

const MovieListWithActiveCard = withActiveCard(MovieList);

interface Props {
  isAuth: boolean;
  history?: HistoryType;
  match?: MatchType;
  cardData: FilmType;
  films: FilmsType;
  onOpenCard: () => void;
  filteredFilms: FilmsType;
  setActivePlayer: () => void;
  updateFavorite: (id: number, isFavorite: 0 | 1, loadFavorites: () => void) => void;
  favorites?: FilmsType;
  loadFavorites: () => void;
}

interface MovieDetailsData {
  name: string;
  genre: string;
  posterImage: string;
  released: number;
  backgroundColor: string;
  backgroundImage: string;
}

const defaultMovieDetailsData: MovieDetailsData = {
  name: ``,
  genre: ``,
  posterImage: ``,
  released: 0,
  backgroundColor: ``,
  backgroundImage: ``,
};

const MovieDetails = ({
  isAuth,
  match,
  history,
  films = [],
  onOpenCard,
  filteredFilms,
  updateFavorite,
  favorites = [],
  loadFavorites,
}: Props) => {
  const {
    path,
    url,
    params: {id}
  } = match;
  const data: FilmType | MovieDetailsData = films.find(({id: movieId}) => movieId.toString() === id) || defaultMovieDetailsData;
  const {
    name,
    genre,
    posterImage,
    released,
    backgroundColor,
    backgroundImage,
  } = data;
  const handlePlayButtonClick = () => {
    history.push(`/player/${id}`);
  };

  const renderAddReview = () => {
    if (isAuth) {
      return (
        <Link to={`${url}/review`} className="btn movie-card__button">
          Add review
        </Link>
      );
    }

    return null;
  };

  const isFavorite = !!favorites.find((film) => film.id === parseInt(id, 10));

  const handleOnClickMyList = () => {
    if (!isAuth) {
      history.push(Paths.LOGIN);
      return;
    }

    updateFavorite(id, isFavorite ? 0 : 1, loadFavorites);
  };

  const filterFilmsByOpenedFilmGenre = (filmsList, openedFilmGenre) => filmsList.filter(({genre: filmGenre}) => filmGenre === openedFilmGenre);
  const deleteCurrentFilm = (filmsList, currentFilmId) => (
    filmsList.filter(({id: filmId}) => currentFilmId !== filmId.toString())
  );

  const getPreparedFilms = (filmsList, filmId, filmGenre) => {
    const result = filterFilmsByOpenedFilmGenre(deleteCurrentFilm(filmsList, filmId), filmGenre);

    return result.slice(0, 4);
  };

  return (
    <>
    <section
      className="movie-card movie-card--full"
      style={{
        backgroundColor
      }}
    >
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo />

          <div className="user-block">
            <Avatar />
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={handlePlayButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#d9cd8d"
                >
                  <path d="M8 5v14l11-7z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
                <span>Play</span>
              </button>
              <MyListButton
                isFavorite={isFavorite}
                isAuth={isAuth}
                onClick={handleOnClickMyList}
              />
              {renderAddReview()}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img
              src={posterImage}
              alt={`${name} poster`}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item">
                  <Link to={`${url}`} className="movie-nav__link">
                    Overview
                  </Link>
                </li>
                <li className="movie-nav__item">
                  <Link to={`${url}/details`} className="movie-nav__link">
                    Details
                  </Link>
                </li>
                <li className="movie-nav__item">
                  <Link to={`${url}/reviews`} className="movie-nav__link">
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <Switch>
                <Route exact path={`${path}`}>
                  <Tabs {...data} />
                </Route>
                <Route path={Paths.FILMS_$ID_DETAILS}>
                  <Tabs {...data} tab='details'/>
                </Route>
                <Route path={Paths.FILMS_$ID_REVIEWS}>
                  <Tabs {...data} tab='reviews'/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MovieListWithActiveCard
          onOpenCard={onOpenCard}
          filteredFilms={getPreparedFilms(filteredFilms, id, genre)}
        />
      </section>
    </div>
  </>
  );
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  isAuth: getIsAuth(state),
  favorites: getFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(FavoritesOperation.loadFavorites());
  },
  updateFavorite: (id, status, cb) => {
    dispatch(FavoritesOperation.setFavoriteStatus(id, status, cb));
  }
});

export {MovieDetails};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(React.memo(MovieDetails)));
