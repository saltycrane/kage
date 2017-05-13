/* @flow */
import isEqual from "lodash/isEqual";

/**
 * Middleware
 */
const middleware = (store: Object) => (next: Function) => (action: Object) => {
  const { type, getPromise, delay, ...rest } = action;

  if (!getPromise) {
    return next(action);
  }

  const meta = { ...rest.meta, isApiMemo: true, originalType: type };

  next({ ...rest, type: `${type}_INIT`, meta });

  return getPromise().then(
    response => {
      next({ ...rest, type, meta, response });
      if (delay) {
        setTimeout(() => {
          next({ ...rest, type: `${type}_AFTER_DELAY`, meta });
        }, delay);
      }
      return response;
    },
    error => {
      next({ ...rest, type: `${type}_FAILURE`, meta, error });
      return false;
    },
  );
};

/**
 * Reducer
 */
function reducer(state: Object = {}, action: Object) {
  const { type, meta: { apiArgs, originalType } = {} } = action;
  if (!apiArgs) {
    return state;
  }
  if (type.endsWith("_INIT")) {
    return {
      ...state,
      [originalType]: {
        args: null,
        error: null,
        loading: true,
      },
    };
  } else if (type.endsWith("_FAILURE")) {
    return {
      ...state,
      [originalType]: {
        args: apiArgs,
        error: action.error,
        loading: false,
      },
    };
  } else {
    return {
      ...state,
      [originalType]: {
        args: apiArgs,
        error: null,
        loading: false,
      },
    };
  }
}

/**
 * Decorator
 */
/**
 * Return a "memoized" version of a promise action creator.
 * The memoized version will not dispatch the action if:
 *   - the promise has not resolved (e.g. api request is still loading)
 *   - the action has already been dispatched with the same arguments
 *
 * The memoized action creator can be called multiple times (e.g. in componentDidUpdate)
 * and it will do nothing unless the arguments change.
 *
 * Assume original action creator returns a simple
 * action object (i.e. it is not a thunk action creator).
 * Used with the request reducer above and gluestick's promise middleware.
 *
 * NOTE: "memoized" is in quotes because this does not manage storing the cached data.
 * It only manages whether to dispatch the action or not. Assume the user has stored
 * the data in Redux.
 *
 * IMPORTANT: each action creator must return an action object with a different type
 * because the type is used as the memoization key.
 *
 * Usage:
 *   const fetchSomething = memoize(_fetchSomething);
 * or
 *   const fetchSomething = memoize(_fetchSomething, {cacheErrors: false});
 */
function memoize(actionCreator: Function, options: Object = {}) {
  // store the promise returned by dispatching the action so it can be returned if
  // loading or cached.
  let result;
  const { cacheErrors = false } = options;

  return (...args: Array<*>) => {
    return (dispatch: Function, getState: Function) => {
      const isDev = process.env.NODE_ENV !== "production";
      const state = getState();
      const action = actionCreator(...args);

      if (!action) {
        return Promise.resolve();
      }

      // TODO: bad coupling using the state slice name "memoizedApi" (and the original action type).
      // requires user to use this name when adding the reducer.
      const { [action.type]: { args: prevArgs, loading, error } = {} } = state.apiMemo;

      // skip the cache if there is an error and the `cacheErrors` option is false
      const skipCache = !!error && !cacheErrors;

      if (loading) {
        // DON'T FETCH if already loading
        isDev && console.log(`[loading] ${action.type}`, args); // eslint-disable-line
        return result;
      }
      if (isEqual(args, prevArgs)) {
        if (skipCache) {
          // FETCH if the cache should be skipped (see above)
          isDev && console.log(`[skipping cache] ${action.type}`, args); // eslint-disable-line
          // don't return here
        } else {
          // DON'T FETCH if there is cached data
          isDev && console.log(`[cached] ${action.type}`, args); // eslint-disable-line
          return result;
        }
      } else {
        // FETCH if it is the first request or arguments changed
        isDev && console.log(`[requesting] ${action.type}`, args); // eslint-disable-line
        // don't return here
      }

      // add `apiArgs` to the original action, dispatch the action, and store the promise in
      // `result` to return in "cached" or "loading" scenarios.
      result = dispatch({
        ...action,
        meta: {
          ...action.meta,
          apiArgs: args,
        },
      });

      return result;
    };
  };
}

export { middleware, reducer, memoize };
