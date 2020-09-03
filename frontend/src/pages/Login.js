import React from "react";
import {useAuth} from "../App";
import {Redirect} from "react-router-dom";
import useAuthApi from "../hooks/useAuthApi";
import {preventingDefault} from "../utilities";
import {useBooleanState, useFormValue} from "../hooks";

export default function () {
  const {login} = useAuthApi(useAuth());

  const [email, updateEmail] = useFormValue();
  const [password, updatePassword] = useFormValue();
  const [loginSuccessful, setLoginSuccessful] = useBooleanState(false);

  return (
    <form onSubmit={preventingDefault(() => login(email, password, setLoginSuccessful))}>
      {(loginSuccessful && <Redirect to="/blog" />)}

      Email:
      <input name="email" value={email} onChange={updateEmail}/>
      <br />

      Password:
      <input name="password" value={password} onChange={updatePassword}/>
      <br />

      <button type="submit" >weklwkefuw</button>
    </form>
  );
}