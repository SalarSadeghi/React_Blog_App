import { Link } from "react-router-dom";
import "./post.scss";
import { format } from "timeago.js";

function Post({ post }) {
  return (
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <div className="postInfo">
        <div className="postCats">
          {post.cats.map((cat) => (
            <span className="postCat">{cat}</span>
          ))}
        </div>
        <span className="postTitle"><Link className="link" to={`/posts/${post.id}`}>{post.title}</Link></span>
        <hr />
        <span className="postDate">{format(post.createdAt)}</span>
        <span className="postDesc">{post.desc}</span>
      </div>
    </div>
  );
}

export default Post;
