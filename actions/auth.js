/* @flow */
import * as firebase from "../lib/firebase";
import * as selectors from "../reducers";

export const LINK_ANONYMOUS_USER = "LINK_ANONYMOUS_USER";
export const REAUTHENTICATE = "REAUTHENTICATE";
export const SEND_PASSWORD_RESET_EMAIL = "SEND_PASSWORD_RESET_EMAIL";
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_ANONYMOUSLY = "SIGN_IN_ANONYMOUSLY";
export const SIGN_IN_WITH_GITHUB = "SIGN_IN_WITH_GITHUB";
export const SIGN_IN_WITH_GOOGLE = "SIGN_IN_WITH_GOOGLE";
export const SIGN_IN_WITH_TWITTER = "SIGN_IN_WITH_TWITTER";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_UP = "SIGN_UP";
export const STORE_AUTH = "STORE_AUTH";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

export const linkAnonymousUser = (email: string, password: string) => ({
  type: LINK_ANONYMOUS_USER,
  getPromise: () => firebase.linkAnonymousUser(email, password),
});

export const reauthenticate = (password: string) => ({
  type: REAUTHENTICATE,
  getPromise: () => firebase.reauthenticate(password),
});

export const sendPasswordResetEmail = (email: string) => ({
  type: SEND_PASSWORD_RESET_EMAIL,
  getPromise: () => firebase.sendPasswordResetEmail(email),
});

export const signIn = (email: string, password: string) => ({
  type: SIGN_IN,
  getPromise: () => firebase.signIn(email, password),
  delay: 500,
});

export const signInAnonymously = () => ({
  type: SIGN_IN_ANONYMOUSLY,
  getPromise: () => firebase.signInAnonymously(),
});

export const signInWithGithub = () => ({
  type: SIGN_IN_WITH_GITHUB,
  getPromise: () => firebase.signInWithGithub(),
});

export const signInWithGoogle = () => ({
  type: SIGN_IN_WITH_GOOGLE,
  getPromise: () => firebase.signInWithGoogle(),
});

export const signInWithTwitter = () => ({
  type: SIGN_IN_WITH_TWITTER,
  getPromise: () => firebase.signInWithTwitter(),
});

export const signOut = () => ({
  type: SIGN_OUT,
  getPromise: () => firebase.signOut(),
});

export const signUp = (email: string, password: string) => ({
  type: SIGN_UP,
  getPromise: () => firebase.signUp(email, password),
});

export const storeAuth = (firebaseUser: any) => async (dispatch: Function, getState: Function) => {
  const token = firebaseUser ? await firebaseUser.getToken() : null;
  dispatch({
    type: STORE_AUTH,
    firebaseUser,
    token,
  });
  return selectors.getAuth(getState());
};

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  getPromise: () => firebase.updateEmail(email),
  email,
});

export const updatePassword = (password: string) => ({
  type: UPDATE_PASSWORD,
  getPromise: () => firebase.updatePassword(password),
});
