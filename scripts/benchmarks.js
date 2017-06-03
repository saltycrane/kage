/* @flow */
import React from "react";
import ReactDOMServer from "react-dom/server";
import Benchmark from "benchmark";
import fs from "fs";

import Backdrop from "../components/Backdrop";
import Task from "../components/Task";
import TaskEdit from "../components/TaskEdit";
import { TaskListContainer } from "../components/TaskListContainer";

const suite = new Benchmark.Suite();

const BackdropHidden = () => <Backdrop show={false} />;

const Div = () => <div />;

const TaskHidden = () => (
  <Task
    onBump={() => {}}
    onDelete={() => {}}
    onEdit={() => {}}
    onToggle={() => {}}
    show={false}
    task={{ createdAt: 1494802317018, id: "aaa", tags: ["atag"], text: "some text" }}
  />
);

const TaskVisible = () => (
  <Task
    onBump={() => {}}
    onDelete={() => {}}
    onEdit={() => {}}
    onToggle={() => {}}
    show={true}
    task={{ createdAt: 1494802317018, id: "aaa", tags: ["atag"], text: "some text" }}
  />
);

const TaskEditHidden = () => (
  <TaskEdit
    onCancel={() => {}}
    onDelete={() => {}}
    onSubmit={() => {}}
    show={false}
    status={{ error: null, loading: false, success: false }}
    task={{ createdAt: 1494802317018, id: "aaa", tags: ["atag"], text: "some text" }}
  />
);

const TaskListContainerBasic = () => (
  <TaskListContainer
    auth={{ token: null, uid: null }}
    clearAllStatus={() => ({})}
    deleteTask={() => {}}
    editTask={() => {}}
    editingId={null}
    query={{}}
    status={{ error: null, loading: false, success: false }}
    tasks={[{ createdAt: 1494802317018, id: "aaa", tags: ["atag"], text: "some text" }]}
    updateTask={() => {}}
    updatingId={null}
  />
);

const results = [];
suite
  .add("Backdrop#hidden", function() {
    ReactDOMServer.renderToString(<BackdropHidden />);
  })
  .add("Div", function() {
    ReactDOMServer.renderToString(<Div />);
  })
  .add("Task#hidden", function() {
    ReactDOMServer.renderToString(<TaskHidden />);
  })
  .add("Task#visible", function() {
    ReactDOMServer.renderToString(<TaskVisible />);
  })
  .add("TaskEdit#hidden", function() {
    ReactDOMServer.renderToString(<TaskEditHidden />);
  })
  .add("TaskListContainer", function() {
    ReactDOMServer.renderToString(<TaskListContainerBasic />);
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
    results.push(String(event.target));
  })
  .on("complete", function() {
    results.push("");
  })
  .on("error", function(event) {
    console.error(event.target.error);
    results.push(event.target.error);
  })
  .run();

fs.writeFile("./data/benchmark-results.txt", results.join("\n"), err => {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
