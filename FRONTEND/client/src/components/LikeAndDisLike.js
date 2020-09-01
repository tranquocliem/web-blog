import React, { useState, useEffect } from "react";
import LikeDisLikeService from "../Services/LikeDisLikeService";

function LikeAndDisLike(props) {
  //like and dislike
  const [activeLike, setActiveLike] = useState(false);
  const [activeDisLike, setActiveDisLike] = useState(false);
  const [Likes, setLikes] = useState(0);
  const [disLikes, setDisLikes] = useState(0);

  const variable = { blogId: props.postId, userId: props.userId };

  //Get Like And DisLike
  useEffect(() => {
    //Get Like
    LikeDisLikeService.getLike(variable).then((data) => {
      const { likes } = data;
      if (data.success) {
        setLikes(likes.length);

        //nếu người đang đăng nhập đã like bài này rồi ta set lại cái activeLike(true) tức đã like
        data.likes.map((like) => {
          if (like.userId === props.userId) {
            setActiveLike(true);
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
            setActiveDisLike(true);
          }
        });
      } else {
        alert("Get DisLike Error");
      }
    });
  }, []);

  //function Like And DisLike
  const onLike = () => {
    if (!activeLike) {
      LikeDisLikeService.upLike(variable).then((data) => {
        if (data.success) {
          setLikes(Likes + 1);
          setActiveLike(true);

          //nếu nút dislike đã đã đc click thì ta xoá nó đi
          if (activeDisLike) {
            setDisLikes(disLikes - 1);
            setActiveDisLike(false);
          }
        } else {
          alert("On Click Like Error");
        }
      });
    } else {
      LikeDisLikeService.unLike(variable).then((data) => {
        if (data.success) {
          setLikes(Likes - 1);
          setActiveLike(false);
        } else {
          alert("On Click Like Error Un");
        }
      });
    }
  };
  const onDisLike = () => {
    if (!activeDisLike) {
      LikeDisLikeService.upDisLike(variable).then((data) => {
        if (data.success) {
          setDisLikes(disLikes + 1);
          setActiveDisLike(true);

          //nếu nút like đã được click thì xoá nó đi
          if (activeLike) {
            setLikes(Likes - 1);
            setActiveLike(false);
          }
        } else {
          alert("On Click DisLike Error");
        }
      });
    } else {
      LikeDisLikeService.unDisLike(variable).then((data) => {
        if (data.success) {
          setDisLikes(disLikes - 1);
          setActiveDisLike(false);
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
              activeLike ? "fas fa-thumbs-up mx-2" : "far fa-thumbs-up mx-2"
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
              activeDisLike
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
