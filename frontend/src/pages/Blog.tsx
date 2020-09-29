import React, {useEffect} from "react";
import Post from "../components/Post";
import {useAuthContext} from "../App";
import {LogoutButton} from "../components/LogoutButton";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {AxiosPromise} from "axios";
import {PostResponse} from "../utilities/apiTypes";
import {useAuthPermissions} from "../Routes";
import {useRepeatableEffect} from "../utilities";

export default function () {
    const authContext = useAuthContext();

    const {axios, loggedIn, currentUser} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const [posts, postsStatus, fetchPosts] = useAxiosPromise(
        (): AxiosPromise<PostResponse> => axios.get('/api/posts?withAuthor=true'),
        {
            getContent: ((result) => result.data.data),
        });

    const reloadPosts = useRepeatableEffect(() => {
        fetchPosts()
    }, []);

    return ((loggedIn &&
      <div>
        <LogoutButton/>
        <br/>
        <h1>Welcome {currentUser.name}</h1>

          {userCan('create post') && <button>New Post ➕</button>}

          {postsStatus.loading && <p>🌀</p>}

          {postsStatus.failed && <p>{postsStatus.errorMessage}</p>}

          {postsStatus.loaded && posts.map((post) =>
              <Post key={post.id}
                    post={post}
                    author={post.author}
                    deletePost={(post) => {
                        axios.delete(`/api/posts/${post.id}`)
                            .then(reloadPosts)
                    }}
              />
          )}
      </div>
    ) || null);
};