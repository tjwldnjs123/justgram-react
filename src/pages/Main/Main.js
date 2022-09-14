import React, { useEffect, useState } from "react";
import "../../css/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faCompass, faUser } from "@fortawesome/free-solid-svg-icons";

import Feed from "./Feed";
import { Link } from "react-router-dom";

const Main = () => {
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/data/feed.json")
      .then((res) => res.json())
      .then((data) => setFeed(data.feeds));
  }, []);

  useEffect(() => {
    fetch("http://auth.jaejun.me:10010/me", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.email));
  }, [user]);

  return (
    <React.Fragment>
      <div className="wrapper">
        <header className="nav-container">
          <div className="nav-wrapper">
            <div className="nav-left">
              <FontAwesomeIcon id="instagram" icon={faInstagram} />
              <p>Justgram</p>
            </div>
            <div className="nav-center">
              <input type="text" placeholder="검색" />
            </div>
            <div className="nav-right">
              <FontAwesomeIcon icon={faCompass} />
              <FontAwesomeIcon icon={faHeart} />
              {user ? (
                user
              ) : (
                <Link to="/">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              )}
            </div>
          </div>
        </header>
        {feed.map((feeds) => {
          return <Feed key={feeds.id} feed={feeds} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default Main;
