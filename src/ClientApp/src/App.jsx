import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./layouts/Layout";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Health from "./pages/Health";
import HeavyLoad from "./pages/HeavyLoad";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/memory" component={Memory} />
        <Route path="/health" component={Health} />
        <Route path="/heavy" component={HeavyLoad} />
      </Layout>
    );
  }
}
