import * as React from 'react';
import {FilmsType} from '../../types';

interface Props {
  onOpenCard?: () => void;
  filteredFilms?: FilmsType;
  maxCardsNumber?: number;
  openedFilmId?: number;
}

interface State {
  activeItem: {
    genre: string;
    previewImage: string;
    name: string;
  };
  timer: number;
}

const INITIAL_STATE = {
  genre: ``,
  previewImage: ``,
  name: ``
};

const withActiveItem = (Component) => (
  class WithActiveItem extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: INITIAL_STATE,
        timer: null
      };

      this._setActiveItem = this._setActiveItem.bind(this);
      this._removeActiveItem = this._removeActiveItem.bind(this);
      this._setTimer = this._setTimer.bind(this);
      this._getTimer = this._getTimer.bind(this);
      this._removeTimer = this._removeTimer.bind(this);
    }

    _setActiveItem(item) {
      this.setState({
        activeItem: item
      });
    }

    _removeActiveItem() {
      this.setState({
        activeItem: INITIAL_STATE
      });
    }

    _setTimer(timerId) {
      this.setState({
        timer: timerId
      });
    }

    _getTimer() {
      return this.state.timer;
    }

    _removeTimer() {
      clearTimeout(this._getTimer());
      this.setState({
        timer: null
      });
    }

    componentWillUnmount() {
      this._setActiveItem({});
      this._removeTimer();
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        setActiveItem={this._setActiveItem}
        removeActiveItem={this._removeActiveItem}
        setTimer={this._setTimer}
        getTimer={this._getTimer}
        removeTimer={this._removeTimer}/>;
    }
  }
);

export default withActiveItem;
