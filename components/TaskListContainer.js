/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus, Auth, Task as TaskType } from "../types";
import Backdrop from "./Backdrop";
import Task from "./Task";
import TaskEdit from "./TaskEdit";
import Status from "./Status";

type Props = {|
  auth: Auth,
  clearAllStatus: () => Object,
  deleteTask: Function,
  editTask: Function,
  editingId: ?string,
  query: Object,
  status: ApiStatus,
  tasks: Array<TaskType>,
  updateTask: Function,
  updatingId: ?string,
|};

export const TaskListContainer = ({
  auth,
  clearAllStatus,
  deleteTask,
  editTask,
  editingId,
  tasks,
  query,
  status,
  updateTask,
  updatingId,
}: Props) => (
  <div>
    {tasks.map(task => (
      <div key={task.id} style={{ position: "relative" }}>
        {task.id === updatingId && (
          <Status
            messages={{ loading: "Saving...", success: "Saved!" }}
            minWidth="90px"
            onHide={clearAllStatus}
            status={status}
            style={{ position: "absolute", top: 5, left: 9, zIndex: 3 }}
          />
        )}
        <Backdrop
          onClick={() => editTask(null)}
          style={{ zIndex: 1 }}
          show={task.id === editingId}
        />
        <TaskEdit
          task={task}
          onCancel={() => editTask(null)}
          onDelete={() => deleteTask(task.id, auth)}
          onSubmit={update => updateTask(task.id, update, auth)}
          show={task.id === editingId}
          status={status}
        />
        <Task
          task={task}
          onBump={() => updateTask(task.id, {}, auth)}
          onDelete={() => deleteTask(task.id, auth)}
          onEdit={() => editTask(task.id)}
          onToggle={() => updateTask(task.id, { completed: !task.completed }, auth)}
          show={task.id !== editingId}
        />
      </div>
    ))}
  </div>
);

export default connect(
  (state, ownProps) => ({
    auth: selectors.getAuth(state),
    editingId: selectors.getEditingId(state),
    tasks: selectors.getFilteredTasks(state, ownProps),
    status: selectors.getUpdateTaskStatus(state),
    updatingId: selectors.getUpdatingId(state),
  }),
  {
    clearAllStatus: actions.clearAllStatus,
    deleteTask: actions.deleteTask,
    editTask: actions.editTask,
    updateTask: actions.updateTask,
  },
)(TaskListContainer);
