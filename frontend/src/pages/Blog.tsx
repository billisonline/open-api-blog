import React, {useState} from "react";
import Post from "../components/Post";
import {useAuthContext} from "../App";
import {LogoutButton} from "../components/LogoutButton";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {AxiosPromise} from "axios";
import {PostData, PostResponse} from "../utilities/apiTypes";
import {useAuthPermissions} from "../Routes";
import {useRepeatableEffect} from "../utilities";
import {Link} from "react-router-dom";

export default function () {
    const authContext = useAuthContext();

    const [deletingPost, setDeletingPost] = useState(false);

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

    const deletePostAndRefresh = (post: PostData) => {
        setDeletingPost(true);

        axios.delete(`/api/posts/${post.id}`)
            .then(() => {setDeletingPost(false); reloadPosts();})
    };

    return ((loggedIn &&
      <div>
        <LogoutButton/>
        <br/>
        <h1>Welcome {currentUser.name}</h1>

          {userCan('create post') && <Link to="/blog/create"> <button>New Post ➕</button></Link>}

          {postsStatus.loading && <p>🌀</p>}

          {postsStatus.failed && <p>{postsStatus.errorMessage}</p>}

          {postsStatus.loaded && posts.map((post) =>
              <Post key={post.id}
                    post={post}
                    author={post.author}
                    showUpdate={userCan('update post', post)}
                    showDelete={userCan('delete post', post)}
                    UpdateProvider={({makeUpdateComponent}) => (
                        <Link to={`/blog/${post.id}/edit`}>
                            {makeUpdateComponent({disabled: false})}
                        </Link>
                    )}
                    DeleteProvider={({makeDeleteComponent}) => (
                        <span onClick={() => deletePostAndRefresh(post)}>
                            {makeDeleteComponent({disabled: deletingPost})}
                        </span>
                    )}
              />
          )}
      </div>
    ) || null);
};