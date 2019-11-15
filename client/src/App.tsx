import React, { useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PersonalView from "PersonalView";
import OrganizationView from "OrganizationView";
import LoginView from "LoginView";
import TemplateView from "TemplateView";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return loggedIn ? (
    <Router>
      <header>
        <nav>
          <Link to="/">Availability</Link>
          <Link to="/organization">Organization</Link>
          <Link to="/settings">Settings</Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/settings">
            <TemplateView />
            <span>test</span>
          </Route>
          <Route path="/organization">
            <OrganizationView />
          </Route>
          <Route path="/">
            <PersonalView />
          </Route>
        </Switch>
      </main>
    </Router>
  ) : (
    <LoginView setLoggedIn={setLoggedIn} />
  );
};

export default App;
