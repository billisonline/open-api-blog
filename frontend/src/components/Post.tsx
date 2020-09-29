import React from "react";
import {PostData, UserData} from "../utilities/apiTypes";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";

export default function ({post, author, deletePost}: {
    post: PostData,
    author: UserData,
    deletePost: (post: PostData) => void,
}) {
    const authContext = useAuthContext();

    const {userCan} = useAuthPermissions(authContext);

    return (
        <div>
            <h2>
                {post.title}
                {userCan('delete post', post) && (
                    <button onClick={() => deletePost(post)}>🗑</button>
                )}
            </h2>
            <p>by {author.name}</p>
            <p>{post.body}</p>
        </div>
    );
}