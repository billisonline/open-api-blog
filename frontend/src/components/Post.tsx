import React, {createFactory as factory} from "react";
import {PostData, UserData} from "../utilities/apiTypes";

export default function ({post, author, showUpdate, showDelete, UpdateProvider, DeleteProvider}: {
    post: PostData,
    author: UserData,
    showUpdate: boolean,
    showDelete: boolean,
    UpdateProvider: React.FunctionComponent<{makeUpdateComponent: React.FunctionComponentFactory<{disabled: boolean}>}>,
    DeleteProvider: React.FunctionComponent<{makeDeleteComponent: React.FunctionComponentFactory<{disabled: boolean}>}>,
}) {
    return (
        <div>
            <h2>
                {post.title}
                {showUpdate && (
                    <UpdateProvider makeUpdateComponent={factory(({disabled}) => (
                        <button disabled={disabled}>📝</button>
                    ))}/>
                )}
                {showDelete && (
                    <DeleteProvider makeDeleteComponent={factory(({disabled}) => (
                        <button disabled={disabled}>🗑</button>
                    ))}/>
                )}
            </h2>
            <p>by {author.name}</p>
            <p>{post.body}</p>
        </div>
    );
}