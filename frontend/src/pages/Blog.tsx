import React, {useEffect} from "react";
import {useAuthContext} from "../App";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {AxiosPromise} from "axios";
import {PostResponse} from "../utilities/apiTypes";
import TwoColumnPosts from "../components/TwoColumnPosts";
import PostPreview from "../components/PostPreview";
import Whatever from "../layouts/Whatever";
import {PostApiFp} from "../api";

export default function () {
    const authContext = useAuthContext();

    const {makeOpenApiRequest: makeRequest, loggedIn} = useAuthAxios(authContext);

    const {postIndex} = PostApiFp();

    const [posts, postsStatus, fetchPosts] = useAxiosRequest({
        makeRequestPromise: () => postIndex(true).then(makeRequest),
        getContent: ((result) => result.data.data!),
    });

    useEffect(() => fetchPosts(), []);

    return (loggedIn &&
        <Whatever>
            <TwoColumnPosts title="Laravel + React Blog">
                {postsStatus.loaded && posts.map((post, i) => (
                    <PostPreview key={i} post={post} />
                ))}
            </TwoColumnPosts>
        </Whatever>
    );
};