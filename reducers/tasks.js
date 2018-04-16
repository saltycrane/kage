/* @flow */
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
      const {
        prev: { [action.id]: prevTask, ...prevTasks },
      } = state;
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

const _sortTasks = (tasks, sort) => {
  const [sortBy, sortDir] = sort.split(":");
  return tasks.sort((a, b) => {
    // `|| 0` is to handle case where property is undefined because data is not filled in
    const aa = a[sortBy] || 0;
    const bb = b[sortBy] || 0;
    let result = 0;
    if (aa < bb) {
      result = -1;
    } else if (aa > bb) {
      result = 1;
    }
    return sortDir === "asc" ? result : -1 * result;
  });
};

export const getTags = createSelector(_getTasks, tasks => {
  const nestedTags = tasks.map(task => task.tags).filter(Boolean);
  const tags = nestedTags.reduce((memo, tags) => [...memo, ...tags], []);
  return Array.from(new Set(tags)).sort();
});

export const getEditingId = (state: Object) => state.editingId;

// If support for multiple tasks lists is needed in the future,
// make a factory function that returns the getFilteredTasks selector.
// See https://github.com/reactjs/reselect/tree/v3.0.1#sharing-selectors-with-props-across-multiple-components
export const getFilteredTasks = createSelector(
  _getTasks,
  (_, props) => props.query,
  (tasks, query) => {
    const { sort, status, tag } = query;
    const filteredByStatus = _filterByStatus(tasks, status);
    const filteredByTag = _filterByTag(filteredByStatus, tag);
    return _sortTasks(filteredByTag, sort);
  },
);

export const getTask = (state: Object, id: string) => {
  const task = state.byId[id];
  return { ...task, id };
};

export const getTotalCount = (state: Object) => _getTasks(state).length;

export const getUpdatingId = (state: Object) => state.updatingId;
