import React, {useEffect} from "react";
import WritePostForm from "../forms/WritePostForm";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import {AxiosPromise} from "axios";
import {SinglePostResponse} from "../utilities/apiTypes";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";
import {useHistory, useParams} from "react-router-dom";
import Whatever from "../layouts/Whatever";

export default function () {
    const {id} = useParams<{id: string}>();

    const history = useHistory();

    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const [post, postStatus, fetchPost] = useAxiosRequest({
        makeRequestPromise: (): AxiosPromise<SinglePostResponse> => axios.get(`/api/posts/${id}?withAuthor=true`),
        getContent: ((result) => result.data.data),
    });

    useEffect(() => fetchPost(), []);

    const [, updatePostState, updatePost] = useAxiosRequest<any, any, {title: string, body: string}>({
        makeRequestPromise: ({title, body}) => axios.put(`/api/posts/${id}`, {title, body})
    });

    const [, deletePostState, deletePost] = useAxiosRequest({
        makeRequestPromise: () => axios.delete(`/api/posts/${id}`)
    });

    if (updatePostState.loaded) {
        history.push(`/blog/${id}`);
    }

    if (deletePostState.loaded) {
        history.push('/blog');
    }

    return ((loggedIn && userCan('create post') &&
      <>
          {postStatus.loading && <p>🌀</p>}

          {postStatus.failed && <p>Faaaiiled! {postStatus.errorMessage}</p>}

          {postStatus.loaded && !userCan('update post', post) && <p>Access Denied</p>}

          {(
              postStatus.loaded
              && userCan('update post', post)
              && (
                  <Whatever innerPadding="medium">
                    <WritePostForm post={post}
                                   updatePost={updatePost}
                                   deletePost={deletePost}/>
                  </Whatever>
              )
          )}
      </>)
    || null);
}