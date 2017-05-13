/* @flow */
import firebase from "firebase/app";
import "firebase/auth";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDYXNe8SruSoEgaWWXyiIgZmGBm2xCleQ4",
    authDomain: "kage-e9d8c.firebaseapp.com",
    databaseURL: "https://kage-e9d8c.firebaseio.com",
  });
} catch (err) {
  // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

// export function getCurrentUser() {
//   return firebase.auth().currentUser;
// }

/**
 * Firebase auth functions. They return a promise.
 */
export function linkAnonymousUser(email: string, password: string) {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return user.linkWithCredential(credential);
}

export function onAuthStateChanged(callback: Function) {
  firebase.auth().onAuthStateChanged(callback);
}

export function reauthenticate(password: string) {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user.reauthenticate(credential);
}

export function sendPasswordResetEmail(email: string) {
  return firebase.auth().sendPasswordResetEmail(email);
}

export function signIn(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signInAnonymously() {
  return firebase.auth().signInAnonymously();
}

export function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
}

export function signInWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
}

export function signOut() {
  return firebase.auth().signOut();
}

export function signUp(email: string, password: string) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function updateEmail(email: string) {
  const user = firebase.auth().currentUser;
  return user.updateEmail(email);
}

export function updatePassword(newPassword: string) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(newPassword);
}
