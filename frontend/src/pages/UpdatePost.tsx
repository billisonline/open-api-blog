import React, {useEffect} from "react";
import WritePostForm from "../forms/WritePostForm";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {AxiosPromise} from "axios";
import {PostData, SinglePostResponse} from "../utilities/apiTypes";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";
import {useHistory, useParams } from "react-router-dom";
import Whatever from "../layouts/Whatever";

export default function () {
    const {id} = useParams<{id: string}>();

    const history = useHistory();

    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const [post, postStatus, fetchPost] = useAxiosPromise(
        (): AxiosPromise<SinglePostResponse> => axios.get(`/api/posts/${id}?withAuthor=true`),
        {
            getContent: ((result) => result.data.data),
        });

    useEffect(() => fetchPost(), []);

    const [, createOrUpdatePostState, createOrUpdatePost] = useAxiosPromise<any, any, string, string>(
        (title, body) => {
            const data = {title, body};

            if (true) {
                return axios.put(`/api/posts/${id}`, data);
            } else {
                return axios.post('/api/posts', data);
            }
        }
    );

    const [, deletePostState, deletePost] = useAxiosPromise(
        () => axios.delete(`/api/posts/${id}`)
    );

    if (createOrUpdatePostState.loaded) {
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
                                   createPost={createOrUpdatePost}
                                   updatePost={createOrUpdatePost}
                                   deletePost={deletePost}/>
                  </Whatever>
              )
          )}
      </>)
    || null);
}