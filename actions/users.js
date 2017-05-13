/* @flow */
import axios from "axios";

import { memoize } from "../redux-api-memoization";

type Update = {|
  email: string,
  username: string,
|};

const BASE_URL = "https://kage-e9d8c.firebaseio.com/users";
export const CREATE_USER = "CREATE_USER";
export const RETRIEVE_USER = "RETRIEVE_USER";
export const RETRIEVE_USERS = "RETRIEVE_USERS";
export const UPDATE_USER = "UPDATE_USER";

export const createUser = (firebaseUser: any, username: string) => {
  const data = {
    createdAt: { ".sv": "timestamp" }, // firebase server-generated timestamp
    email: firebaseUser.email,
    username,
  };
  return {
    type: CREATE_USER,
    getPromise: () => axios.put(`${BASE_URL}/${firebaseUser.uid}.json`, data),
  };
};

export const retrieveUser = memoize((id: string) => ({
  type: RETRIEVE_USER,
  getPromise: () => axios.get(`${BASE_URL}/${id}.json`),
  id,
}));

export const retrieveUsers = memoize(() => ({
  type: RETRIEVE_USERS,
  getPromise: () => axios.get(`${BASE_URL}.json`),
}));

export const updateUser = (id: string, update: Update, token: string) => {
  const params = token ? { auth: token } : {};
  const data = {
    ...update,
    updatedAt: { ".sv": "timestamp" }, // firebase server-generated timestamp
  };

  return {
    type: UPDATE_USER,
    getPromise: () => axios.patch(`${BASE_URL}/${id}.json`, data, { params }),
    id,
    update,
  };
};
