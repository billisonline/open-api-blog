import React from "react";
import {PostData} from "../utilities/apiTypes";
import {Link} from "react-router-dom";
import {truncate} from "../utilities";

function PostPreview ({post}: {post: PostData}) {
    return (
        <div>
            <p className="text-sm leading-5 text-gray-500">
                <time dateTime="2020-03-16">
                    Mar 16, 2020
                    &nbsp;—&nbsp;
                    {post.author.name}
                </time>
            </p>
            <Link to={`blog/${post.id}`} className="block">
                <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                    {post.title}
                </h3>
                <p className="mt-3 text-base leading-6 text-gray-500">
                    {truncate(post.body, 150)}
                </p>
            </Link>
            <div className="mt-3">
                <Link to={`blog/${post.id}`}
                   className="text-base leading-6 font-semibold text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                    Read full story
                </Link>
            </div>
        </div>
    );
}

export default PostPreview;