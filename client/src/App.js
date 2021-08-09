
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import SearchBooks from './pages/SearchBooks';
//import SavedBooks from './pages/SavedBooks';
//import SearchTeammates from './pages/SearchTeammates';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Profile} />
          <Route exact path='/search' component={Profile} />
          <Route exact path='/profile' component={Profile} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
