import React, { useEffect, useState } from "react";
import "../../css/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import Comment from "./Comment";

const Feed = ({ feed }) => {
  const [comment, setComment] = useState("");
  const [id, setId] = useState(1);
  const [feedComments, setFeedComments] = useState([]);
  const [commentList, setCommentList] = useState([
    {
      id: 0,
      content: "안녕하세요",
    },
  ]);

  useEffect(() => {
    fetch("/data/comments.json")
      .then((res) => res.json())
      .then((data) => setFeedComments(data.comments));
  }, []);

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = () => {
    setId(id + 1);
    // map메서드 사용할때 key값으로 index안주고 id값 따로 설정함
    const newComment = { id: id, content: comment };

    setComment("");
    setCommentList([...commentList, newComment]);
  };

  return (
    <main>
      <div className="main-feed">
        <div className="main-feed-header">
          <img src={feed.imageUrl} alt="" />
          <p>zioni_o</p>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>

        <div className="main-picture">
          <img src={feed.imageUrl} className="imgs" alt="뭉치" />
        </div>
        <div className="main-icon">
          <div className="icon-wrapper1">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
          </div>
          <div className="icon-wrapper2"></div>
        </div>
        <div className="main-wrapper">
          <div className="main-counter">
            <img src="/assets/zioni.jpeg" alt="" />
            <p>
              <strong>zioni</strong>님 외 10명이 좋아합니다
            </p>
          </div>
          <div className="main-title">
            <div className="main-title-top">
              <strong>{feed.userName}</strong>
              <p>{feed.title}</p>
            </div>
            <div className="title-id">
              <p className="nickName"></p>
              <p className="main-content"></p>
              <p>더보기</p>
            </div>

            <p>
              {feedComments.map((comments) => {
                return (
                  <div className="comment-id" key={comments.feedId}>
                    <div>
                      <strong>{comments.userName}</strong>
                      <div>{comments.contents}</div>
                    </div>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                );
              })}
            </p>

            {commentList.map((comments) => {
              return <Comment cmt={comments} key={comments.id} />;
            })}
            <p className="time">42분 전</p>
          </div>

          <div className="add-comment">
            <input
              value={comment}
              onChange={handleInput}
              onKeyPress={handleInputEnter}
              className="comment-write-input"
              id="comment"
              placeholder="댓글 달기..."
            ></input>
            <button
              onClick={handleClick}
              className="comment-write-button"
              id="submit"
            >
              게시
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;
