import * as React from 'react';

interface Props {
  genre: string;
  onClick: (event?: React.MouseEvent) => void;
  activeClass?: string;
}

const GenresItem = ({genre, onClick, activeClass}: Props) => (
  <li
    key={genre}
    className={`catalog__genres-item ${activeClass}`}
  >
    <a
      href="#"
      className="catalog__genres-link"
      onClick={onClick}
    >
      {genre}
    </a>
  </li>
);

export default React.memo(GenresItem);
