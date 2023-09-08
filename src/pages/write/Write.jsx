import { useContext, useState } from "react";
import "./write.scss";

import { Context } from "../../context/Context";
import axios from "axios";

function Write() {
  const { user } = useContext(Context);
  const imgURL =
    "https://plus.unsplash.com/premium_photo-1681823130801-274e79c16e79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
  const [userInputs, setUserInputs] = useState({
    file: null,
    title: "",
    desc: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "file"
      ? setUserInputs((prev) => ({ ...prev, [name]: e.target.files[0] }))
      : setUserInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      img: imgURL,
      cats: ["Life", "Style"],
      createdAt: Date.now(),
      desc: userInputs.desc,
      title: userInputs.title,
      userId: user.id,
      author: user.username,
    };
    try {
      const res = await axios.post("http://localhost:3001/posts", newPost);
      if (res.status === 201) {
        window.location.replace(
          "http://localhost:3000/?author=" + user.username
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="write">
      {userInputs.file && <img src={imgURL} alt="" className="writeImg" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" className="fileInputLabel">
            <i className="fileInputIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            name="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={handleChange}
            name="desc"
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
