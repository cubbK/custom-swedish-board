import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StartPage } from "./StartPage";
import { Experience } from "./Experience";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route path="/experience" render={() => <Experience />} />
    </Router>
  );
}

export default App;
