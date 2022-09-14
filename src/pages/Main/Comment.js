import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ cmt }) => {
  return (
    <div className="container">
      <div className="comment_wrapper">
        <p>
          <strong>zioni</strong>
          {cmt.content}
        </p>
      </div>
      <FontAwesomeIcon className="heartIcon" icon={faHeart} />
    </div>
  );
};

export default Comment;
