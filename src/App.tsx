import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import FrontPage from './pages/front'

const App: React.FC = () => {
  useEffect(() => {
    document.title = "FreeBail Wedding!"
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => (
            <Redirect to="/save-the-date"/>
          )}/>
          <Route path="/save-the-date/:inviteCode?" component={FrontPage}/>
        </Switch>
      </div>
  </BrowserRouter>
  )
}

export default App
