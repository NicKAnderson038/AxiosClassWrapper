import React from "react";
import ReactDOM from "react-dom";
import Connector from "../config/index";

import "./styles.css";

function App() {
  const requestUrls = [
    "https://jsonplaceholder.typicode.com/posts/7",
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/posts/3",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/posts/1"
  ];

  for (const params of requestUrls) {
    Connector.get(params, {})
      .then(res => {
        console.log("my data: ", res.data);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
