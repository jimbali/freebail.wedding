import React from 'react';
import './App.css';
import FrontPage from './pages/front'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' render={(props) => (
            <Redirect to="/save-the-date"/>
          )}/>
          <Route path='/save-the-date/:inviteCode?' component={FrontPage}/>
        </Switch>
      </div>
  </BrowserRouter>
  );
}

export default App;
