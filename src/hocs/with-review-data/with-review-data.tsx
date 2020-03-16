import * as React from 'react';

interface State {
  comment: string;
  rating: number;
}

const withReviewData = (Component) => (
  class WithReviewData extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        rating: 3
      };

      this._handleChangeComment = this._handleChangeComment.bind(this);
      this._handleChangeRating = this._handleChangeRating.bind(this);
    }

    _handleChangeComment({target: {value: comment = ``} = {}}) {
      this.setState({
        comment
      });
    }

    _handleChangeRating({target: {value: rating = ``} = {}}) {
      this.setState({
        rating: parseInt(rating, 10)
      });
    }

    render() {
      const {comment, rating} = this.state;

      return (
        <Component
          {...this.props}
          comment={comment}
          rating={rating}
          onChangeComment={this._handleChangeComment}
          onChangeRating={this._handleChangeRating}/>
      );
    }
  }
);

export default withReviewData;
