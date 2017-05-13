/* @flow */
import memoize from "lodash.memoize";
import { createSelector } from "reselect";

import {
  CLEAR_ALL_STATUS,
  DELETE_TASK,
  EDIT_TASK,
  RETRIEVE_TASK,
  RETRIEVE_TASKS,
  SIGN_OUT,
  UPDATE_TASK,
} from "../actions";

/**
 * Reducers
 */
export default function tasks(state: Object = {}, action: Object) {
  return {
    byId: byId(state.byId, action),
    editingId: editingId(state.editingId, action),
    updatingId: updatingId(state.updatingId, action),
  };
}

function byId(state: Object = {}, action: Object) {
  switch (action.type) {
    // optimistic update before actual save
    // save previous state of task in `prev` in case update fails
    case `${UPDATE_TASK}_INIT`:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.update,
        },
        prev: {
          ...state.prev,
          [action.id]: state[action.id],
        },
      };
    // if update fails, revert back to previous state
    case `${UPDATE_TASK}_FAILURE`: {
      const { prev: { [action.id]: prevTask, ...prevTasks } } = state;
      return {
        ...state,
        [action.id]: prevTask,
        prev: prevTasks,
      };
    }
    case `${DELETE_TASK}_INIT`:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isDeleted: true,
        },
      };
    case DELETE_TASK: {
      const { [action.id]: _, ...tasks } = state;
      return tasks;
    }
    case RETRIEVE_TASK:
      return {
        ...state,
        [action.id]: action.response.data,
      };
    case RETRIEVE_TASKS:
      return action.response.data || {};
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}

function editingId(state: ?string = null, action: Object) {
  switch (action.type) {
    case EDIT_TASK:
      return action.id;
    case UPDATE_TASK:
      return null;
    default:
      return state;
  }
}

function updatingId(state: ?string = null, action: Object) {
  switch (action.type) {
    case `${UPDATE_TASK}_INIT`:
      return action.id;
    case CLEAR_ALL_STATUS:
      return null;
    default:
      return state;
  }
}

/**
 * Selectors
 */
const _getTasks = createSelector(
  state => state.byId,
  (tasksById: any) =>
    Object.entries(tasksById)
      .filter(([id]) => id !== "prev") // $FlowFixMe
      .map(([id, task]) => ({ ...task, id })),
);

const _filterByStatus = (tasks, status) => {
  if (status === "all") {
    return tasks;
  }
  if (status === "active") {
    return tasks.filter(task => !task.completed);
  }
  if (status === "completed") {
    return tasks.filter(task => task.completed);
  }
  throw new Error(`Unrecognized status: "${status}"`);
};

const _filterByTag = (tasks, tag) => {
  if (tag === "all") {
    return tasks;
  }
  return tasks.filter(task => task.tags && task.tags.includes(tag));
};

export const getTags = createSelector(_getTasks, tasks => {
  const nestedTags = tasks.map(task => task.tags).filter(Boolean);
  const tags = nestedTags.reduce((memo, tags) => [...memo, ...tags], []);
  return Array.from(new Set(tags)).sort();
});

export const getEditingId = (state: Object) => state.editingId;

export const getFilteredTasks = createSelector(_getTasks, tasks =>
  memoize(query => {
    const { sortBy, status, tag } = query;
    let filteredTasks = _filterByStatus(tasks, status);
    filteredTasks = _filterByTag(filteredTasks, tag);

    // `|| 0` is to handle case where property is undefined because data is not filled in
    return filteredTasks.sort((a, b) => {
      return (b[sortBy] || 0) - (a[sortBy] || 0);
    });
  }),
);

export const getTask = (state: Object, id: string) => {
  const task = state.byId[id];
  return { ...task, id };
};

export const getTotalCount = (state: Object) => _getTasks(state).length;

export const getUpdatingId = (state: Object) => state.updatingId;
