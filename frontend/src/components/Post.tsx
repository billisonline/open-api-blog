import React from "react";
import {PostData, UserData} from "../utilities/apiTypes";

export default function ({post, author}: {post: PostData, author: UserData}) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>by {author.name}</p>
      <p>{post.body}</p>
    </div>
  );
}