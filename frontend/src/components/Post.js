import React from "react";

export default function ({post, author}) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>by {author.name}</p>
      <p>{post.body}</p>
    </div>
  );
}