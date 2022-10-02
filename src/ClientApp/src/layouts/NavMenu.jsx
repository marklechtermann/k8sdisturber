import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <div>
          <div>
            <div>k8sdisturber</div>
            <div onClick={this.toggleNavbar} className="mr-2" />
            <div>
              <ul>
                <div>
                  <Link to="home">Home</Link>
                </div>
                <div>
                  <Link to="memory">Memory</Link>
                </div>
                <div>
                  <Link to="health">Health</Link>
                </div>
                <div>
                  <Link to="heavy">Heavy</Link>
                </div>
                <div>
                  <Link to="database">Database</Link>
                </div>
                <div>
                  <Link to="swagger">Swagger</Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
