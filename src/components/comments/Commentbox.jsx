import React, { Component } from "react";
import InputComment from "./InputComment";
import UserComment from "./UserComment";
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { createComment } from "../../store/actions/commentAction";
import { compose } from "redux";
import defaultAvatar from "../../images/defaultAvatar.png";

import "./Commentbox.scss";
class Commentbox extends Component {
  state = {
    comments: [],
    isCommentShown: false,
  };
  componentDidMount() {
    this.fetchData();
  }
  toggleComment = () => {
    this.setState({ isCommentShown: !this.state.isCommentShown });
  };
  fetchData = async () => {
    const { firestore } = this.props;
    await firestore
      .collection("comments")
      .orderBy("createdAt", "desc")
      .where("contentId", "==", this.props.contentId)
      .onSnapshot((querySnapshot) => {
        var comments = [];
        querySnapshot.forEach(function (doc) {
          comments.push({ likes: doc.data().likes, id: doc.id, ...doc.data() });
        });
        this.setState({ comments: comments });
      });
  };

  handlePostNewComment = async (e, image) => {
    await this.props.createComment({
      commentContent: e.target.value,
      commentImage: image || "",
      createdAt: moment().format(),
      contentId: this.props.contentId,
      name: this.props.profile.displayName,
      userId: this.props.auth.uid,
      avatar: this.props.profile.avatar || defaultAvatar,
    });
    this.fetchData();
  };
  render() {
    const { profile, firebase } = this.props;
    return (
      <div id="comment-component-container" style={{ ...this.props.style }}>
        <InputComment
          firebase={firebase}
          user={profile}
          handlePostNewComment={this.handlePostNewComment}
          toggleComment={this.toggleComment}
          isCommentShown={this.state.isCommentShown}
        />
        <div
          id="comment-container"
          className={
            this.state.isCommentShown ? "comment-showna" : "comment-hide"
          }
        >
          {this.state.comments &&
            this.state.comments.map((comment, index) => {
              return (
                <UserComment
                  likes={comment.likes}
                  id={comment.id}
                  key={index}
                  name={comment.name}
                  avatar={comment.avatar || defaultAvatar}
                  createdAt={moment(comment.createdAt).format("MMMM Do, YYYY")}
                  commentContent={comment.commentContent}
                  commentImage={comment.commentImage}
                  comment={comment}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(Commentbox);
