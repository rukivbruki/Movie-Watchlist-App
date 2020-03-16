// Libs
import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
// Utils
import {HistoryType, FilmsType, FilmType, MatchType} from '../../types.js';
import {Operation as FilmsOperation} from '../../reducer/films/films.js';
import {getLoading, getFilms} from '../../reducer/films/selectors.js';
import {getError} from '../../reducer/films/selectors.js';
import Paths from '../../router/paths';
// Components
import Logo from '../logo/logo';
import Avatar from '../avatar/avatar';

const DISABLE = {
  opacity: 0.2,
  cursor: `initial`
};

enum CommentsRange {
  min = 50,
  max = 400
}

interface MovieData {
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}

const defaultMovieData = {
  name: ``,
  posterImage: ``,
  backgroundImage: ``,
  backgroundColor: ``
};

interface Props {
  history?: HistoryType;
  loading?: boolean;
  onSubmit: (id: number, {
    rating: number,
    comment: string
  }, cb: () => void) => void;
  id: number;
  comment: string;
  rating: number;
  onChangeComment: () => void;
  onChangeRating: () => void;
  error?: string;
  films?: FilmsType;
  match?: MatchType;
}

const AddReview = ({match, films = [], history, onSubmit, loading, error: requestError, comment, rating, onChangeComment, onChangeRating}: Props) => {
  const {params: {id = ``} = {}} = match;
  const data: FilmType | MovieData = films.find(({id: movieId}) => movieId.toString() === id) || defaultMovieData;

  const {
    name,
    posterImage,
    backgroundImage,
    backgroundColor
  } = data;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (comment.length >= CommentsRange.min) {
      onSubmit(id, {
        rating,
        comment,
      }, () => {
        history.push(Paths.INDEX);
      });
    }
  };

  return (
    <section className="movie-card movie-card--full" style={{
      backgroundColor
    }}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <Avatar />
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review" style={loading ? DISABLE : {}}>
        <form action="#" className="add-review__form" onSubmit={handleOnSubmit}>
          <div className="rating">
            <div className="rating__stars" onChange={onChangeRating}>
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" defaultChecked={rating === 1}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" defaultChecked={rating === 2}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked={rating === 3}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" defaultChecked={rating === 4}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" defaultChecked={rating === 5} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          {requestError ? <div>{`При отправке возникла ошибка: ${requestError}`}</div> : null}
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={CommentsRange.min}
              maxLength={CommentsRange.max}
              value={comment}
              onChange={onChangeComment}
            ></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                style={comment.length < CommentsRange.min ? DISABLE : {}}
              >
                Post
              </button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: getLoading(state),
  error: getError(state),
  films: getFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, data, cb) {
    dispatch(FilmsOperation.addComment(id, data, cb));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddReview));
