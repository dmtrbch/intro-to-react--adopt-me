import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("peru");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

// Whenever we are passing functions down into childrens (components) or whenever we are doing event listeners use an arrow function, because of "this" context
// We can not add Error Boundaries to Functional Components (hooks), only to Class components
// Context is used for state management, it is harder to use Context with Classes compared to hooks
// We can use Portals in react for Modals, or contextual navigation, special header, special footer... Netflix use it to render into the player
