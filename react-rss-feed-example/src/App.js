import React from 'react';
import { Router, Route } from 'react-router-dom';
import HomePage from './Homepage.js';
import { CreateBrowserHistory as CreateHistory } from 'history';
import './App.css';
import TopBar from './TopBar.js';
import FeedPage from './FeedPage.js';
const history = CreateHistory();

function App({ feedstore }) {
  return (
    <div className="App">
      <Router history={history} >
        <TopBar />
        <Route path='/' exact component={props => <HomePage {...props} feedstore={feedstore} />} />
        <Route path='/feed' exact component={props => <FeedPage {...props} feedstore={feedstore} />} />
      </Router>
    </div>
  );
}

export default App;
