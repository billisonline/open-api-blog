import React, {useState} from "react";
import {useAuth} from "../App";
import {Redirect} from "react-router-dom";
import axios from "axios";

export default function () {
  const {login, loggedIn} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiBaseUrl = 'http://127.0.0.1:8000'

  const submit = (event) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;

    axios.get(apiBaseUrl+'/sanctum/csrf-cookie')
      .then(() => {
        axios.post(apiBaseUrl+'/api/authenticate', {email, password})
          .then(() => {
            axios.get(apiBaseUrl+'/api/users/me')
              .then((response) => login(response.data.data))
          })
      })
  };

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