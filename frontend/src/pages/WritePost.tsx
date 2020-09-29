import React from "react";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthPermissions} from "../Routes";
import {useAuthContext} from "../App";
import {useFormValue, useFormValueSet} from "../hooks/useFormValue";
import {validationRules as r} from "../utilities/validationRules";
import {preventingDefault} from "../utilities";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import { Redirect } from "react-router-dom";
import {PostData} from "../utilities/apiTypes";

export default function ({updatingPost=null}: {updatingPost?: PostData|null}) {
    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const title = useFormValue({
        initial: updatingPost?.title ?? '',
        name: 'title',
        rules: [r.required]
    });

    const body = useFormValue({
        initial: updatingPost?.body ?? '',
        name: 'body',
        rules: [r.required]
    });

    const [anyInvalid, checkAllBeforeSubmit] = useFormValueSet(title, body);

    const [, createPostState, createPost] = useAxiosPromise(
        () => {
            const data = {title: title.value, body: body.value};

            if (updatingPost !== null) {
                return axios.put(`/api/posts/${updatingPost.id}`, data);
            } else {
                return axios.post('/api/posts', data);
            }
        }
    )

    return ((loggedIn && userCan('create post') &&
      <form onSubmit={preventingDefault(() => checkAllBeforeSubmit() && createPost())} >
        Title:
        <br/>
        <input name="title"
               value={title.value}
               onChange={title.onChange}
               onBlur={title.onBlur}
        />
          {title.validationErrors.map((err, i) => <p key={i} style={{color: "red",}}>{err}</p>)}
        <br/>
        Body:
        <br/>
        <input name="body"
               value={body.value}
               onChange={body.onChange}
               onBlur={body.onBlur}
        />
          {body.validationErrors.map((err, i) => <p key={i} style={{color: "red",}}>{err}</p>)}
        <br/>
        <button type="submit" disabled={anyInvalid || createPostState.loading}>Create</button>

          {createPostState.failed && 'Failed!!!'}
          {createPostState.loaded && <Redirect to="/blog"/>}
      </form>
    ) || null);
}