import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.scss";
import Generate from "../generate/Generate";
import Discovery from "../discover/Discover";
import Library from "../library/Library";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    <NavLink to="/generate">Generate</NavLink>
                    <NavLink to="/discovery">Discover</NavLink>
                    <NavLink to="/library">Library</NavLink>
                </header>
                <Route path="/generate" component={Generate} />
                <Route path="/discovery" component={Discovery} />
                <Route path="/library" component={Library} />
            </div>
        </BrowserRouter>
    );
}

export default App;
