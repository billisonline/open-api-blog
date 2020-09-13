import React, {useEffect} from "react";
import Post from "../components/Post";
import {useAuthContext} from "../App";
import {LogoutButton} from "../components/LogoutButton";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {AxiosInstance, AxiosPromise} from "axios";
import {PostResponse, UserData} from "../utilities/apiTypes";

export default function () {
    const {axios, loggedIn, currentUser}
        = useAuthAxios(useAuthContext()) as unknown as { axios: AxiosInstance, loggedIn: boolean, currentUser: UserData };

    const [posts, postsStatus, fetchPosts] = useAxiosPromise(
        (): AxiosPromise<PostResponse> => axios.get('/api/posts?withAuthor=true'),
        {
            getContent: ((result) => result.data.data),
        });

    useEffect(() => {
        fetchPosts()
    }, []);

    return ((loggedIn &&
      <div>
        <LogoutButton/>
        <br/>
        <h1>Welcome {currentUser.name}</h1>
          {postsStatus.loading && <p>🌀</p>}

          {postsStatus.failed && <p>{postsStatus.errorMessage}</p>}

          {postsStatus.loaded && posts.map((post) =>
              <Post key={post.id} post={post} author={post.author}/>
          )}
      </div>
    ) || null);
};