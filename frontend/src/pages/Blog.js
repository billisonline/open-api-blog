import React from "react";
import Post from "../components/Post";

export default function () {
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

  return (
    <div>
      {posts.map((post) =>
        <Post key={post.id} post={post} author={post.author} />
      )}
    </div>
  );
};