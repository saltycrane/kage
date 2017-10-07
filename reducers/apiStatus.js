/* @flow */
import {
  CLEAR_ALL_STATUS,
  REAUTHENTICATE,
  SEND_PASSWORD_RESET_EMAIL,
  SIGN_IN,
  SIGN_IN_ANONYMOUSLY,
  SIGN_UP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USER,
  CREATE_TASK,
  UPDATE_TASK,
  HIDE_MODAL,
  ROUTE_CHANGED,
} from "../actions";

/**
 * Reducer
 */
export default function apiStatus(state: Object = {}, action: Object) {
  const { type, meta: { isPromise, originalType } = {} } = action;

  if (isPromise && type.endsWith("_INIT")) {
    return {
      ...state,
      [originalType]: {
        error: null,
        loading: true,
        success: false,
      },
    };
  } else if (isPromise && type.endsWith("_FAILURE")) {
    return {
      ...state,
      [originalType]: {
        error: action.error,
        loading: false,
        success: false,
      },
    };
  } else if (isPromise) {
    // api SUCCESS case
    return {
      ...state,
      [originalType]: {
        error: null,
        loading: false,
        success: true,
      },
    };
  }

  switch (action.type) {
    case CLEAR_ALL_STATUS:
    case HIDE_MODAL:
    case ROUTE_CHANGED:
      return {};
    default:
      return state;
  }
}

/**
 * Selectors
 */
function getStatus(state: Object, actionType: string, errorTransform: ?Function) {
  const { [actionType]: { error, loading, success } = {} } = state;
  const errorMsg = errorTransform ? errorTransform(error) : error;
  return {
    error: errorMsg,
    loading,
    success,
  };
}

const _firebaseErrorTransform = error => error && error.message;
const _axiosErrorTransform = error => error && error.response.data.error;
const _updateEmailTransform = error =>
  error && error.code !== "auth/requires-recent-login" ? error.message : null;

export const getReauthenticateStatus = (state: Object) =>
  getStatus(state, REAUTHENTICATE, _firebaseErrorTransform);
export const getSendPasswordResetEmailStatus = (state: Object) =>
  getStatus(state, SEND_PASSWORD_RESET_EMAIL, _firebaseErrorTransform);
export const getSignInStatus = (state: Object) =>
  getStatus(state, SIGN_IN, _firebaseErrorTransform);
export const getSignInAnonymouslyStatus = (state: Object) =>
  getStatus(state, SIGN_IN_ANONYMOUSLY, _firebaseErrorTransform);
export const getSignUpStatus = (state: Object) =>
  getStatus(state, SIGN_UP, _firebaseErrorTransform);
export const getUpdateEmailStatus = (state: Object) =>
  getStatus(state, UPDATE_EMAIL, _updateEmailTransform);
export const getUpdatePasswordStatus = (state: Object) =>
  getStatus(state, UPDATE_PASSWORD, _firebaseErrorTransform);
export const getUpdateUserStatus = (state: Object) =>
  getStatus(state, UPDATE_USER, _axiosErrorTransform);
export const getCreateTaskStatus = (state: Object) =>
  getStatus(state, CREATE_TASK, _axiosErrorTransform);
export const getUpdateTaskStatus = (state: Object) =>
  getStatus(state, UPDATE_TASK, _axiosErrorTransform);
