/* @flow */
import axios from "axios";
import { memoize } from "redux-promise-memo";

import type { Auth } from "../types";
import { signInAnonymously } from "./auth";

type Update = {
  completed?: boolean,
  completedAt?: number,
  tags?: Array<string>,
  text?: string,
};

const BASE_URL = "https://kage-e9d8c.firebaseio.com/tasks";
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const RETRIEVE_TASK = "RETRIEVE_TASK";
export const RETRIEVE_TASKS = "RETRIEVE_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";

const _retrieveTask = (id: string, uid: string, token: string) => ({
  type: RETRIEVE_TASK,
  getPromise: () => axios.get(`${BASE_URL}/${uid}/${id}.json`, { params: { auth: token } }),
  id,
});

export const createTask = (text: string, tags: Array<string>, auth: Auth) => async (
  dispatch: Function,
) => {
  let { token, uid } = auth;

  // If not authenticated, sign in anonymously and get auid and token. I don't know
  // why user.getToken() does not give the desired string token, so user toJSON().
  if (!uid) {
    const user = await dispatch(signInAnonymously());
    const userJson = user.toJSON();
    token = userJson.stsTokenManager.accessToken;
    uid = userJson.uid;
  }

  // Build parameters passed to the POST request
  const params = { auth: token };
  const data = {
    createdAt: { ".sv": "timestamp" }, // firebase server-generated timestamp
    tags: tags.sort(),
    text,
    updatedAt: { ".sv": "timestamp" }, // firebase server-generated timestamp
  };

  // Dispatch the action to create the task, then dispatch the action to retrieve
  // the task immediately afterwards to get the server generated timestamps.
  return dispatch({
    type: CREATE_TASK,
    getPromise: () =>
      // $FlowFixMe
      axios.post(`${BASE_URL}/${uid}.json`, data, { params }).then(response => {
        const id = response.data.name;
        // $FlowFixMe
        dispatch(_retrieveTask(id, uid, token));
        return response;
      }),
    text,
  });
};

export const deleteTask = (id: string, auth: Auth) => {
  const { token, uid } = auth;
  if (!uid) {
    return;
  }
  const params = { auth: token };

  return {
    type: DELETE_TASK,
    // fulfill promise when api returns or after 500ms, whichever takes longer
    // used to show red = deleted effect in UI
    getPromise: () =>
      Promise.all([
        axios.delete(`${BASE_URL}/${uid}/${id}.json`, { params }),
        new Promise(resolve => window.setTimeout(resolve, 500)),
      ]),
    id,
  };
};

export const editTask = (id: string) => ({
  type: EDIT_TASK,
  id,
});

// TODO: don't let uid be null to avoid the if check
// or create a decorator to add auth
const _retrieveTasks = (auth: Auth) => {
  const { token, uid } = auth;
  const params = { auth: token };
  if (!uid) {
    return;
  }
  return {
    type: RETRIEVE_TASKS,
    getPromise: () => axios.get(`${BASE_URL}/${uid}.json`, { params }),
  };
};
export const retrieveTasks = memoize(_retrieveTasks, RETRIEVE_TASKS);

export const updateTask = (id: string, update: Update, auth: Auth) => (dispatch: Function) => {
  const { token, uid } = auth;
  if (!uid) {
    return;
  }
  const params = { auth: token };

  let { completed, completedAt, tags, ...rest } = update;
  if (completed && !completedAt) {
    completedAt = Date.now();
  }
  if (!completed) {
    completedAt = null;
  }
  const data = {
    ...rest,
    ...(tags ? { tags: tags.sort() } : {}),
    updatedAt: { ".sv": "timestamp" }, // firebase server-generated timestamp
    completed,
    completedAt,
  };

  return dispatch({
    type: UPDATE_TASK,
    getPromise: () =>
      axios.patch(`${BASE_URL}/${uid}/${id}.json`, data, { params }).then(response => {
        // $FlowFixMe
        dispatch(_retrieveTask(id, uid, token));
      }),
    id,
    update: { ...update, completedAt },
  });
};
