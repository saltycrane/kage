/* @flow */
import { STORE_AUTH, UPDATE_EMAIL } from "../actions";
import type { Auth, CurrentUser } from "../types";

// Reducer
export default function auth(state: Object = {}, action: Object) {
  return {
    currentUser: currentUser(state.currentUser, action),
    token: token(state.token, action),
  };
}

function currentUser(state: CurrentUser = null, action) {
  switch (action.type) {
    case STORE_AUTH: {
      const { firebaseUser } = action;
      if (!firebaseUser) {
        return null;
      }
      const { providerData } = firebaseUser;
      return {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        isAnonymous: firebaseUser.isAnonymous,
        photoURL: firebaseUser.photoURL,
        providerData: firebaseUser.providerData,
        providerId: providerData.length > 0 ? providerData[0].providerId : null,
        uid: firebaseUser.uid,
      };
    }
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case STORE_AUTH:
      return action.token;
    default:
      return state;
  }
}

// Selectors
export const getAuth = (state: Object): Auth => ({
  token: state.token,
  uid: state.currentUser && state.currentUser.uid,
});
export const getCurrentUser = (state: Object): CurrentUser => state.currentUser;
export const getToken = (state: Object): string | null => state.token;
