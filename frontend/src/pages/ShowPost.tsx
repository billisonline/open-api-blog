import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useAxiosRequest} from "../hooks/useAxiosRequest";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthContext} from "../App";
import Navigation from "../layouts/Navigation";
import Button from "../components/Button";
import {nl2br} from "../utilities/elements";
import {Post as PostData, PostApiFp} from "../api";

function Post ({post}: {post: PostData}) {
    return (
        <div className="relative py-16 bg-white overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                <div className="relative h-full text-lg max-w-prose mx-auto">
                    <svg className="absolute top-12 left-full transform translate-x-32" width="404" height="384"
                         fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20"
                                     patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"/>
                    </svg>
                    <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404"
                         height="384" fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                                     patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"/>
                    </svg>
                    <svg className="absolute bottom-12 left-full transform translate-x-32" width="404" height="384"
                         fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20"
                                     patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"/>
                    </svg>
                </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto mb-6 text-center">
                    <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        {post.title}
                    </h1>
                    <Button text="Edit" linkTo={`/blog/${post.id}/edit`} />
                </div>
                <div className="prose prose-lg text-gray-500 mx-auto">
                    <p>{nl2br(post.body ?? '')}</p>
                </div>
            </div>
        </div>
    );
}

function ShowPost () {
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const authContext = useAuthContext();
    const {makeOpenApiRequest: makeRequest, loggedIn} = useAuthAxios(authContext);

    const {postShow} = PostApiFp();

    const [post, postStatus, fetchPost] = useAxiosRequest({
        makeRequestPromise: () => postShow(id, true).then(makeRequest),
        getContent: ((result) => result.data.data!),
    });

    useEffect(() => fetchPost(), []);

    if (!loggedIn) {history.push('/login'); return <></>;}

    return (loggedIn &&
        <Navigation>
            {postStatus.loading && <p>🌀</p>}

            {postStatus.loaded && <Post post={post} />}
        </Navigation>
    );
}

export default ShowPost;