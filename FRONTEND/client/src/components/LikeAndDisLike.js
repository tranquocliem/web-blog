import React, { useState, useEffect } from "react";
import LikeDisLikeService from "../Services/LikeDisLikeService";

function LikeAndDisLike(props) {
  //like and dislike
  const [activeLike, setActiveLike] = useState(null);
  const [activeDisLike, setActiveDisLike] = useState(null);
  const [Likes, setLikes] = useState(0);
  const [disLikes, setDisLikes] = useState(0);

  const variable = { blogId: props.postId, userId: props.userId };

  // Get Like And DisLike
  useEffect(() => {
    //Get Like
    LikeDisLikeService.getLike(variable).then((data) => {
      const { likes } = data;
      if (data.success) {
        setLikes(likes.length);

        //nếu người đang đăng nhập đã like bài này rồi ta set lại cái activeLike(true) tức đã like
        data.likes.map((like) => {
          if (like.userId === props.userId) {
            setActiveLike("liked");
          }
        });
      } else {
        alert("Get Like Error");
      }
    });
    //Get DisLike
    LikeDisLikeService.getDisLike(variable).then((data) => {
      const { disLikes } = data;
      if (data.success) {
        setDisLikes(disLikes.length);

        //nếu người đang đăng nhập đã dislike bài này rồi ta set lại cái activeDisLike(true) tức đã dislike
        data.disLikes.map((disLike) => {
          if (disLike.userId === props.userId) {
            setActiveDisLike("disliked");
          }
        });
      } else {
        alert("Get DisLike Error");
      }
    });
  }, []);

  //console.log(activeLike);
  //console.log(activeDisLike);
  //function Like And DisLike
  const onLike = () => {
    if (activeLike === null) {
      LikeDisLikeService.upLike(variable).then((data) => {
        if (data.success) {
          setLikes(Likes + 1);
          setActiveLike("liked");

          //nếu nút dislike đã đã đc click thì ta xoá nó đi
          if (activeDisLike) {
            setDisLikes(disLikes - 1);
            setActiveDisLike(null);
          }
        } else {
          alert("On Click Like Error");
        }
      });
    } else {
      LikeDisLikeService.unLike(variable).then((data) => {
        if (data.success) {
          setLikes(Likes - 1);
          setActiveLike(null);
        } else {
          alert("On Click Like Error Un");
        }
      });
    }
  };
  const onDisLike = () => {
    if (activeDisLike === null) {
      LikeDisLikeService.upDisLike(variable).then((data) => {
        if (data.success) {
          setDisLikes(disLikes + 1);
          setActiveDisLike("disliked");

          //nếu nút like đã được click thì xoá nó đi
          if (activeLike !== null) {
            setLikes(Likes - 1);
            setActiveLike(null);
          }
        } else {
          alert("On Click DisLike Error");
        }
      });
    } else {
      LikeDisLikeService.unDisLike(variable).then((data) => {
        if (data.success) {
          setDisLikes(disLikes - 1);
          setActiveDisLike(null);
        } else {
          alert("On Click DisLike Error");
        }
      });
    }
  };

  return (
    <div className="row">
      <div className="col">
        <button type="button" onClick={onLike} className="btn btn-primary">
          <i
            className={
              activeLike === "liked"
                ? "fas fa-thumbs-up mx-2"
                : "far fa-thumbs-up mx-2"
            }
          ></i>
          {Likes}
        </button>
        <button
          type="button"
          onClick={onDisLike}
          className="btn btn-primary mx-2"
        >
          <i
            className={
              activeDisLike === "disliked"
                ? "fas fa-thumbs-down mx-2"
                : "far fa-thumbs-down mx-2"
            }
          ></i>
          {disLikes}
        </button>
        <button type="button" className="btn btn-primary mx-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https://tintuc-it.herokuapp.com/#/"
          >
            Share <i className="fab fa-facebook"></i>
          </a>
        </button>
      </div>
    </div>
  );
}

export default LikeAndDisLike;
