import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,} from "react-router-dom";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <Router>
        <Route path="/blog">
          <Blog />
        </Route>
      </Router>
    </>
  );
}

export default App;
