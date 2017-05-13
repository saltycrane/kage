/* @flow */
import Router from "next/router";

// modified from https://github.com/matthewmueller/next-redirect/blob/ffc7393f5b81140bbdf9c52136d0ed63cc0b47fb/index.js
export default function redirect(path: string, res: Object) {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    Router.push(path);
  }
}
