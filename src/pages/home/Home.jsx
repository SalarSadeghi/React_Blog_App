import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts/${search}`);
        if (res.status === 200) {
          setPosts(
            res.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
