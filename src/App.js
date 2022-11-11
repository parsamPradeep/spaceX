import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MainComponent from "./Components/MainComponent";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route
              path="/assignment/:filter1?/:filter2?"
              component={MainComponent}
            />
            <Redirect from="/" exact to="/assignment" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
