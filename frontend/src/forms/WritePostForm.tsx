import {PostData} from "../utilities/apiTypes";
import {useFormValue} from "../hooks/useFormValue";
import {validationRules as r} from "../utilities/validationRules";
import Container from "../components/Container";
import React from "react";
import {Post} from "../api";

function WritePostForm ({post=null, createPost=()=>{}, updatePost=()=>{}, deletePost=()=>{}}: {
    post?: Post|null,
    createPost?: ({title, body}: {title: string, body: string}) => void,
    updatePost?: ({title, body}: {title: string, body: string}) => void,
    deletePost?: () => void,
}) {
    const [creating, updating] = [post === null, post !== null];

    const title = useFormValue({
        initial: post?.title ?? '',
        name: 'title',
        rules: [r.required]
    });

    const body = useFormValue({
        initial: post?.body ?? '',
        name: 'body',
        rules: [r.required]
    });

    return (
        <Container>
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                        {creating? 'Create Post' : 'Update Post'}
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    {updating && <span className="shadow-sm rounded-md">
                        <button type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                                onClick={deletePost}
                        >
                            Delete
                        </button>
                    </span>}
                    <span className="ml-3 shadow-sm rounded-md">
                        <button type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                                onClick={() => {
                                    const data = {title: title.value, body: body.value};

                                    if (creating) {
                                        createPost(data);
                                    } else {
                                        updatePost(data);
                                    }
                                }}
                        >
                            Publish
                        </button>
                    </span>
                </div>
            </div>
            <form>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                            Title
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="email" type="title"
                                   className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                   value={title.value}
                                   onChange={title.onChange}
                                   onBlur={title.onBlur}/>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="body" className="block text-sm font-medium leading-5 text-gray-700">
                            Body
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <textarea id="body" rows={3}
                                      className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                      value={body.value}
                                      onChange={body.onChange}
                                      onBlur={body.onBlur}>
                                {post?.body}
                            </textarea>
                        </div>
                        {/*<p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>*/}
                    </div>
                </div>
            </form>
        </Container>
    );
}

export default WritePostForm;