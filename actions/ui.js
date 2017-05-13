/* @flow */
import type { SelectedModal } from "../types";

export const HIDE_MODAL = "HIDE_MODAL";
export const ROUTE_CHANGED = "ROUTE_CHANGED";
export const SHOW_MODAL = "SHOW_MODAL";

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const routeChanged = () => ({
  type: ROUTE_CHANGED,
});

export const showModal = (selectedModal: SelectedModal) => ({
  type: SHOW_MODAL,
  selectedModal,
});
