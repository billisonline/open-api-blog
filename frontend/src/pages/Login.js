import React, {useState} from "react";
import {useAuth} from "../App";
import {Redirect} from "react-router-dom";

export default function () {
  const {login, loggedIn} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {login({email})};

  return (
    <form onSubmit={submit}>
      Email:
      <input
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      Password:
      <input
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button type="submit" >weklwkefuw</button>

      {loggedIn && <Redirect to="/blog"/>}
    </form>
  );
}