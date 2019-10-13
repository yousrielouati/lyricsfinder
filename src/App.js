import React , {Component} from 'react';
import Navbar from './components/layout/Navbar' ;
import Index from './components/layout/Index' ;
import Lyrics from './components/tracks/Lyrics'

import { BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import {Provider} from './Context'

import './App.css'; 

export class  App extends Component {
  render() {
  return (
    <Provider>
    <Router>
    <div className="App">
      
      <Navbar />
      <div className="container">

               <Switch>
                   <Route exact path="/"  > <Index /> </Route> 
                   <Route exact path="/lyrics/track/:id" component={Lyrics} /> 
               </Switch>

      </div>

    </div>
    </Router >
    </Provider>
  );
}
}

export default App;
