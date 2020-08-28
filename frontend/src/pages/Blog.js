import React from "react";
import Post from "../components/Post";
import {useAuth} from "../App";

export default function () {
  const {loggedIn, currentUser, logout} = useAuth();

  const posts = [
    {
      id: 1,
      title: 'lorem ipsum',
      body: 'lwiejf wijfeiwjfwije lwffjelw fjle',
      author: {
        name: 'Alice',
      }
    },
    {
      id: 2,
      title: 'dolor sit amet',
      body: 'iejfie fiijijgnbjgnbbjgls ;lw',
      author: {
        name: 'Bob',
      }
    },
  ];

  return (loggedIn &&
    <div>
      <button onClick={logout}>Logout</button> <br />
      <h1>Welcome {currentUser.name}</h1>
      {posts.map((post) =>
        <Post key={post.id} post={post} author={post.author} />
      )}
    </div>
  );
};