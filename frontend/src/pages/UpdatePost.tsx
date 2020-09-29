import React, {useEffect} from "react";
import WritePost from "./WritePost";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {AxiosPromise} from "axios";
import {SinglePostResponse} from "../utilities/apiTypes";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthContext} from "../App";
import {useAuthPermissions} from "../Routes";
import { useParams } from "react-router-dom";

export default function () {
    const {id} = useParams<{id: string}>();

    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const [post, postStatus, fetchPost] = useAxiosPromise(
        (): AxiosPromise<SinglePostResponse> => axios.get(`/api/posts/${id}?withAuthor=true`),
        {
            getContent: ((result) => result.data.data),
        });

    useEffect(() => fetchPost(), []);

    return ((loggedIn && userCan('create post') &&
      <>
          {postStatus.loading && <p>🌀</p>}

          {postStatus.failed && <p>Faaaiiled! {postStatus.errorMessage}</p>}

          {postStatus.loaded && !userCan('update post', post) && <p>Access Denied</p>}

          {postStatus.loaded && userCan('update post', post) && <WritePost updatingPost={post} />}
      </>)
    || null);
}