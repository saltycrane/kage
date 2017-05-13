/* @flow */
import { createSelector } from "reselect";

import { RETRIEVE_USER, RETRIEVE_USERS, UPDATE_USER } from "../actions";

// Reducer
export default function users(state: Object = {}, action: Object) {
  switch (action.type) {
    case RETRIEVE_USER:
      return {
        ...state,
        [action.id]: action.response.data,
      };
    case RETRIEVE_USERS:
      return action.response.data;
    case UPDATE_USER:
      return {
        ...state,
        [action.id]: action.response.data,
      };
    default:
      return state;
  }
}

// Selectors
export const getUser = (state: Object, id: string) => {
  const user = state[id];
  return { ...user, id };
};

export const getUsers = createSelector(
  state => state,
  usersById => {
    // $FlowFixMe
    return Object.entries(usersById).map(([id, user]) => ({ ...user, id }));
  },
);
