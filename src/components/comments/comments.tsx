import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {CommentsType, MatchType, CommentType} from '../../types.js';
import {getComments} from '../../reducer/films/selectors';
import {Operation as FilmsOperation} from "../../reducer/films/films.js";
import Comment from '../comment/comment';

interface Props {
  commentsData?: CommentsType;
  match?: MatchType;
  loadComments: (id: number) => void;
}

class Comments extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadComments, match: {
      params: {
        id
      }
    }} = this.props;
    loadComments(id);
  }

  render() {
    const {commentsData = []} = this.props;

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {commentsData.map((data: CommentType) => {
            const {id} = data;
            return <Comment key={id} {...data}/>;
          })}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  commentsData: getComments(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(FilmsOperation.loadComments(id));
  },
});

export {Comments};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Comments));
