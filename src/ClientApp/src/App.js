import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import Memory from "./components/Memory";
import Health from "./components/Health";
import HeavyLoad from "./components/HeavyLoad";

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
