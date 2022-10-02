import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";

type Props = {};

const NavMenu: React.FC<Props> = ({}) => {
  const toggleNavbar = () => {
    // this.setState({
    //   collapsed: !this.state.collapsed,
    // });
  };

  return (
    <header>
      <div>
        <div>
          <div>k8sdisturber</div>
          <div onClick={toggleNavbar} className="mr-2" />
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
};

export default NavMenu;
