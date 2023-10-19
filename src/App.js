import React from 'react';
import {Switch, Route} from 'react-router-dom';

import ReloadOnBackButton from './Reload';
import Login from './Login';
import Entry from './entry';
import Scan from './scan';



function App() {
  return (
    <div className="App">

        <Switch>
          
          {/* <Route exact path='/' component={Entry}/>    */}
          <Route exact path='/' component={Scan}/>   

          <Route path='/login' component={Login}/> 
          
        </Switch>

        <ReloadOnBackButton />
    </div>
  );
}

export default App;