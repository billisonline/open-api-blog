import React from "react";
import {PostData, UserData} from "../utilities/apiTypes";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";

export default function ({post, author}: { post: PostData, author: UserData }) {
    const authContext = useAuthContext();

    const {userCan} = useAuthPermissions(authContext);

    return (
        <div>
            <h2>
                {post.title}
                {userCan('delete post', post) && (
                    <span>🗑</span>
                )}
            </h2>
            <p>by {author.name}</p>
            <p>{post.body}</p>
        </div>
    );
}