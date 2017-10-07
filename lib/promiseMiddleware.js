/* @flow */

const promiseMiddleware = (store: Object) => (next: Function) => (action: Object) => {
  const { type, getPromise, delay, ...rest } = action;

  if (!getPromise) {
    return next(action);
  }

  const meta = { ...rest.meta, isPromise: true, originalType: type };

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

export default promiseMiddleware;
