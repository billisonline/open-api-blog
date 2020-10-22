import React from "react";
import {useHistory} from "react-router-dom";
import {useAuthContext} from "../App";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthPermissions} from "../Routes";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import WritePostForm from "../forms/WritePostForm";
import Whatever from "../layouts/Whatever";

function CreatePost() {
    const history = useHistory();

    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const [, createPostState, createPost] = useAxiosRequest<any, any, {title: string, body: string}>({
        makeRequestPromise: (body) => axios.post(`/api/posts`, body),
    });

    if (createPostState.loaded) {
        history.push('/blog');
    }

    if (!loggedIn) {
        history.push('/login');
    }

    if (!userCan('create post')) {
        history.push('/unauthorized');
    }

    return (
        <Whatever innerPadding="medium">
            <WritePostForm createPost={createPost}/>
        </Whatever>
    );
}

export default CreatePost;