import React from "react";
import {PostData, UserData} from "../utilities/apiTypes";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";
import {Link} from "react-router-dom";

export default function ({post, author, updatePostUrl, deletePostCallback}: {
    post: PostData,
    author: UserData,
    updatePostUrl: string,
    deletePostCallback: (post: PostData) => void,
}) {
    const authContext = useAuthContext();

    const {userCan} = useAuthPermissions(authContext);

    return (
        <div>
            <h2>
                {post.title}
                {userCan('update post', post) && (
                    <Link to={updatePostUrl}>
                        <button>📝</button>
                    </Link>
                )}
                {userCan('delete post', post) && (
                    <button onClick={() => deletePostCallback(post)}>🗑</button>
                )}
            </h2>
            <p>by {author.name}</p>
            <p>{post.body}</p>
        </div>
    );
}