import React, {useEffect, useState} from "react";
import Post from "../components/Post";
import {useAuth} from "../App";
import useAuthApi from "../hooks/useAuthApi";
import {isResponseSuccessfulWithData, makeAxios} from "../utilities";

export default function () {
  const {loggedIn, currentUser, logout} = useAuthApi(useAuth());

  const [posts, setPosts] = useState([]);

  const axios = makeAxios(logout);

  useEffect(() => {
    axios.get('/api/posts?withAuthor=true')
      .then((response) => {
        if (isResponseSuccessfulWithData(response)) {
          setPosts(response.data.data);
        }
      })
  }, []);

  return (loggedIn &&
    <div>
      <button onClick={logout}>Logout</button>
      <br />
      <h1>Welcome {currentUser.name}</h1>
      {posts.map((post) =>
        <Post key={post.id} post={post} author={post.author} />
      )}
    </div>
  );
};