import * as React from 'react';
import {Link} from "react-router-dom";
import {HistoryType} from '../../types.js';
import Player from "../player/player";

const SHOW_PREVIEW_DELAY = 1000;
const LINK_STYLES = {
  width: `100%`,
  height: `100%`,
  display: `flex`,
  alignItems: `flex-end`
};
const TITLE_STYLES = {
  width: `100%`,
  height: `100%`
};

interface ActiveItem {
  genre: string;
  previewImage: string;
  name: string;
}

interface Props {
  key: number;
  history?: HistoryType;
  id: number;
  name: string;
  genre: string;
  previewImage: string;
  videoLink: string;
  setActiveItem?: (activeItem: ActiveItem) => void;
  removeActiveItem?: () => void;
  setTimer?: (mouseOverTimer: number) => void;
  getTimer?: () => number;
  removeTimer?: (id: number) => void;
  onOpenCard?: (card: {
    id: number;
  }) => void;
  active?: boolean;
}

const MovieCard = ({
  id,
  name,
  genre,
  previewImage,
  videoLink,
  setActiveItem,
  removeActiveItem,
  setTimer,
  getTimer,
  removeTimer,
  onOpenCard,
  active
}: Props) => {
  const onMouseEnter = () => {
    const mouseOverTimer: number = window.setTimeout(() => {
      setActiveItem({genre, previewImage, name});
    }, SHOW_PREVIEW_DELAY);

    setTimer(mouseOverTimer);
  };

  const onMouseLeave = () => {
    const timerId: number = getTimer();
    removeTimer(timerId);

    removeActiveItem();
  };

  const onOpenCardWrapper = (e) => {
    e.preventDefault();

    onOpenCard({
      id,
    });
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      key={name}
      onClick={onOpenCardWrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: `relative`
      }}
    >
      <div className="small-movie-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        style={TITLE_STYLES}
      >
        <Link
          to={`/films/${id}`}
          className="small-movie-card__link"
          style={LINK_STYLES}
        >
          {name}
        </Link>
      </h3>
      <Player active={active} src={videoLink} img={previewImage} />
    </article>
  );
};

MovieCard.defaultProps = {
  setTimer: () => void 0,
  getTimer: () => void 0,
  setActiveItem: () => void 0,
  removeActiveItem: () => void 0,
  removeTimer: () => void 0
};

export default React.memo(MovieCard);
