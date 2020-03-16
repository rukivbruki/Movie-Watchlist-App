// Libs
import * as React from "react";
import {connect} from "react-redux";
// Utils
import {FilmsType} from '../../types';
import {ActionCreator} from "../../reducer/genres/genres.js";
import {getGenreFilter, getGenres} from "../../reducer/genres/selectors";
import {getFilms} from "../../reducer/films/selectors";
// Components
import GenresItem from '../genres-item/genres-item';

const SELECTED_GENRE_CLASS = `catalog__genres-item--active`;

interface Props {
  genres: string[];
  genreFilter?: string;
  films: FilmsType;
  onSelectGenre: (genre: string, films: FilmsType) => void;
}

const Genres = ({genres = [], genreFilter, films, onSelectGenre}: Props) => {
  const handleOnSelectGenre = (e, genre) => {
    e.preventDefault();

    onSelectGenre(genre, films);
  };

  const preparedList = genres.map((genre) => {
    const wrapperHandlerOnSelectGenre = (e) => handleOnSelectGenre(e, genre);
    const activeClass = genreFilter === genre ? SELECTED_GENRE_CLASS : ``;

    return (
      <GenresItem
        key={genre}
        genre={genre}
        onClick={wrapperHandlerOnSelectGenre}
        activeClass={activeClass}/>
    );
  });

  return (
    <ul className="catalog__genres-list">
      {preparedList}
    </ul>
  );
};

Genres.defaultProps = {
  selectedGenre: `All genres`,
  genresList: [],
  onSelectGenre: () => void 0,
  films: []
};

const mapStateToProps = (state) => ({
  genres: getGenres(state).slice(0, 8),
  genreFilter: getGenreFilter(state),
  films: getFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSelectGenre: (genre) => {
    dispatch(ActionCreator.selectGenreFilter(genre));
  }
});

export {Genres};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Genres));
