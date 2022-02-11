import React from "react";
import Navigation from "./Navigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <React.Fragment>
      <header>
        <Navigation />
      </header>
      <main className={classes.main}>{props.children}</main>
    </React.Fragment>
  );
}

export default Layout;
