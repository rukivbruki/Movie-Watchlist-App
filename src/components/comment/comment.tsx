import * as React from 'react';
import {getDateWithFullMonth, getDate} from '../../utils/getDate.js';

interface Props {
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

const Comment = ({user: {name = ``}, rating, comment, date}: Props) => {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text" style={{
          'wordBreak': `break-word`
        }}>{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={getDate(date)}>
            {getDateWithFullMonth(date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
};

export default React.memo(Comment);
