import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Posts from "./Posts";
import PostDetail from "./PostDetail";
import TopicPosts from "./TopicPosts";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/CuriousLearner/til/refs/heads/main/til.json"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Posts posts={posts} />} />
        <Route path="/:path" element={<PostDetail posts={posts} />} />
        <Route path="/topic/:topic" element={<TopicPosts posts={posts} />} />
      </Routes>
    </Router>
  );
};

export default App;
