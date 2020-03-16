import * as React from 'react';
import {withRouter} from "react-router-dom";
import convertTime from '../../utils/convertTime.js';
import Comments from '../comments/comments';

enum Levels {
  BAD = `Bad`,
  NORMAL = `Normal`,
  GOOD = `Good`,
  VERY_GOOD = `Very Good`,
  AWESOME = `Awesome`
}

enum TabNames {
  details = `details`,
  reviews = `reviews`
}

const getNumberInRange = (number, min, max) => number >= min && number < max;

const getRatingLevelByScore = (score) => {
  const {BAD, NORMAL, GOOD, VERY_GOOD, AWESOME} = Levels;
  const DEFAULT = `-`;

  if (getNumberInRange(score, 0, 3)) {
    return BAD;
  } else if (getNumberInRange(score, 3, 5)) {
    return NORMAL;

  } else if (getNumberInRange(score, 5, 8)) {
    return GOOD;

  } else if (getNumberInRange(score, 8, 10)) {
    return VERY_GOOD;
  } else if (score === 10) {
    return AWESOME;
  }

  return DEFAULT;
};

interface Props {
  description?: string;
  rating?: number;
  scoresCount?: number;
  director?: string;
  starring?: string[];
  genre?: string;
  runTime?: number;
  released?: number;
  tab?: string;
  id?: number;
}

const Tabs = ({description, rating, scoresCount, director, starring = [], genre, runTime, released, tab, id}: Props) => {
  const renderOverview = () => (
      <>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getRatingLevelByScore(rating)}</span>
        <span className="movie-rating__count">{`${scoresCount} ratings`}</span>
      </p>
    </div>

  <div className="movie-card__text">
    <p>
      {description}
    </p>

    <p className="movie-card__director">
      <strong>{`Director: ${director}`}</strong>
    </p>

    <p className="movie-card__starring">
      <strong>
        {starring.join(`, `)}
      </strong>
    </p>
  </div>
  </>
  );

  const renderDetails = () => (
      <>
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.join(`, `)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{convertTime(runTime)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  </>
  );

  const renderReviews = () => (
    <Comments id={id}/>
  );

  const renderActiveTab = () => {
    if (tab === TabNames.details) {
      return renderDetails();
    } else if (tab === TabNames.reviews) {
      return renderReviews();
    } else {
      return renderOverview();
    }

  };

  return (
    renderActiveTab()
  );
};

export {Tabs};
export default withRouter(React.memo(Tabs));

