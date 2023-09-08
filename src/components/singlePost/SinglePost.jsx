import { Link, useParams } from "react-router-dom";
import "./singlePost.scss";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Context } from "../../context/Context";

function SinglePost() {
  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [userUpdateInput, setUserUpdateInput] = useState({
    title: "",
    desc: "",
  });
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts?id=${postId}`);
        if (res.status === 200) {
          setPost(res.data[0]);
          setUserUpdateInput({
            title: res.data[0].title,
            desc: res.data[0].desc,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/posts/${id}`);
      if (res.status === 200) {
        window.location.replace(
          `http://localhost:3000/?author=${user.username}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/posts/${postId}`, {
        ...post,
        title: userUpdateInput.title,
        desc: userUpdateInput.desc,
      });
      if (res.status === 200) {
        setUpdateMode(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img src={post.img} alt="" className="singlePostImg" />
        {updateMode ? (
          <input
            type="text"
            value={userUpdateInput.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) =>
              setUserUpdateInput((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        ) : (
          <h1 className="singlePostTitle">
            {userUpdateInput.title}
            {post.author === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={() => handleDelete(post.id)}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link className="link" to={`/?author=${post.author}`}>
              <b>{post.author}</b>
            </Link>
          </span>
          <span className="singlePostDate">{format(post.createdAt)}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={userUpdateInput.desc}
            onChange={(e) =>
              setUserUpdateInput((prev) => ({ ...prev, desc: e.target.value }))
            }
          />
        ) : (
          <p className="singlePostDesc">{userUpdateInput.desc}</p>
        )}
        {updateMode && (
          <button className="updateBtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
