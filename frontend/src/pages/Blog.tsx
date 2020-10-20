import React, {useEffect} from "react";
import {useAuthContext} from "../App";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {AxiosPromise} from "axios";
import {PostResponse} from "../utilities/apiTypes";
import TwoColumnPosts from "../components/TwoColumnPosts";
import PostPreview from "../components/PostPreview";
import Whatever from "../layouts/Whatever";

export default function () {
    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);

    const [posts, postsStatus, fetchPosts] = useAxiosPromise(
        (): AxiosPromise<PostResponse> => axios.get('/api/posts?withAuthor=true'),
        {
            getContent: ((result) => result.data.data),
        });

    useEffect(() => {fetchPosts()}, []);

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