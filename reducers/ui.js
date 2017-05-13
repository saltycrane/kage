/* @flow */
import {
  CREATE_USER,
  HIDE_MODAL,
  REAUTHENTICATE,
  RETRIEVE_TASKS,
  SHOW_MODAL,
  SIGN_IN,
  SIGN_IN_WITH_GOOGLE,
  UPDATE_EMAIL,
} from "../actions";
import type { SelectedModal } from "../types";

/**
 * Reducer
 */
export default function ui(state: Object = {}, action: Object) {
  return {
    selectedModal: selectedModal(state.selectedModal, action),
  };
}

function selectedModal(state: SelectedModal = null, action) {
  switch (action.type) {
    case CREATE_USER:
    case HIDE_MODAL:
    case REAUTHENTICATE:
    case RETRIEVE_TASKS: // hide the "sign in" modal after finishing retrieving tasks
    case `${SIGN_IN}_AFTER_DELAY`:
    case SIGN_IN_WITH_GOOGLE:
      return null;
    case SHOW_MODAL:
      return action.selectedModal;
    case `${UPDATE_EMAIL}_FAILURE`:
      return action.error.code === "auth/requires-recent-login" ? "reauth" : state;
    default:
      return state;
  }
}

/**
 * Selectors
 */
export const getSelectedModal = (state: Object): SelectedModal => state.selectedModal;
