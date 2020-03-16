// Libs
import * as React from 'react';
import {connect} from "react-redux";
// Utils
import {FilmsType} from '../../types.js';
import {Operation as FavoritesOpearion} from "../../reducer/favorites/favorites.js";
import {getFavorites} from "../../reducer/favorites/selectors.js";
// Components
import Logo from "../logo/logo";
import Footer from "../footer/footer";
import Avatar from '../avatar/avatar';
import MovieCard from "../movie-card/movie-card";

interface Props {
  favorites?: FilmsType;
  loadFavorites: () => void;
}

class MyList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites = []} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <Avatar />
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {favorites.map(({id, name, genre, previewImage, videoLink}) => {
              return <MovieCard key={id} id={id} name={name} genre={genre} previewImage={previewImage} videoLink={videoLink}/>;
            })}
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: getFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(FavoritesOpearion.loadFavorites());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
