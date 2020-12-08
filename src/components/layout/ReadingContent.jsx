import React from "react";
import defaultImage from "../../images/defaultAvatar.png";
import saveIcon from "../../svg/save.svg";
import "./ReadingContent.scss";
import testImage from "../../images/testImage1.jpeg";

const ReadingContent = (props) => {
  const { profile, post } = props;
  return (
    <div id="reading-content-container">
      <div id="reading-content-header">
        <button id="save-icon-button">
          <img id="save-icon" src={saveIcon} alt="saveIcon"></img>
        </button>
        <div id="author-info">
          <img id="author-ava" src={profile.avatar}></img>
          <div id="author-name-date">
            <a id="author-name">{profile.displayName}</a>
            <p id="post-date">{post.postDate}</p>
          </div>
        </div>
      </div>
      <div id="reading-content-preheader">
        <p id="reading-content-title">{post.title}</p>
        <p id="reading-content-subtitle">{post.subtitle}</p>
      </div>
      <img
        className="reading-content-image"
        src={post.image}
        alt="title-image"
      />
      <p className="reading-content-body-title"></p>
      <p className="reading-content-body-paragraph"></p>
      <div id="reading-content-body">
        {post.contents.map((item, index) => (
          <div key={index}>
            <p className="reading-content-body-title" key={index}>
              {item.title}
            </p>
            {item.content.map((pItem, index) => (
              <p className="reading-content-body-paragraph">{pItem}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingContent;