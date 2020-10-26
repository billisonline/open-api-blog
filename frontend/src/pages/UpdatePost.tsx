import React, {useEffect} from "react";
import WritePostForm from "../forms/WritePostForm";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";
import {useHistory, useParams} from "react-router-dom";
import Navigation from "../layouts/Navigation";
import {PostApiFp} from "../api";

export default function () {
    const {id} = useParams<{id: string}>();

    const history = useHistory();

    const authContext = useAuthContext();

    const {makeOpenApiRequest: makeRequest, loggedIn} = useAuthAxios(authContext);

    const {userCan} = useAuthPermissions(authContext);

    const {postShow, postUpdate, postDestroy} = PostApiFp();

    const [post, postStatus, fetchPost] = useAxiosRequest({
        makeRequestPromise: () => postShow(id, true).then(makeRequest),
        getContent: ((result) => result.data.data!),
    });

    useEffect(() => fetchPost(), []);

    const [, updatePostState, updatePost] = useAxiosRequest<any, any, {title: string, body: string}>({
        makeRequestPromise: ({title, body}) => postUpdate(id, {title,  body}).then(makeRequest)
    });

    const [, deletePostState, deletePost] = useAxiosRequest({
        makeRequestPromise: () => postDestroy(id).then(makeRequest)
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
                  <Navigation innerPadding="medium">
                    <WritePostForm post={post}
                                   updatePost={updatePost}
                                   deletePost={deletePost}/>
                  </Navigation>
              )
          )}
      </>)
    || null);
}