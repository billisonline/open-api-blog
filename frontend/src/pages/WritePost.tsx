import React from "react";
import {useAuthAxios} from "../hooks/useAuthAxios";
import {useAuthPermissions} from "../Routes";
import {useAuthContext} from "../App";
import {useFormValue, useFormValueSet} from "../hooks/useFormValue";
import {validationRules} from "../utilities/validationRules";
import {preventingDefault} from "../utilities";
import {useAxiosPromise} from "../hooks/useAxiosPromise";
import { Redirect } from "react-router-dom";

export default function () {
    console.log('?');
    const authContext = useAuthContext();

    const {axios, loggedIn} = useAuthAxios(authContext);
    const {userCan} = useAuthPermissions(authContext);

    const title = useFormValue({
        initial: '',
        name: 'title',
        rules: [validationRules.required]
    });

    const body = useFormValue({
        initial: '',
        name: 'body',
        rules: [validationRules.required]
    });

    const [anyInvalid, checkAllBeforeSubmit] = useFormValueSet(title, body);

    const [, createPostState, createPost] = useAxiosPromise(
        () => axios.post('/api/posts', {title: title.value, body: body.value})
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