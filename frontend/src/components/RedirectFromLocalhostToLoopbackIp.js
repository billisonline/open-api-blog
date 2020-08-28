/* eslint no-restricted-globals: 0 */
import React from "react";

// Web servers (such as "artisan serve") running locally will tend to set the Host header to "127.0.0.1" rather than
// "localhost," causing cookies to be assigned to 127.0.0.1 also. Thus localhost breaks authentication. Here we detect
// it and force a redirect back to 127.0.0.1 (aka the loopback IP)
export default function () {
  let match;

  if ((match = location.href.match(/(https?):\/\/localhost\b(.*)/)) != null) {
    const [_, protocol, ending] = match;

    location.href = protocol+"://127.0.0.1"+ending;
  }

  return <></>;
}